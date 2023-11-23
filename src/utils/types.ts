export interface Role {
  owner?: boolean;
  read?: boolean;
  deployer?: boolean;
  access?: boolean;
  billing?: boolean;
}

export interface NftData {
  [key: number]: Role;
  nftList: string[];
}

export interface AddressRole {
  [address: string]: Role;
}

export interface BobData {
  subnetList: number[];
  [subnetId: number]: { publicKey: number[] | null };
}

export interface AppDataStorage {
  _id: string;
  nftID: string;
  logType: string;
  logID: string;
  appID: string;
  appName: string;
  timestamp: string;
  operation: string;
  message: string;
}

export interface MetaMaskSuccessResponse {
  blockHash: string;
  blockNumber: number;
  contractAddress: any;
  cumulativeGasUsed: number;
  effectiveGasPrice: number;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: boolean;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: string;
  events: any;
}

export interface MetaMaskFailResponse {
  code: number;
  message: string;
  stack: string;
}

export type APIResponse<K, E> =
  | {
      resp: K;
      success: true;
    }
  | {
      resp: E;
      success: false;
    };

export interface APICallReturnSuccess<T> {
  success: true;
  data: T;
  statusCode?: number;
}

export interface APICallReturnError<E> {
  success: false;
  data: E;
  statusCode?: number;
  errors?: any;
}

export type APICallReturn<T, E = Error> = APICallReturnSuccess<T> | APICallReturnError<E>;
