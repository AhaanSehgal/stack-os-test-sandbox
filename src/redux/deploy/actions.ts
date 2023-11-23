import { action } from 'typesafe-actions';
import { App, ContractApp } from '../general/types';
import { DeployActionTypes, DeployTypes } from './types';

export function setDeployedApps(value: ContractApp[] | null): DeployActionTypes {
    console.log('setting deployed apps: ', value);
    return action(DeployTypes.SET_DEPLOYED_APPS, { value });
}

export function resetStateDeploy(): DeployActionTypes {
    return action(DeployTypes.RESET_STATE_DEPLOY);
}

export function setLoading(value: boolean): DeployActionTypes {
    return action(DeployTypes.SET_LOADING, { value });
}

export function setGroupModalOpen(value: boolean): DeployActionTypes {
    return action(DeployTypes.SET_GROUP_MODAL_OPEN, { value });
}

export function setSelectedGroupApps(value: []): DeployActionTypes {
    return action(DeployTypes.SET_SELECTED_GROUP_APPS, { value });
}

export function setGroupName(value: string): DeployActionTypes {
    return action(DeployTypes.SET_GROUP_NAME, { value });
}

export function setIsEdit(value: boolean): DeployActionTypes {
    return action(DeployTypes.SET_IS_EDIT, { value });
}

export function setLastGroupEditedId(value: number): DeployActionTypes {
    return action(DeployTypes.SET_LAST_GROUP_EDITED_ID, { value });
}

export function setIsItemsCollapsed(value: boolean): DeployActionTypes {
    return action(DeployTypes.SET_IS_ITEMS_COLLAPSED, { value });
}
