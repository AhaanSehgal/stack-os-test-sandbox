/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { SwapState, SwapTypes } from './types';

import * as Actions from './actions';

const INITIAL_STATE: SwapState = {
  stackPrice: 0,
  isSettingsOpen: false,
  isTokenSelectOpen: false,
  isErrorOpen: false,
  loading: false,
  fromTokenAmount: null,
  toTokenAmount: null,
  fromTokenPrice: 0,
  expectedOutput: 0,
  tokenOptions: [
    {
      id: 1,
      chainId: 137,
      title: 'MATIC',
      subtitle: 'Polygon',
      icon: 'matic',
      address: '0x0000000000000000000000000000000000001010',
      coin: 'matic-network',
    },
    {
      id: 2,
      chainId: 137,
      title: 'USDC',
      subtitle: 'USD Coin',
      icon: 'usdc',
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      coin: 'usd-coin',
    },
    {
      id: 3,
      chainId: 137,
      title: 'USDT',
      subtitle: 'Tether',
      icon: 'usdt',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      coin: 'tether',
    },
  ],
  tokenSelected: {
    id: 1,
    chainId: 137,
    title: 'MATIC',
    subtitle: 'Polygon',
    icon: 'matic',
    address: '0x0000000000000000000000000000000000001010',
    coin: 'matic-network',
  },
  stackAddress: '0x980111ae1B84E50222C8843e3A7a038F36Fecd2b',
  networkSelected: {
    id: 137,
    title: 'Polygon PoS',
    icon: 'polygon',
  },
  slippageAmount: 0.5,
  errorMessage: '',
  isSummaryOpen: false,
  isWalletModalOpen: false,
  estimatedGas: null,
  tokenBalance: undefined,
  swapSuccess: false,
};

const reducer: Reducer<SwapState> = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SwapTypes.SET_SETTINGS_STATUS:
      return { ...state, isSettingsOpen: payload.value };

    case SwapTypes.SET_TOKEN_SELECT_STATUS:
      return { ...state, isTokenSelectOpen: payload.value };

    case SwapTypes.SET_ERROR_STATUS:
      return { ...state, isErrorOpen: payload.value };

    case SwapTypes.SET_LOADING:
      return { ...state, loading: payload.value };

    case SwapTypes.SET_STACK_PRICE:
      return { ...state, stackPrice: payload.value };

    case SwapTypes.SET_FROM_TOKEN_AMOUNT:
      return { ...state, fromTokenAmount: payload.value };

    case SwapTypes.SET_TO_TOKEN_AMOUNT:
      return { ...state, toTokenAmount: payload.value };

    case SwapTypes.SET_FROM_TOKEN_PRICE:
      return { ...state, fromTokenPrice: payload.value };

    case SwapTypes.SET_EXPECTED_OUTPUT:
      return { ...state, expectedOutput: payload.value };

    case SwapTypes.SET_TOKEN_OPTIONS:
      return { ...state, tokenOptions: payload.value };

    case SwapTypes.SET_TOKEN_SELECTED:
      return { ...state, tokenSelected: payload.value };

    case SwapTypes.SET_STACK_ADDRESS:
      return { ...state, stackAddress: payload.value };

    case SwapTypes.SET_NETWORK_SELECTED:
      return { ...state, networkSelected: payload.value };

    case SwapTypes.SET_SLIPPAGE_AMOUNT:
      return { ...state, slippageAmount: payload.value };

    case SwapTypes.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: payload.value };

    case SwapTypes.SET_SUMMARY_STATUS:
      return { ...state, isSummaryOpen: payload.value };

    case SwapTypes.SET_WALLET_MODAL_STATUS:
      return { ...state, isWalletModalOpen: payload.value };

    case SwapTypes.SET_ESTIMATED_GAS:
      return { ...state, estimatedGas: payload.value };

    case SwapTypes.SET_TOKEN_BALANCE:
      return { ...state, tokenBalance: payload.value };

    case SwapTypes.SET_SWAP_SUCCESS:
      return { ...state, swapSuccess: payload.value };

    case SwapTypes.GET_QUOTE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        expectedOutput: 0,
        fromTokenPrice: 0,
        stackPrice: 0,
      };

    case SwapTypes.GET_QUOTE_DATA_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case SwapTypes.GET_QUOTE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        toTokenAmount: null,
        fromTokenAmount: null,
        isTokenSelectOpen: false,
        isErrorOpen: true,
        errorMessage: payload.description,
      };

    case SwapTypes.RESET_STATE:
      return {
        ...INITIAL_STATE,
        stackPrice: 0,
        isSettingsOpen: false,
        isTokenSelectOpen: false,
        isErrorOpen: false,
        loading: false,
        fromTokenAmount: null,
        fromTokenPrice: 0,
        expectedOutput: 0,
        slippageAmount: 0.5,
        errorMessage: '',
        isSummaryOpen: false,
        isWalletModalOpen: false,
        estimatedGas: null,
      };

    default:
      return state;
  }
};

export const SwapActions = Actions;
export default reducer;
