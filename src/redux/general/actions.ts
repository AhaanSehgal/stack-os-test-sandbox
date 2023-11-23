import BN from 'bn.js';
import { action } from 'typesafe-actions';
import {
    AppCrypto,
    Fees,
    GeneralActionTypes,
    GeneralTypes,
    MetaDataValues,
    NftRole,
    Resources,
} from './types';
import {
    BalancesForSubscription,
    DripRateFactors,
    SubscriptionParam,
} from '@decloudlabs/stk-v2/lib/types/types';
import STKAppManager from '@decloudlabs/stk-v2/lib/services/STKAppManager';

export function setLoginModal(value: boolean): GeneralActionTypes {
    return action(GeneralTypes.SET_LOGIN_MODAL_OPEN, { value });
}

export function setIsMobile(value: boolean): GeneralActionTypes {
    return action(GeneralTypes.SET_IS_MOBILE, { value });
}

export function setUserResources(value: Resources): GeneralActionTypes {
    return action(GeneralTypes.SET_USER_RESOURCES, { value });
}

export function setResourcesUsage(value: Resources): GeneralActionTypes {
    return action(GeneralTypes.SET_RESOURCES_USAGE, { value });
}

export function setResourcesPrice(value: Resources): GeneralActionTypes {
    return action(GeneralTypes.SET_RESOURCES_PRICE, { value });
}

export function setFeesPrice(value: Fees): GeneralActionTypes {
    return action(GeneralTypes.SET_FEES_PRICE, { value });
}

export function setStackToDollarPrice(value: BN): GeneralActionTypes {
    return action(GeneralTypes.SET_STACK_TO_DOLLAR_PRICE, { value });
}

export function setShellModalOpen(value: boolean): GeneralActionTypes {
    return action(GeneralTypes.SET_SHELL_MODAL_OPEN, { value });
}

export function setSwapModalOpen(value: boolean): GeneralActionTypes {
    return action(GeneralTypes.SET_SWAP_MODAL_OPEN, { value });
}

export function setConnectedAccount(value: string): GeneralActionTypes {
    return action(GeneralTypes.SET_CONNECTED_ACCOUNT, { value });
}

export function resetStateGeneral(): GeneralActionTypes {
    return action(GeneralTypes.RESET_STATE);
}

export function setSelectedNft(value: string): GeneralActionTypes {
    return action(GeneralTypes.SELECTED_NFT, { value });
}

export function setNftRole(value: NftRole): GeneralActionTypes {
    return action(GeneralTypes.SET_NFT_ROLE, { value });
}

export function setMetaDataValues(value: MetaDataValues): GeneralActionTypes {
    return action(GeneralTypes.SET_METADATA_VALUES, { value });
}

export function setBalancesForSubscription(value: BalancesForSubscription): GeneralActionTypes {
    return action(GeneralTypes.SET_BAL_FOR_SUBSCRIPTION, { value });
}

export function setDripRateFactors(value: DripRateFactors): GeneralActionTypes {
    return action(GeneralTypes.SET_DRIP_RATE_FACTORS, { value });
}

export function setSubscriptionParam(value: SubscriptionParam): GeneralActionTypes {
    return action(GeneralTypes.SET_SUBSCRIPTION_PARAM, { value });
}

export function setBalanceEndTime(value: number): GeneralActionTypes {
    return action(GeneralTypes.SET_BALANCE_END_TIME, { value });
}

export function setCalcDripRateFlag(value: boolean): GeneralActionTypes {
    console.log('setting calc drip rate flag: ', value);
    return action(GeneralTypes.SET_CALC_DRIP_RATE_FLAG, { value });
}

export function setAppManager(value: STKAppManager): GeneralActionTypes {
    return action(GeneralTypes.SET_APP_MANAGER, { value });
}

export function setAppCrypto(value: AppCrypto): GeneralActionTypes {
    return action(GeneralTypes.SET_APP_CRYPTO, { value });
}

export function setFileAppManager(value: STKAppManager): GeneralActionTypes {
    return action(GeneralTypes.SET_FILE_APP_MANAGER, { value });
}
