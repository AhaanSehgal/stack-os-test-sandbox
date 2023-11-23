import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'src/redux/hooks';
import {
  fetchQuoteData,
  resetStateSwap,
  setNetworkSelected,
  setSettingsStatus,
  setStackAddress,
  setTokenBalance,
  setTokenOptions,
  setTokenSelected,
  setTokenSelectStatus,
} from '@/redux/swap/actions';

import SwapSettings from './SwapSettings';
import SwapHome from './SwapHome';
import SwapTokenSelect from './swap-token-select/index';
import { stackAddresses, tokenList } from './helpers';
import SwapSummary from './SwapSummary';
import SwapError from './SwapError';

interface Token {
  id: number;
  title: string;
  icon: string;
  subtitle?: string;
  address?: string;
  coin: string;
}

interface Tokens {
  Ethereum: Token[];
  'Polygon PoS': Token[];
  'Binance Smart Chain': Token[];
}

const ETHEREUM = 1;
const BSC = 56;
const POLYGON = 137;

const Swap = () => {
  const { chains, chain } = useNetwork();
  const { isSuccess, switchNetworkAsync } = useSwitchNetwork();
  const { address } = useAccount();

  const dispatch = useDispatch();
  const { swap } = useSelector((state) => state);
  const {
    isSettingsOpen,
    isTokenSelectOpen,
    networkSelected,
    tokenOptions,
    isSummaryOpen,
    isErrorOpen,
    toTokenAmount,
    slippageAmount,
  } = swap;

  const ethereumChain = chains.find(({ id }) => id === ETHEREUM);
  const binanceChain = chains.find(({ id }) => id === BSC);
  const polygonChain = chains.find(({ id }) => id === POLYGON);

  const networkOptions = [
    { title: 'Binance Smart Chain', icon: 'binance', ...binanceChain },
    { title: 'Ethereum', icon: 'ethereum', ...ethereumChain },
    { title: 'Polygon PoS', icon: 'polygon', ...polygonChain },
  ];

  useEffect(
    () => () => {
      dispatch(resetStateSwap());
    },
    []
  );

  useEffect(() => {
    if (chain?.id === networkSelected?.id) setupSwap();
  }, [networkSelected]);

  async function setupSwap() {
    const newToken = tokenList[networkSelected.title as keyof Tokens];
    const newStackAddress = stackAddresses[networkSelected.title];

    await switchNetworkAsync?.(networkSelected.id);
    dispatch(setTokenBalance(null));
    dispatch(setStackAddress(newStackAddress));
    dispatch(setTokenOptions(newToken));
    dispatch(setTokenSelected(newToken[0]));
    dispatch(setSettingsStatus(false));
    dispatch(setTokenSelectStatus(false));

    dispatch(
      fetchQuoteData({
        swapParams: {
          fromTokenAddress: newStackAddress,
          toTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          amount:
            toTokenAmount &&
            (toTokenAmount * 10 ** 18).toLocaleString('fullwide', { useGrouping: false }),
          fromAddress: address,
          slippage: slippageAmount,
          disableEstimate: true,
          allowPartialFill: false,
          chainId: newToken[0].chainId,
        },
        networkId: networkSelected.id,
        tokenAmount: toTokenAmount,
        coin: newToken[0].coin,
        isStack: true,
      })
    );
  }

  useEffect(() => {
    dispatch(setTokenSelected(tokenOptions[0]));
  }, [isSuccess]);

  useEffect(() => {
    if (chain && chain?.id !== networkSelected?.id) setupNetwork();
  }, [chain, networkOptions]);

  function setupNetwork() {
    const newNetwork = networkOptions.find((option: any) => option.id === chain?.id) as Token;

    if (newNetwork) dispatch(setNetworkSelected(newNetwork));
  }

  return (
    <>
      {isSettingsOpen && <SwapSettings />}
      {isTokenSelectOpen && <SwapTokenSelect />}
      {isSummaryOpen && <SwapSummary />}
      {isErrorOpen && <SwapError />}
      {!isSettingsOpen && !isTokenSelectOpen && !isSummaryOpen && !isErrorOpen && <SwapHome />}
    </>
  );
};

export default Swap;
