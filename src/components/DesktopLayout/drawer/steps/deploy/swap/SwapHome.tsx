import { useDispatch } from 'react-redux';
import { useSelector } from 'src/redux/hooks';
import { BiCog, BiInfoCircle, BiLinkExternal } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
import { useAccount, useConnect, useNetwork } from 'wagmi';
import { BsArrowDownCircle } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import {
    fetchQuoteData,
    setFromTokenAmount,
    setSettingsStatus,
    setSummaryStatus,
    setTokenSelectStatus,
    setToTokenAmount,
    setWalletModalStatus,
} from '@/redux/swap/actions';
import { Modal, Icon } from '@/components/common';
import SwapButton from './SwapButton';
import SwapGetBalance from './SwapGetBalance';
import SwapInput from './SwapInput';

const SwapHome = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { swap } = useSelector((state) => state);
    const {
        stackPrice,
        loading,
        expectedOutput,
        fromTokenAmount,
        fromTokenPrice,
        toTokenAmount,
        stackAddress,
        tokenSelected,
        networkSelected,
        slippageAmount,
        isWalletModalOpen,
        tokenBalance,
    } = swap;

    const { connect, connectors } = useConnect();
    const { chain } = useNetwork();
    const { address, isConnecting } = useAccount();
    const [insufficientBalance, setInsufficientBalance] = useState<boolean>(false);
    const [getTokenBalance, setGetTokenBalance] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        formRef?.current?.reset();
    }, [chain]);

    useEffect(() => {
        const finishedLoading =
            chain?.id === networkSelected?.id && chain?.id === tokenSelected?.chainId;

        setGetTokenBalance(finishedLoading);
    }, [networkSelected, tokenSelected]);

    useEffect(() => {
        setInsufficientBalance(false);

        if (
            fromTokenAmount &&
            tokenBalance !== undefined &&
            (tokenBalance === 0 || tokenBalance < fromTokenAmount)
        ) {
            setInsufficientBalance(true);
        }
    }, [fromTokenAmount, tokenBalance]);

    return (
        <div
            data-cy="swap-home"
            className="h-[340px] w-full rounded-md border-[0.5px] border-solid border-stk-grey-500 bg-stk-blue-200 p-4 duration-500"
        >
            {isWalletModalOpen && (
                <Modal
                    showModal={isWalletModalOpen}
                    onCloseModal={() => dispatch(setWalletModalStatus(false))}
                >
                    <div
                        data-cy="swap-connect-modal"
                        className="flex flex-col items-center justify-center text-center text-white"
                    >
                        <span className="text-xl font-semibold text-[#F9FAFB]">
                            {t('SWAP_MODAL_WALLET_TITLE')}
                        </span>
                        <div className="flex flex-col items-center justify-center py-6 sm:flex-row">
                            {connectors.map((connector) => (
                                <button
                                    data-cy={`swap-${connector.id}`}
                                    disabled={!connector.ready}
                                    key={connector.id}
                                    onClick={() => {
                                        connect({ connector });
                                        dispatch(setWalletModalStatus(false));
                                    }}
                                    type="button"
                                    className="m-2 rounded-md p-2 duration-500 hover:bg-[#374151]"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <Icon width={60} height={60} iconName={connector.id} />
                                        <span>{connector.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div
                            className="rounded-md bg-[#FDFDFD] px-9 py-1 text-center text-[#020305] hover:cursor-pointer"
                            onClick={() => dispatch(setWalletModalStatus(false))}
                        >
                            <span>{t('CLOSE')}</span>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="mb-4 flex flex-row justify-between">
                <a
                    href="https://app.1inch.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="mb-2 flex flex-row items-end text-stk-green duration-500 hover:scale-105 hover:cursor-pointer"
                >
                    <BiLinkExternal className="text-xl duration-500" color="#AAFF00" />
                    <p className="mx-2 text-sm font-normal duration-500">By 1inch</p>
                </a>
                <BiCog
                    data-cy="settings"
                    className="text-[#CFCFCF] duration-500 hover:cursor-pointer hover:text-stk-green"
                    size={20}
                    onClick={() => dispatch(setSettingsStatus(true))}
                />
            </div>
            <form data-cy="swap-input" ref={formRef}>
                <SwapInput
                    showPrice
                    type="number"
                    optionSelected={tokenSelected}
                    onClickOption={() => dispatch(setTokenSelectStatus(true))}
                    value={fromTokenAmount}
                    price={fromTokenAmount && fromTokenPrice * fromTokenAmount}
                    onChangeInput={(value) => {
                        if (value && Number(value) !== 0 && Array.from(value)[0] === '0') {
                            value = value?.replace(/^0+/, '');

                            if (value.includes('.')) {
                                value = value?.replace('.', '0.');
                            }
                        } else if (Number(value?.replace('.', '')) === 0 && value.includes('.')) {
                            value = value?.replace(/^0+/, '')?.replace('.', '0.');
                        }

                        dispatch(setFromTokenAmount(value));

                        dispatch(
                            fetchQuoteData({
                                swapParams: {
                                    fromTokenAddress:
                                        tokenSelected.id === 1
                                            ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                                            : tokenSelected.address,
                                    toTokenAddress: stackAddress,
                                    amount: (value * 10 ** 18).toLocaleString('fullwide', {
                                        useGrouping: false,
                                    }),
                                    fromAddress: address,
                                    slippage: slippageAmount,
                                    disableEstimate: true,
                                    allowPartialFill: false,
                                    chainId: tokenSelected.chainId,
                                },
                                networkId: networkSelected.id,
                                tokenAmount: value,
                                coin: tokenSelected.coin,
                                isStack: false,
                            })
                        );
                    }}
                />
                <div className="relative z-10 flex h-1 flex-row items-center justify-center">
                    <BsArrowDownCircle
                        className="rounded-full bg-[#1F2937] p-[0.2rem]"
                        color="#AAFF00"
                        size={30}
                    />
                </div>
                <SwapInput
                    value={toTokenAmount || undefined}
                    showPrice
                    price={toTokenAmount && stackPrice * toTokenAmount}
                    type="number"
                    onChangeInput={(value) => {
                        if (value && Number(value) !== 0 && Array.from(value)[0] === '0') {
                            value = value?.replace(/^0+/, '');

                            if (value.includes('.')) {
                                value = value?.replace('.', '0.');
                            }
                        } else if (Number(value?.replace('.', '')) === 0 && value.includes('.')) {
                            value = value?.replace(/^0+/, '')?.replace('.', '0.');
                        }

                        dispatch(
                            fetchQuoteData({
                                swapParams: {
                                    fromTokenAddress: stackAddress,
                                    toTokenAddress:
                                        tokenSelected.id === 1
                                            ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                                            : tokenSelected.address,
                                    amount: (value * 10 ** 18).toLocaleString('fullwide', {
                                        useGrouping: false,
                                    }),
                                    fromAddress: address,
                                    slippage: slippageAmount,
                                    disableEstimate: true,
                                    allowPartialFill: false,
                                    chainId: tokenSelected.chainId,
                                },
                                networkId: networkSelected.id,
                                tokenAmount: value,
                                coin: tokenSelected.coin,
                                isStack: true,
                            })
                        );

                        dispatch(setToTokenAmount(value));
                    }}
                />
            </form>
            <div className="my-6 flex flex-row items-center justify-start text-white">
                {loading ? (
                    <div className="flex flex-row items-center justify-start">
                        <svg
                            role="status"
                            className="h-4 w-4 animate-spin fill-[#1F2937] text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <p className="mx-2 text-sm font-normal duration-500">
                            {t('SWAP_HOME_INFO1')}
                        </p>
                    </div>
                ) : (
                    <>
                        <BiInfoCircle className="text-xl duration-500" color="#CFCFCF" />
                        {expectedOutput > 0 ? (
                            <span className="mx-2 text-sm font-normal duration-500">
                                {`1 ${tokenSelected.title} = ${expectedOutput} STACK `}
                                <span>{`($${fromTokenPrice})`}</span>
                            </span>
                        ) : (
                            <p className="mx-2 text-sm font-normal duration-500">
                                {t('SWAP_HOME_INFO2')}
                            </p>
                        )}
                    </>
                )}
            </div>
            <div className="mt-6 flex w-full flex-row items-center justify-center">
                {address ? (
                    <div
                        data-cy="home-button"
                        className="w-full child:w-full"
                        onClick={() => dispatch(setSummaryStatus(true))}
                    >
                        {getTokenBalance && tokenBalance === null ? (
                            <SwapGetBalance />
                        ) : (
                            <SwapButton
                                className={`${
                                    Number(fromTokenAmount) > 0 && !loading && 'text-[#020305]'
                                }`}
                                disabled={
                                    !(Number(fromTokenAmount) > 0) || loading || insufficientBalance
                                }
                            >
                                {insufficientBalance
                                    ? 'Insufficient balance'
                                    : t('SWAP_HOME_BUTTON')}
                            </SwapButton>
                        )}
                    </div>
                ) : (
                    <button
                        data-cy="connect-button"
                        type="button"
                        className="w-full rounded-md border border-stk-green bg-transparent px-9 py-3 text-stk-green duration-500 hover:bg-stk-green hover:text-stk-blue-200"
                        onClick={() => dispatch(setWalletModalStatus(true))}
                    >
                        {isConnecting ? 'Connecting Wallet...' : 'Connect Wallet'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SwapHome;
