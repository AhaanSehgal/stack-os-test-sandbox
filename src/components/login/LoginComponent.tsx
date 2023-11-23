/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useConnect, useAccount, useSwitchNetwork, useDisconnect, useNetwork } from 'wagmi';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StackedListSelect, { ListItem } from '@/components/common/StackedListSelect';
import { Modal, LoadingSpinner, DrawerSelect, Button } from '@/components/common';
import { wallets, networks } from './helpers';
import showToast from '@/utils/showToast';
import {
    setAppCrypto,
    setBalancesForSubscription,
    setConnectedAccount,
    setDripRateFactors,
    setLoginModal,
    setMetaDataValues,
    setNftRole,
    setSelectedNft,
    setSubscriptionParam,
} from '@/redux/general/actions';
import { web3Instance } from '@/utils/appCryptoConfig';
import { NftData } from '@/utils/types';
import { getMetaDataValues, getNFTList, initDripRateAndSubBalance } from '@/utils/utils';
import { useSelector } from '@/redux/hooks';
import { GeneralState, MetaDataValues } from '@/redux/general/types';
import { ethers } from 'ethers';
import { mintAppNFT } from '@/utils/contractCallConfig';

interface Steps {
    wallet: React.ReactElement;
    network: React.ReactElement;
    cluster: React.ReactElement;
}

