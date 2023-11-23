/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/redux/hooks';
import { resetState } from '@/redux/app-store/actions';
import { resetStateDrawer } from '@/redux/drawer/actions';
import { resetStateHardware } from '@/redux/hardware/actions';
import { resetStateSwap } from '@/redux/swap/actions';
import { resetStateGeneral, setMetaDataValues } from '@/redux/general/actions';
import { resetStateDeploy } from '@/redux/deploy/actions';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Icon from '../common/Icon';
import BalanceInfo from './BalanceInfo';
import NetworksDropdown from './header/NetworksDropdown';
import ClusterDropdown from './header/ClusterDropdown';
import CopyField from '../common/CopyField';
import Input from '../common/Input';
import DrawerSelect from '../common/DrawerSelect';
import Textarea from '../common/Textarea';
import showToast from '../../utils/showToast';
// import { AppNFT, AppNFTMinter, ipfs } from '@/utils/appCryptoConfig';
import { GeneralState, MetaDataValues } from '@/redux/general/types';
import { DeployState } from '@/redux/deploy/types';
import { callContractWrite } from '@decloudlabs/stk-v2/lib/utils/utils';
import { getMetaDataValues } from '@/utils/utils';

interface NetworkIcons {
    56: string;
    137: string;
    31337: string;
    4002: string;
    80001: string;
}

