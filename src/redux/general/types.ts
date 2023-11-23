/* eslint-disable no-shadow */

import AppSenderStorage from '@/utils/AppSenderStorage';
import STKAppBrowserCache from '@decloudlabs/stk-v2/lib/services/STKAppBrowserCache';
import STKAppDecrypt from '@decloudlabs/stk-v2/lib/services/STKAppDecrypt';
import STKAppEncrypt from '@decloudlabs/stk-v2/lib/services/STKAppEncrypt';
import STKAppManager from '@decloudlabs/stk-v2/lib/services/STKAppManager';
import STKDripRateManager from '@decloudlabs/stk-v2/lib/services/STKDripRateManager';
import UmbralService from '@decloudlabs/stk-v2/lib/services/umbralService';
import {
    BalancesForSubscription,
    DripRateFactors,
    EtherContracts,
    SubscriptionParam,
} from '@decloudlabs/stk-v2/lib/types/types';
import BN from 'bn.js';

/* eslint-disable no-unused-vars */
export enum GeneralTypes {
    SET_LOGIN_MODAL_OPEN = '@General/SET_LOGIN_MODAL_OPEN',
    SET_IS_MOBILE = '@General/SET_IS_MOBILE',
    SET_USER_RESOURCES = '@General/SET_USER_RESOURCES',
    SET_RESOURCES_USAGE = '@General/SET_RESOURCES_USAGE',
    SET_RESOURCES_PRICE = '@General/SET_RESOURCES_PRICE',
    SET_FEES_PRICE = '@General/SET_FEES_PRICE',
    SET_STACK_TO_DOLLAR_PRICE = '@General/SET_STACK_TO_DOLLAR_PRICE',
    SET_SHELL_MODAL_OPEN = '@General/SET_SHELL_MODAL_OPEN',
    SET_SWAP_MODAL_OPEN = '@General/SET_SWAP_MODAL_OPEN',
    SET_CONNECTED_ACCOUNT = '@General/SET_CONNECTED_ACCOUNT',
    RESET_STATE = '@General/RESET_STATE',
    SELECTED_NFT = '@General/SELECTED_NFT',
    SET_NFT_ROLE = '@General/SET_NFT_ROLE',
    SET_CONTRACT_VALUES = '@General/SET_CONTRACT_VALUES',
    SET_METADATA_VALUES = '@General/SET_METADATA_VALUES',
    SET_BAL_FOR_SUBSCRIPTION = '@General/SET_BAL_FOR_SUBSCRIPTION',
    SET_DRIP_RATE_FACTORS = '@General/SET_DRIP_RATE_FACTORS',
    SET_SUBSCRIPTION_PARAM = '@General/SET_SUBSCRIPTION_PARAM',
    SET_BALANCE_END_TIME = '@General/SET_BALANCE_END_TIME',
    SET_CALC_DRIP_RATE_FLAG = '@General/SET_CALC_DRIP_RATE_FLAG',
    SET_APP_MANAGER = '@General/SET_APP_MANAGER',
    SET_FILE_APP_MANAGER = '@General/SET_FILE_APP_MANAGER',
    SET_APP_CRYPTO = '@General/SET_APP_CRYPTO',
}

export interface SetAppCrypto {
    type: GeneralTypes.SET_APP_CRYPTO;
    payload: { value: AppCrypto };
}
export interface SetFileAppManager {
    type: GeneralTypes.SET_FILE_APP_MANAGER;
    payload: { value: STKAppManager };
}

export interface SetAppManager {
    type: GeneralTypes.SET_APP_MANAGER;
    payload: { value: STKAppManager };
}

export interface SetBalancesForSubscription {
    type: GeneralTypes.SET_BAL_FOR_SUBSCRIPTION;
    payload: { value: BalancesForSubscription };
}

export interface SetDripRateFactors {
    type: GeneralTypes.SET_DRIP_RATE_FACTORS;
    payload: { value: DripRateFactors };
}

export interface SetSubscriptionParam {
    type: GeneralTypes.SET_SUBSCRIPTION_PARAM;
    payload: { value: SubscriptionParam };
}

export interface SetBalanceEndTime {
    type: GeneralTypes.SET_BALANCE_END_TIME;
    payload: { value: number };
}

export interface SetUserResources {
    type: GeneralTypes.SET_USER_RESOURCES;
    payload: { value: Resources };
}

export interface SetGroupModalOpen {
    type: GeneralTypes.SET_LOGIN_MODAL_OPEN;
    payload: { value: boolean };
}

export interface SetIsMobile {
    type: GeneralTypes.SET_IS_MOBILE;
    payload: { value: boolean };
}

export interface SetResourcesUsage {
    type: GeneralTypes.SET_RESOURCES_USAGE;
    payload: { value: Resources };
}
export interface SetResourcesPrice {
    type: GeneralTypes.SET_RESOURCES_PRICE;
    payload: { value: Resources };
}

