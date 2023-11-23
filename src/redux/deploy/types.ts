/* eslint-disable no-shadow */

import { App, ContractApp } from '../general/types';

/* eslint-disable no-unused-vars */
export enum DeployTypes {
  SET_DEPLOYED_APPS = '@deploy/SET_DEPLOYED_APPS',
  SET_LOADING = '@deploy/SET_LOADING',
  SET_GROUP_MODAL_OPEN = '@deploy/SET_GROUP_MODAL_OPEN',
  SET_SELECTED_GROUP_APPS = '@deploy/SET_SELECTED_GROUP_APPS',
  SET_GROUP_NAME = '@deploy/SET_GROUP_NAME',
  SET_IS_EDIT = '@deploy/SET_IS_EDIT',
  SET_LAST_GROUP_EDITED_ID = '@deploy/SET_LAST_GROUP_EDITED_ID',
  SET_IS_ITEMS_COLLAPSED = '@deploy/SET_IS_ITEMS_COLLAPSED',
  RESET_STATE_DEPLOY = '@deploy/RESET_STATE_DEPLOY',
}

export interface SetDeployedApps {
  type: DeployTypes.SET_DEPLOYED_APPS;
  payload: { value: ContractApp[] | null };
}

export interface ResetStateDeploy {
  type: DeployTypes.RESET_STATE_DEPLOY;
}
export interface SetLoading {
  type: DeployTypes.SET_LOADING;
  payload: { value: boolean };
}
export interface SetGroupModalOpen {
  type: DeployTypes.SET_GROUP_MODAL_OPEN;
  payload: { value: boolean };
}
export interface SetSelectedGroupApps {
  type: DeployTypes.SET_SELECTED_GROUP_APPS;
  payload: { value: [] };
}

export interface SetGroupName {
  type: DeployTypes.SET_GROUP_NAME;
  payload: { value: string };
}

export interface SetIsEdit {
  type: DeployTypes.SET_IS_EDIT;
  payload: { value: boolean };
}

export interface SetLastGroupEditedId {
  type: DeployTypes.SET_LAST_GROUP_EDITED_ID;
  payload: { value: number };
}

export interface SetIsItemsCollapsed {
  type: DeployTypes.SET_IS_ITEMS_COLLAPSED;
  payload: { value: boolean };
}

export type DeployActionTypes =
  | SetDeployedApps
  | SetLoading
  | SetGroupModalOpen
  | SetSelectedGroupApps
  | SetGroupName
  | SetIsEdit
  | SetLastGroupEditedId
  | SetIsItemsCollapsed
  | ResetStateDeploy;

export interface DeployState {
  deployedApps: ContractApp[] | null;
  loading: boolean;
  isGroupModalOpen: boolean;
  selectedGroupApps: [];
  groupName: string;
  isEdit: boolean;
  lastGroupEditedId: number;
  isItemsCollapsed: boolean;
}
