/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { GeneralState, GeneralTypes } from './types';

import * as Actions from './actions';

const INITIAL_STATE: GeneralState = {
    isLoginModalOpen: false,
    isMobile: false,
    // userResources: {
    //     cpu: null,
    //     memory: null,
    //     storage: null,
    //     bandwidth: null,
    // },
    // resourcesUsage: {
    //     cpu: null,
    //     memory: null,
    //     storage: null,
    //     bandwidth: null,
    // },
    // resourcesPrice: {
    //     cpu: null,
    //     memory: null,
    //     storage: null,
    //     bandwidth: null,
    // },
    // feesPrice: {
    //     daoFee: null,
    //     govFee: null,
    // },
    // stackToDollarPrice: null,
    isShellModalOpen: false,
    isSwapModalOpen: false,
    connectedAccount: undefined,
    selectedNft: '',
    nftRole: {},
    dripRateFactors: {
        licenseFactor: [0, 0],
        supportFactor: [0, 0],
        platformFactor: 0,
        referralFactor: 0,
        discountFactor: 0,
        referralExpiryDuration: 0,
        createTime: 0,
    },
    balancesForSubscription: {
        subscriptionBalance: '0',
        walletBalance: '0',
    },
    subscriptionParam: {
        licenseAddress: '0x0000000000000000000000000000000000000000',
        supportAddress: '0x0000000000000000000000000000000000000000',
        platformAddress: '0x0000000000000000000000000000000000000000',
        referralAddress: '0x0000000000000000000000000000000000000000',
        createTime: 0,
    },
    balanceEndTime: 0,
    metaDataValues: {
        id: '',
        name: '',
        description: '',
        image: '',
        appToOpen: '',
        bundleCID: '',
        bundleData: '',
    },
    subnetList: [
        {
            subnetName: 'marvel',
            subnetID: '0',
        },
        {
            subnetName: 'matrix',
            subnetID: '1',
        },
        {
            subnetName: 'skybeam',
            subnetID: '1',
        },
    ],
    calculateDripRateFlag: true,
    appManager: null,
    fileAppManager: null,
    appCrypto: null,
};

const reducer: Reducer<GeneralState> = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GeneralTypes.SET_LOGIN_MODAL_OPEN:
            return { ...state, isLoginModalOpen: payload.value };

        case GeneralTypes.SELECTED_NFT:
            return { ...state, selectedNft: payload.value };

        case GeneralTypes.SET_NFT_ROLE:
            return { ...state, nftRole: payload.value };

        case GeneralTypes.SET_IS_MOBILE:
            return { ...state, isMobile: payload.value };

        case GeneralTypes.SET_USER_RESOURCES:
            return {
                ...state,
                userResources: payload.value,
            };

        case GeneralTypes.SET_RESOURCES_USAGE:
            return {
                ...state,
                resourcesUsage: payload.value,
            };

        case GeneralTypes.SET_RESOURCES_PRICE:
            return {
                ...state,
                resourcesPrice: payload.value,
            };

        case GeneralTypes.SET_FEES_PRICE:
            return {
                ...state,
                feesPrice: payload.value,
            };

        case GeneralTypes.SET_STACK_TO_DOLLAR_PRICE:
            return {
                ...state,
                stackToDollarPrice: payload.value,
            };

        case GeneralTypes.SET_SHELL_MODAL_OPEN:
            return { ...state, isShellModalOpen: payload.value };

        case GeneralTypes.SET_SWAP_MODAL_OPEN:
            return { ...state, isSwapModalOpen: payload.value };

        case GeneralTypes.SET_CONNECTED_ACCOUNT:
            return { ...state, connectedAccount: payload.value };

        case GeneralTypes.SET_METADATA_VALUES:
            return { ...state, metaDataValues: payload.value };

        case GeneralTypes.SET_BAL_FOR_SUBSCRIPTION:
            return { ...state, balancesForSubscription: payload.value };

        case GeneralTypes.SET_DRIP_RATE_FACTORS:
            return { ...state, dripRateFactors: payload.value };

        case GeneralTypes.SET_SUBSCRIPTION_PARAM:
            return { ...state, subscriptionParam: payload.value };

        case GeneralTypes.SET_BALANCE_END_TIME:
            return { ...state, balanceEndTime: payload.value };

        case GeneralTypes.SET_CALC_DRIP_RATE_FLAG:
            return { ...state, calculateDripRateFlag: payload.value };

        case GeneralTypes.SET_APP_MANAGER:
            return { ...state, appManager: payload.value };

        case GeneralTypes.SET_FILE_APP_MANAGER:
            return { ...state, fileAppManager: payload.value };

        case GeneralTypes.SET_APP_CRYPTO:
            return { ...state, appCrypto: payload.value };

        case GeneralTypes.RESET_STATE:
            INITIAL_STATE.isMobile = state.isMobile;
            INITIAL_STATE.isLoginModalOpen = state.isLoginModalOpen;

            return INITIAL_STATE;

        default:
            return state;
    }
};

export const GeneralActions = Actions;
export default reducer;
