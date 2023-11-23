import { action } from 'typesafe-actions';
import {
    DrawerActionTypes,
    DrawerState,
    DrawerSuccessValues,
    DrawerTypes,
    FormValues,
    PortValues,
    Step,
} from './types';
import { BalancesForSubscription, SubBalanceEstimate } from '@decloudlabs/stk-v2/lib/types/types';

export function setDrawerOpen(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_DRAWER_OPEN, { value });
}

export function setPrivateImage(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_PRIVATE_IMAGE, { value });
}

export function setAdvanceOptions(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_ADVANCE_OPTIONS, { value });
}

export function setPortValues(value: PortValues[]): DrawerActionTypes {
    return action(DrawerTypes.SET_PORT_VALUES, { value });
}

export function setCpuType(value: string): DrawerActionTypes {
    return action(DrawerTypes.SET_CPU_TYPE, { value });
}

export function setIsError(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_IS_ERROR, { value });
}

export function setDataPersistence(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_DATA_PERSISTENCE, { value });
}

export function setHardwareResource(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_HARDWARE_RESOURCE, { value });
}

export function setDrawerStatus(value: DrawerState['status']): DrawerActionTypes {
    return action(DrawerTypes.SET_DRAWER_STATUS, { value });
}

export function setUpdateFormFlag(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_UPDATE_FORM_FLAG, { value });
}

export function setFormValidationFunc(value: any): DrawerActionTypes {
    return action(DrawerTypes.SET_FORM_VALIDATION_FUNC, { value });
}

export function setSubBalanceEstimate(value: SubBalanceEstimate): DrawerActionTypes {
    return action(DrawerTypes.SET_SUB_BAL_ESTIMATE, { value });
}

export function setDrawerLoadingMessage(value: string): DrawerActionTypes {
    return action(DrawerTypes.SET_DRAWER_LOADING_MESSAGE, { value });
}

export function setDrawerSuccessValues(values: DrawerSuccessValues): DrawerActionTypes {
    return action(DrawerTypes.SET_DRAWER_SUCCESS_VALUES, { values });
}

export function setFormValues(payload: FormValues): DrawerActionTypes {
    return action(DrawerTypes.SET_FORM_VALUES, payload);
}

export function setCurrentStep(value: Step): DrawerActionTypes {
    return action(DrawerTypes.SET_CURRENT_STEP, { value });
}

export function setStepIndex(value: number): DrawerActionTypes {
    return action(DrawerTypes.SET_STEP_INDEX, { value });
}

export function setStep(stepIndex: number, currentStep: Step): DrawerActionTypes {
    return action(DrawerTypes.SET_STEP, { stepIndex, currentStep });
}

export function setDeployEnabled(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_DEPLOY_ENABLED, { value });
}

export function setDeployLoading(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.SET_DEPLOY_LOADING, { value });
}

export function setActiveSideStep(value: number): DrawerActionTypes {
    return action(DrawerTypes.SET_ACTIVE_SIDE_STEP, { value });
}

export function resetStateDrawer(): DrawerActionTypes {
    return action(DrawerTypes.RESET_STATE);
}

export function setClickOnConnectWallate(value: boolean): DrawerActionTypes {
    return action(DrawerTypes.CLICK_ON_CONNECT_WALLATE, { value });
}