const AddressInfo = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const deploy: DeployState = useSelector((state) => state.deploy);
    const general: GeneralState = useSelector((state) => state.general);
    // const { deploy, general } = useSelector((state) => state);
    const { selectedNft, metaDataValues, appCrypto } = general;
    const { deployedApps } = deploy;

    const { disconnect } = useDisconnect({
        onSuccess() {
            console.log('refresh in address info');
            window.sessionStorage.clear();
            dispatch(resetState());
            dispatch(resetStateGeneral());
            dispatch(resetStateDrawer());
            dispatch(resetStateHardware());
            dispatch(resetStateSwap());
            dispatch(resetStateDeploy());
        },
    });
    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();

    const networkIcons: NetworkIcons = {
        56: 'bnb',
        137: 'polygon',
        31337: 'hardhat',
        4002: 'fantom',
        80001: 'polygon',
    };

    const [formattedAddress, setFormattedAddress] = useState('');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const [apps, setApps] = useState<string[]>([]);
    const [transferAddress, setTransferAddress] = useState('');
    const [isNftTransferring, setIsNftTransferring] = useState(false);
    const [isNftMinting, setIsNftMinting] = useState(false);
    const [nftsChanged, setNftsChanged] = useState(false);
    const [metaData, setMetaData] = useState<MetaDataValues>({});
    const [areMetadataStoring, setAreMetaDataStoring] = useState(false);

    useEffect(() => {
        setFormattedAddress(
            `${address?.substring(0, 5)}...${address?.substring(
                address.length - 4,
                address.length
            )}`
        );
    }, [address]);

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    useEffect(() => {
        if (!deployedApps) return;

        setApps(deployedApps.map((data) => data.appName));
    }, [deployedApps]);

    useEffect(() => {
        if (!appCrypto) return;
        if (!isAddressModalOpen) return;
        (async () => {
            // if(!metaDataValues.) {

            // }
            const fetchedMetadata: MetaDataValues = await getMetaDataValues(appCrypto, selectedNft);

            console.log('Fetched metadata: ', fetchedMetadata);
            dispatch(setMetaDataValues(fetchedMetadata));
            setMetaData(fetchedMetadata);
        })();
    }, [selectedNft, isAddressModalOpen]);

    const transferNFT = async () => {
        if (!appCrypto) return;
        setIsNftTransferring(true);

        try {
            const res = await callContractWrite(
                appCrypto.contractService.AppNFT.transferFrom(address, transferAddress, selectedNft)
            );

            if (res.success) {
                setIsNftTransferring(false);
                setNftsChanged(!nftsChanged);
                showToast('success', 'Account transferred successfully');
            } else {
                showToast('warning', 'Something went wrong! Please try again later.');
                setIsNftTransferring(false);
                showToast('error', error?.message);
            }
        } catch (error: any) {
            console.error('Error while transferring: ', error);
            setIsNftTransferring(false);
            showToast('error', error?.message);
        }
    };

    const mintNFT = async () => {
        if (!appCrypto) return;
        setIsNftMinting(true);

        try {
            const tr = await callContractWrite(
                appCrypto.contractService.AppNFTMinter.mint(address, {
                    value: 10 ** 11,
                    from: address,
                })
            );

            if (tr.success) {
                setIsNftMinting(false);
                setNftsChanged(!nftsChanged);
                showToast('success', 'Account created successfully');
            } else {
                showToast('warning', 'Something went wrong! Please try again later.');
                setIsNftMinting(false);
            }
        } catch (error: any) {
            console.error('Error while creating an account: ', error);
            setIsNftMinting(false);
            showToast('error', error?.message);
        }
    };

    const handleStoreMetaData = async () => {
        if (!appCrypto) return;

        setAreMetaDataStoring(true);

        let storeBundleJson;
        if (metaData?.bundleData) {
            const bundleJSONResp = await appCrypto.appIPFSStorage.callIPFSAdd({
                path: `/`,
                content: Array.from(Buffer.from(JSON.stringify(metaData?.bundleData))),
            });

            if (!bundleJSONResp.success) {
                console.error('Error while storing bundleData ', bundleJSONResp.data);
                setAreMetaDataStoring(false);
                showToast('error', 'Failed save bundle JSON to ipfs');
                return;
            }
            storeBundleJson = bundleJSONResp.data.filePath;
        }

        const newMetaData = { ...metaData, bundleCID: storeBundleJson?.cid.toString() };
        const metadataCIDResp = await appCrypto?.appIPFSStorage.callIPFSAdd({
            path: `appData/nftID/${selectedNft}/metadata`,
            content: Array.from(Buffer.from(JSON.stringify(newMetaData))),
        });

        if (!metadataCIDResp.success) {
            console.error('Error while store metadata ', metadataCIDResp.data);
            setAreMetaDataStoring(false);
            showToast('error', 'Error could not store meta data');
            return;
        }
        const tokenResp = await callContractWrite(
            appCrypto.contractService.AppNFT.setTokenURI(selectedNft, metadataCIDResp.data.filePath)
        );

        if (!tokenResp.success) {
            console.error('Error while store metadata ', metadataCIDResp.data);
            setAreMetaDataStoring(false);
            showToast('error', 'Error could not store meta data');
            return;
        }

        dispatch(setMetaDataValues(newMetaData));
        setMetaData(newMetaData);

        setAreMetaDataStoring(false);
    };

    return (
        <>
            <Modal showModal={isAddressModalOpen} onCloseModal={() => setIsAddressModalOpen(false)}>
                <div className="flex min-w-[20rem] flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-between">
                        <div>
                            <CopyField
                                text={isConnected ? formattedAddress : t('CONNECT')}
                                copyText={address}
                                bodyClassName="flex cursor-pointer items-center justify-center overflow-hidden rounded-md border-[0.1px] border-stk-blue-100 bg-transparent px-4 py-2 hover:bg-stk-blue-100"
                            />
                        </div>
                        <i
                            onClick={() => setIsAddressModalOpen(false)}
                            className="fa-solid fa-xmark cursor-pointer text-4xl text-stk-white"
                        />
                    </div>
                    <div className="my-7 flex bg-stk-blue-100 p-3 rounded-md">
                        <BalanceInfo className="duration-500 min-w-[17rem]" />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                            <span className="mb-2 text-sm text-stk-white">{t('NETWORK')}</span>
                            <NetworksDropdown />
                        </div>
                        <div className="flex flex-col">
                            <span className="mb-2 text-sm text-stk-white">{t('ACCOUNT')}</span>
                            <ClusterDropdown nftsChanged={nftsChanged} />
                        </div>
                    </div>

                    {selectedNft && (
                        <>
                            <div className="mt-[1.9rem] w-full">
                                <Input
                                    label="Transfer Account"
                                    placeholder="Wallet Address"
                                    onChange={(value) => {
                                        setTransferAddress(value);
                                    }}
                                    disabled={isNftTransferring}
                                />
                            </div>
                            {transferAddress && (
                                <Button
                                    className={`${
                                        isNftTransferring ? 'animate-pulse' : ''
                                    } mt-[0.9rem] w-full bg-stk-blue-500 text-stk-white hover:bg-stk-blue-400`}
                                    onClick={() => transferNFT()}
                                    disabled={isNftTransferring}
                                >
                                    {isNftTransferring
                                        ? 'Transferring your account...'
                                        : 'Transfer'}
                                </Button>
                            )}
                        </>
                    )}

                    <Accordion.Root
                        className="w-full space-y-4 my-4"
                        type="single"
                        collapsible
                        disabled={selectedNft == ''}
                    >
                        <Accordion.Item value="item-2">
                            <Accordion.Trigger className="AccordionTrigger radix-state-open:rounded-t-lg radix-state-closed:rounded-lg group rounded-md inline-flex w-full items-center justify-between bg-stk-blue-100 p-2 text-left focus:outline-none">
                                <span className="text-white px-1"> Metadata Form</span>
                                {selectedNft == '' ? (
                                    ''
                                ) : (
                                    <ChevronDownIcon
                                        className="AccordionChevron text-white"
                                        aria-hidden
                                    />
                                )}
                            </Accordion.Trigger>

                            <Accordion.Content className="AccordionContent w-full rounded-b-lg  pb-3 pt-1 dark:bg-gray-800">
                                <div className="min-w-[20rem] mt-7">
                                    <div className="mt-[1.9rem] w-full">
                                        <Input
                                            label="Enter metaimage link"
                                            validation={{
                                                maxLength: 1000,
                                            }}
                                            type="text"
                                            placeholder="Meta image link"
                                            value={metaData?.image}
                                            onChange={(value) => {
                                                setMetaData({ ...metaData, image: value });
                                            }}
                                            disabled={areMetadataStoring}
                                        />
                                    </div>
                                    <div className="mt-[1.9rem] w-full">
                                        <Input
                                            validation={{
                                                maxLength: 1000,
                                            }}
                                            label="Enter metadescription"
                                            type="text"
                                            placeholder="Meta description"
                                            value={metaData?.description}
                                            onChange={(value) => {
                                                setMetaData({ ...metaData, description: value });
                                            }}
                                            disabled={areMetadataStoring}
                                        />
                                    </div>
                                    <div className="mt-[1.9rem] w-full">
                                        <Input
                                            validation={{
                                                maxLength: 1000,
                                            }}
                                            label="Enter meta name"
                                            type="text"
                                            placeholder="Meta name"
                                            value={metaData?.name}
                                            onChange={(value) => {
                                                setMetaData({ ...metaData, name: value });
                                            }}
                                            disabled={areMetadataStoring}
                                        />
                                    </div>
                                    <div className="mt-[1.9rem] w-full">
                                        <Textarea
                                            validation={{
                                                maxLength: 1000,
                                            }}
                                            label="Enter bundle JSON"
                                            type="text"
                                            placeholder="Enter bundle JSON"
                                            value={metaData.bundleData}
                                            onChange={(value) => {
                                                setMetaData({ ...metaData, bundleData: value });
                                            }}
                                            disabled={areMetadataStoring}
                                        />
                                    </div>

                                    <div className="mt-[1.9rem] w-full">
                                        <DrawerSelect
                                            placeholder="Select App"
                                            options={apps?.map((val: string) => ({
                                                label: val,
                                                value: val,
                                            }))}
                                            value={
                                                metaData.appToOpen && {
                                                    label: metaData?.appToOpen,
                                                    value: metaData?.appToOpen,
                                                }
                                            }
                                            onChange={(value: any) => {
                                                setMetaData({
                                                    ...metaData,
                                                    appToOpen: value?.label,
                                                });
                                            }}
                                            disabled={areMetadataStoring}
                                        />
                                    </div>

                                    <Button
                                        className={`${
                                            areMetadataStoring ? 'animate-pulse' : ''
                                        } mt-[1.9rem] w-full bg-stk-blue-500 text-stk-white hover:bg-stk-blue-400`}
                                        onClick={() => handleStoreMetaData()}
                                        disabled={areMetadataStoring}
                                    >
                                        {areMetadataStoring
                                            ? 'Storing metadata...'
                                            : 'Store metadata'}
                                    </Button>
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion.Root>

                    <Button
                        onClick={mintNFT}
                        className={`${isNftMinting ? 'animate-pulse' : ''} mt-2 w-full`}
                        disabled={isNftMinting}
                    >
                        <span className="font-medium">
                            {isNftMinting ? 'Creating a new Account...' : 'Create an Account'}
                        </span>
                    </Button>
                    <button
                        type="button"
                        className="mt-[0.9rem] w-full border py-2 rounded-md border-stk-grey-500 hover:scale-95 duration-300"
                        onClick={() => disconnect()}
                    >
                        <span className="text-stk-white">{t('DISCONNECT')}</span>
                    </button>
                </div>
            </Modal>

            <div
                data-cy="address-info"
                className={`cursor-pointer ${!selectedNft ? 'mr-2' : ''}`}
                onClick={() => setIsAddressModalOpen(true)}
            >
                <div className="flex w-full items-center overflow-hidden rounded-md bg-stk-blue-100 py-2 px-3">
                    <Icon
                        className="-mb-2 ml-1 mr-2"
                        width={30}
                        height={30}
                        iconName={networkIcons[chain?.id as keyof NetworkIcons] || 'warning'}
                    />
                    <p
                        data-cy="header-address"
                        className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-stk-white"
                    >
                        {selectedNft ? `Account : ${selectedNft}` : t('LOGIN_SELECT_ACCOUNT')}
                    </p>
                </div>
            </div>
        </>
    );
};

export default AddressInfo;
