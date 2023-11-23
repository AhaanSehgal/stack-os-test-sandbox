/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum SwapTypes {
  SET_LOADING = '@swap/SET_LOADING',
  SET_STACK_PRICE = '@swap/SET_STACK_PRICE',
  SET_FROM_TOKEN_AMOUNT = '@swap/SET_FROM_TOKEN_AMOUNT',
  SET_TO_TOKEN_AMOUNT = '@swap/SET_TO_TOKEN_AMOUNT',
  SET_FROM_TOKEN_PRICE = '@swap/SET_FROM_TOKEN_PRICE',
  SET_EXPECTED_OUTPUT = '@swap/SET_EXPECTED_OUTPUT',
  SET_SETTINGS_STATUS = '@swap/SET_SETTINGS_STATUS',
  SET_TOKEN_SELECT_STATUS = '@swap/SET_TOKEN_SELECT_STATUS',
  SET_ERROR_STATUS = '@swap/SET_ERROR_STATUS',
  SET_TOKEN_OPTIONS = '@swap/SET_TOKEN_OPTIONS',
  SET_TOKEN_SELECTED = '@swap/SET_TOKEN_SELECTED',
  SET_STACK_ADDRESS = '@swap/SET_STACK_ADDRESS',
  SET_NETWORK_SELECTED = '@swap/SET_NETWORK_SELECTED',
  SET_SLIPPAGE_AMOUNT = '@swap/SET_SLIPPAGE_AMOUNT',
  SET_ERROR_MESSAGE = '@swap/SET_ERROR_MESSAGE',
  SET_SUMMARY_STATUS = '@swap/SET_SUMMARY_STATUS',
  SET_WALLET_MODAL_STATUS = '@swap/SET_WALLET_MODAL_STATUS',
  SET_ESTIMATED_GAS = '@swap/SET_ESTIMATED_GAS',
  SET_TOKEN_BALANCE = '@swap/SET_TOKEN_BALANCE',
  SET_SWAP_SUCCESS = '@swap/SET_SWAP_SUCCESS',
  RESET_STATE = '@swap/RESET_STATE',

  GET_QUOTE_DATA_REQUEST = '@swap/GET_QUOTE_DATA_REQUEST',
  GET_QUOTE_DATA_SUCCESS = '@swap/GET_QUOTE_DATA_SUCCESS',
  GET_QUOTE_DATA_FAILURE = '@swap/GET_QUOTE_DATA_FAILURE',
}

export interface SetSettingsStatus {
  type: SwapTypes.SET_SETTINGS_STATUS;
}

export interface SetTokenSelectStatus {
  type: SwapTypes.SET_TOKEN_SELECT_STATUS;
}

export interface SetErrorStatus {
  type: SwapTypes.SET_ERROR_STATUS;
}

export interface SetLoading {
  type: SwapTypes.SET_LOADING;
}

export interface SetStackPrice {
  type: SwapTypes.SET_STACK_PRICE;
  payload: { value: number };
}

export interface SetFromTokenAmount {
  type: SwapTypes.SET_FROM_TOKEN_AMOUNT;
  payload: { value: number };
}

export interface SetToTokenAmount {
  type: SwapTypes.SET_TO_TOKEN_AMOUNT;
  payload: { value: number | null };
}

export interface SetFromTokenPrice {
  type: SwapTypes.SET_FROM_TOKEN_PRICE;
  payload: { value: number };
}

export interface SetExpectedOutput {
  type: SwapTypes.SET_EXPECTED_OUTPUT;
  payload: { value: number };
}

export interface SetTokenOptions {
  type: SwapTypes.SET_TOKEN_OPTIONS;
  payload: { value: any[] };
}

export interface SetTokenSelected {
  type: SwapTypes.SET_TOKEN_SELECTED;
  payload: { value: any };
}

export interface SetStackAddress {
  type: SwapTypes.SET_STACK_ADDRESS;
  payload: { value: string };
}

export interface SetNetworkSelected {
  type: SwapTypes.SET_NETWORK_SELECTED;
  payload: { value: any };
}

export interface SetSlippageAmount {
  type: SwapTypes.SET_SLIPPAGE_AMOUNT;
  payload: { value: number };
}

export interface SetErrorMessage {
  type: SwapTypes.SET_ERROR_MESSAGE;
}

export interface SetSummaryStatus {
  type: SwapTypes.SET_SUMMARY_STATUS;
}

export interface SetWalletModalStatus {
  type: SwapTypes.SET_WALLET_MODAL_STATUS;
}

export interface SetEstimatedGas {
  type: SwapTypes.SET_ESTIMATED_GAS;
  payload: { value: number };
}

export interface SetTokenBalance {
  type: SwapTypes.SET_TOKEN_BALANCE;
  payload: { value: number | undefined | null };
}

export interface SetSwapSuccess {
  type: SwapTypes.SET_SWAP_SUCCESS;
  payload: { value: boolean };
}

export interface ResetState {
  type: SwapTypes.RESET_STATE;
}

export interface GetQuoteData {
  type: SwapTypes.GET_QUOTE_DATA_REQUEST;
  payload: {
    swapParams: any;
    networkId: number;
    tokenAmount: number | null;
    coin: string;
    isStack: boolean;
  };
}

export interface GetQuoteDataSuccess {
  type: SwapTypes.GET_QUOTE_DATA_SUCCESS;
  payload: {
    toTokenAmount: number;
    fromTokenAmount: number;
    expectedOutput: number;
    estimatedGas: number;
  };
}

export interface GetQuoteDataFailure {
  type: SwapTypes.GET_QUOTE_DATA_FAILURE;
  payload: { description: string };
}

export type SwapActionTypes =
  | SetStackPrice
  | SetSettingsStatus
  | SetTokenSelectStatus
  | SetErrorStatus
  | SetLoading
  | SetFromTokenAmount
  | SetToTokenAmount
  | SetFromTokenPrice
  | SetExpectedOutput
  | SetTokenOptions
  | SetTokenSelected
  | SetStackAddress
  | SetNetworkSelected
  | SetSlippageAmount
  | SetErrorMessage
  | SetSummaryStatus
  | SetWalletModalStatus
  | SetEstimatedGas
  | SetTokenBalance
  | SetSwapSuccess
  | ResetState
  | GetQuoteData
  | GetQuoteDataSuccess
  | GetQuoteDataFailure;

export interface SwapState {
  loading: boolean;
  fromTokenAmount: number | null;
  toTokenAmount: number | null;
  fromTokenPrice: number;
  stackPrice: number;
  expectedOutput: number;
  isSettingsOpen: boolean;
  isTokenSelectOpen: boolean;
  isErrorOpen: boolean;
  tokenOptions: any[];
  tokenSelected: any;
  stackAddress: string;
  networkSelected: any;
  slippageAmount: number;
  errorMessage: string;
  isSummaryOpen: boolean;
  isWalletModalOpen: boolean;
  estimatedGas: number | null;
  tokenBalance: number | undefined;
  swapSuccess: boolean;
}

export interface Quote {
  error?: any;
  estimatedGas: number;
  fromTokenAmount: number;
  toTokenAmount: number;
}

export interface CoinPrice {
  stackos?: { usd: number };
  ethereum?: { usd: number };
  'usd-coin'?: { usd: number };
  tether?: { usd: number };
  weth?: { usd: number };
  'matic-network'?: { usd: number };
  binancecoin?: { usd: number };
  'binance-usd'?: { usd: number };
  wbnb?: { usd: number };
}