export interface SetFeesPrice {
    type: GeneralTypes.SET_FEES_PRICE;
    payload: { value: Fees };
}
export interface SetStackToDollarPrice {
    type: GeneralTypes.SET_STACK_TO_DOLLAR_PRICE;
    payload: { value: BN };
}

export interface SetShellModalOpen {
    type: GeneralTypes.SET_SHELL_MODAL_OPEN;
    payload: { value: boolean };
}

export interface SetSwapModalOpen {
    type: GeneralTypes.SET_SWAP_MODAL_OPEN;
    payload: { value: boolean };
}

export interface SetConnectedAccount {
    type: GeneralTypes.SET_CONNECTED_ACCOUNT;
    payload: { value: string };
}

export interface ResetState {
    type: GeneralTypes.RESET_STATE;
}

export interface SetSelectedNft {
    type: GeneralTypes.SELECTED_NFT;
    payload: { value: string };
}

export interface SetNftRole {
    type: GeneralTypes.SET_NFT_ROLE;
    payload: { value: NftRole };
}

export interface SetMetaDataValues {
    type: GeneralTypes.SET_METADATA_VALUES;
    payload: { value: MetaDataValues };
}

export interface SetCalcDripRateFlag {
    type: GeneralTypes.SET_METADATA_VALUES;
    payload: { value: MetaDataValues };
}

export interface AppCrypto {
    umbralService: UmbralService;
    appEncryptor: STKAppEncrypt;
    appDecryptor: STKAppDecrypt;
    contractService: EtherContracts;
    appBrowserCache: STKAppBrowserCache;
    appIPFSStorage: AppSenderStorage;
    dripRateManager: STKDripRateManager;
}

export type GeneralActionTypes =
    | SetGroupModalOpen
    | SetIsMobile
    | SetUserResources
    | SetResourcesUsage
    | SetResourcesPrice
    | SetFeesPrice
    | SetStackToDollarPrice
    | SetShellModalOpen
    | SetSwapModalOpen
    | SetConnectedAccount
    | SetSelectedNft
    | SetNftRole
    | ResetState
    | SetBalancesForSubscription
    | SetDripRateFactors
    | SetBalanceEndTime
    | SetMetaDataValues
    | SetCalcDripRateFlag
    | SetAppManager
    | SetAppCrypto;

export interface GeneralState {
    isLoginModalOpen: boolean;
    isMobile: boolean;
    isShellModalOpen: boolean;
    isSwapModalOpen: boolean;
    connectedAccount?: string;
    selectedNft: string;
    nftRole: NftRole;
    balancesForSubscription: BalancesForSubscription;
    dripRateFactors: DripRateFactors;
    subscriptionParam: SubscriptionParam;
    metaDataValues: MetaDataValues;
    balanceEndTime: number;
    subnetList: { subnetName: string; subnetID: string }[];
    calculateDripRateFlag: boolean;
    appManager: STKAppManager | null;
    fileAppManager: STKAppManager | null;
    appCrypto: AppCrypto | null;
}

export interface SubnetNameId {
    subnetID: string;
    subnetName: string;
}

export interface NftRole {
    owner?: boolean;
    read?: boolean;
    deployer?: boolean;
}

export interface Fees {
    daoFee: number | null;
    govFee: number | null;
}
export interface Resources {
    cpuStandard: BN | number | null;
    cpuIntensive: BN | number | null;
    gpuStandard: BN | number | null;
    storage: BN | number | null;
    bandwidth?: BN | number | null;
}

export interface App {
    appID?: string;
    appName?: string;
    groupName?: string;
    enabled?: boolean;
    privateImageRegistry?: string;
    privateImageUsername?: string;
    privateImagePassword?: string;
    port?: string;
    protocol?: string;
    //   containerPort?: string;
    containerPort: { protocol: string; port: string }[];
    servicePort: { protocol: string; port: string }[];
    // portList: {protocol: string, containerPort: number, servicePort: number}
    privateImage?: boolean;
    persistenceEnabled?: boolean;
    replicaCount?: number;
    namespace?: string;
    resourceLimits?: any;
    resourceRequests?: any;
    enableCertKey?: boolean;
    networkId?: number;
    //   servicePort?: any;
    envVariables?: any;
    args?: any;
    commands?: any;
    infraNodeName?: string;
    volumeMounts?: any;
    hostUrl?: string;
    path?: string;
    whitelistedIps?: any;
    status?: string;
    label?: string;
    officialImage?: boolean;
    groupId?: any;
    storageSize?: string | number;
    storageType?: string;
    price?: number | string;
}

export interface Port {
    port: string;
    protocol: string;
}

export interface MetaDataValues {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    appToOpen?: string;
    bundleCID?: string;
    bundleData?: string;
}