const LoginComponent = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const router = useRouter();

    const general: GeneralState = useSelector((state: any) => state.general);

    const { appCrypto } = general;

    const { address, isConnected, isConnecting, connector: currentConnector } = useAccount();
    const { disconnectAsync: disconnect } = useDisconnect();

    const [step, setStep] = useState('wallet');
    const [metamaskModalOpen, setMetamaskModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nftData, setNFTData] = useState<NftData>({ nftList: [] });
    const [nftMinted, setNftMinted] = useState(false);
    const [mintingNft, setMintingNft] = useState(false);

    const {
        connectors,
        connect,
        pendingConnector,
        status: connectStatus,
        isSuccess: isWalletConnected,
        error: connectError,
        reset: resetConnect,
    } = useConnect({
        onSuccess: async ({
            connector: wallet,
            account,
            provider,
        }: {
            connector: any;
            account: any;
            provider: any;
        }) => {
            if (wallet?.id === 'walletConnect') {
                setStep('cluster');
            }

            try {
                // await web3Instance(provider, account);
                if (typeof window.ethereum !== 'undefined') {
                    let ethereum = window.ethereum;
                    // edge case if MM and CBW are both installed
                    //   if (window.ethereum.providers?.length) {
                    //     window.ethereum.providers.forEach(async (p: any) => {
                    //       if (p.isMetaMask) provider = p;
                    //     });
                    //   }

                    const web3Provider = new ethers.providers.Web3Provider(ethereum);

                    const accounts: string[] = await web3Provider.send('eth_requestAccounts', []);

                    const newAppCrypto = await web3Instance(web3Provider, accounts[0]);
                    dispatch(setAppCrypto(newAppCrypto));
                }
            } catch (error: any) {
                console.error('Error while creating web3 instance: ', error);
                showToast(
                    'error',
                    'Something went wrong. Please try reloading page in a few minutes.'
                );
            }
        },
    });

    const {
        switchNetwork,
        status: networkStatus,
        isLoading,
        isSuccess: isNetworkConnected,
    } = useSwitchNetwork();

    const { chain } = useNetwork();

    useEffect(() => {
        if (connectStatus === 'error' && connectError?.name === 'ResourceUnavailable') {
            resetConnect();
            showToast('warning', t('ERROR_METAMASK_PENDING_CONNECTION'));
        }
    }, [connectStatus]);

    useEffect(() => {
        if (address) dispatch(setConnectedAccount(address));
    }, [address]);

    useEffect(() => {
        if (isConnecting && pendingConnector?.id === 'metaMask') {
            setMetamaskModalOpen(true);
        } else {
            setTimeout(() => {
                setMetamaskModalOpen(false);
            }, 500);
        }
    }, [isConnecting, pendingConnector]);

    useEffect(() => {
        if (
            (isWalletConnected || connectError?.name === 'ConnectorAlreadyConnectedError') &&
            step === 'wallet'
        ) {
            sessionStorage.removeItem('currentNetworkId');
            setStep('network');
        }
    }, [isWalletConnected, connectError]);

    useEffect(() => {
        if (isNetworkConnected && step === 'network') {
            sessionStorage.setItem('currentNetworkId', String(chain?.id));

            setStep('cluster');
        }
    }, [isNetworkConnected]);

    useEffect(() => {
        if (!address) return;
        if (!appCrypto) return;

        setLoading(true);
        (async () => {
            try {
                if (
                    currentConnector?.id !== 'walletConnect' &&
                    isNetworkConnected &&
                    step === 'cluster'
                ) {
                    const res = await getNFTList(appCrypto, address);

                    setNFTData(res);
                }
                setLoading(false);
            } catch (error: any) {
                console.error('Error while getting accounts: ', error);
                setLoading(false);
                showToast('error', error?.message);
            }
        })();
    }, [isNetworkConnected, step, nftMinted, address]);

    async function handleConnectWallet(item: ListItem) {
        await disconnect();
        connect({
            connector: connectors.find((connector: any) => connector.id === item.id),
            chainId: currentConnector?.id === 'walletConnect' ? 137 : undefined,
        });
    }

    function handleSelectedCluster(item: { id: number; title: string; baseUrl: string }) {
        setLoading(true);

        sessionStorage.setItem('stackosBaseUrl', item.baseUrl);
    }

    const mintNFT = async () => {
        if (address == undefined) return;
        if (!appCrypto) return;

        setMintingNft(true);

        try {
            const mintNFTResp = await mintAppNFT(appCrypto, address);

            setNftMinted(!nftMinted);

            if (mintNFTResp.success) {
                showToast('success', 'Account created successfully');
            } else {
                showToast('warning', 'Something went wrong! Please try again later.');
            }

            setMintingNft(false);
        } catch (error: any) {
            console.error('Error while minting NFT: ', error);
            showToast('error', error?.message);
            setMintingNft(false);
        }
    };

    const handleChange = async (nftID: string) => {
        if (!appCrypto) return;
        try {
            setLoading(true);
            dispatch(setLoginModal(true));
            dispatch(setSelectedNft(nftID));
            dispatch(setNftRole(nftData[Number(nftID)]));

            handleSelectedCluster({
                id: 4,
                title: 'Marvel',
                baseUrl: 'marvel.stackos.io/api',
            });

            const initDRResp = await initDripRateAndSubBalance(appCrypto, nftID);
            if (initDRResp.success == false) throw initDRResp.data;
            const { subscriptionParam, dripRateFactors, balancesForSubscription } = initDRResp.data;

            dispatch(setSubscriptionParam(subscriptionParam));
            dispatch(setDripRateFactors(dripRateFactors));
            dispatch(setBalancesForSubscription(balancesForSubscription));

            // const metaDataValues: MetaDataValues = await getMetaDataValues(appCrypto, nftID);
            // dispatch(setMetaDataValues(metaDataValues));

            dispatch(setLoginModal(false));

            router.push('/deploy');
        } catch (error: any) {
            console.error('Error while getting subscription: ', error);
            setLoading(false);
            showToast('error', error?.message);
        }
    };

    const loginSteps: Steps = {
        wallet: (
            <>
                <StackedListSelect
                    className="w-[19rem] duration-500 md:w-[21.9rem]"
                    header={t('LOGIN_SELECT_WALLET')}
                    data={wallets}
                    onSelectItem={(item) => handleConnectWallet(item)}
                />
                <p className="mt-[1.6rem] text-center text-sm text-stk-grey-400">
                    {t('LOGIN_DONT_HAVE_WALLET1')}
                    <a href="https://metamask.io/download/" target="blank">
                        <span className="ml-1 text-sm font-medium text-stk-green">
                            {t('LOGIN_DONT_HAVE_WALLET2')}
                        </span>
                    </a>
                </p>
            </>
        ),
        network: (
            <StackedListSelect
                className="w-[19rem] duration-500 md:w-[21.9rem]"
                header={t('LOGIN_SELECT_NETWORK')}
                data={networks}
                onSelectItem={(item) => switchNetwork?.(Number(item.chainId))}
            />
        ),
        cluster: (
            <>
                {nftData?.nftList?.length ? (
                    <div className="min-w-[20rem]">
                        <DrawerSelect
                            options={nftData?.nftList?.map((val: string) => ({ label: val })) || []}
                            onChange={(val: string) => handleChange(val)}
                            placeholder={t('LOGIN_SELECT_ACCOUNT')}
                        />
                    </div>
                ) : (
                    <p className="mt-8 text-sm font-bold text-stk-grey-500 duration-500 md:text-stk-grey-400">
                        {t('LOGIN_DONT_HAVE_ACCOUNT')}{' '}
                        <span className="text-stk-green cursor-pointer" onClick={mintNFT}>
                            {t('LOGIN_CREATE_ACCOUNT')}
                        </span>
                    </p>
                )}
                <Button className="mt-[1.5rem] w-full" onClick={mintNFT}>
                    <span className="font-medium">{t('LOGIN_CREATE_ACCOUNT')}</span>
                </Button>
            </>
        ),
    };

    const CurrentStep = loginSteps[step as keyof Steps];

    const getLoadingMessge = () => {
        if (networkStatus === 'loading') {
            return t('LOGIN_SWITCHING_NETWORK');
        }
        if (mintingNft) {
            return t('LOGIN_CREATING_ACCOUNT');
        }
        return t('LOGIN_CONNECTING');
    };

    return (
        <div className="flex w-[25rem] flex-col items-center rounded-xl bg-stk-blue-400 md:min-h-[34.5rem]">
            <div className="">
                <Image src="/stackos-icon.svg" alt="stackos-icon" width={39} height={39} />
            </div>
            <h2 className="mt-[0.8rem] text-center text-2xl font-extrabold text-stk-white duration-500 md:text-[1.8rem]">
                {t('LOGIN_SUBTITLE')}
            </h2>
            <div className="mt-[1.1rem] flex">
                <p className="mr-1 text-sm font-normal text-stk-grey-500 duration-500 md:text-stk-grey-400">
                    {isConnected ? (
                        t(
                            isNetworkConnected
                                ? 'LOGIN_CLUSTER_DESCRIPTION'
                                : 'LOGIN_NETWORK_DESCRIPTION'
                        )
                    ) : (
                        <span>{t('LOGIN_WALLET_DESCRIPTION')}</span>
                    )}
                </p>
            </div>
            <div className="mt-[1.5rem]">
                {isConnecting || isLoading || loading || mintingNft ? (
                    <div className="mt-[6.2rem]">
                        <LoadingSpinner />
                        <p className="mt-[1.5rem] text-center text-sm text-stk-grey-400">
                            {getLoadingMessge()}
                        </p>
                    </div>
                ) : (
                    CurrentStep
                )}

                {metamaskModalOpen && (
                    <Modal showModal={metamaskModalOpen}>
                        <div
                            data-cy="login-unliked-modal"
                            className="flex w-[29.3rem] flex-col items-center justify-center text-center text-white"
                        >
                            <h2 className="text-xl font-semibold text-[#F9FAFB]">
                                {t('METAMASK')}
                            </h2>
                            <div className="relative mt-[1.6rem] h-[6rem] w-[6rem] overflow-hidden rounded-full">
                                <Image
                                    src="/assets/metamask.svg"
                                    alt="metamask-logo"
                                    layout="fill"
                                />
                            </div>
                            <p className="mt-[1.6rem] font-normal text-stk-grey-200">
                                {t('LOGIN_METAMASK_MODAL_DESCRIPTION')}
                            </p>
                            <p className="mt-[3.5rem] mb-3 text-center text-sm text-stk-grey-400 outline-none">
                                {t('LOGIN_DONT_HAVE_WALLET1')}
                                <a
                                    href="https://metamask.io/download/"
                                    target="blank"
                                    className="outline-none"
                                >
                                    <span className="ml-1 text-sm font-medium text-stk-green outline-none">
                                        {t('LOGIN_DONT_HAVE_WALLET2')}
                                    </span>
                                </a>
                            </p>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default LoginComponent;
