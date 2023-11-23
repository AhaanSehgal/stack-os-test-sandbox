/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { DeployState, DeployTypes } from './types';

import * as Actions from './actions';

const INITIAL_STATE: DeployState = {
  deployedApps: null,
  loading: false,
  isGroupModalOpen: false,
  selectedGroupApps: [],
  groupName: '',
  isEdit: false,
  lastGroupEditedId: 0,
  isItemsCollapsed: false,
};

const reducer: Reducer<DeployState> = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case DeployTypes.SET_DEPLOYED_APPS:
      return { ...state, deployedApps: payload.value };

    case DeployTypes.SET_LOADING:
      return { ...state, loading: payload.value };

    case DeployTypes.RESET_STATE_DEPLOY:
      return INITIAL_STATE;

    case DeployTypes.SET_GROUP_MODAL_OPEN:
      return { ...state, isGroupModalOpen: payload.value };

    case DeployTypes.SET_SELECTED_GROUP_APPS:
      return { ...state, selectedGroupApps: payload.value };

    case DeployTypes.SET_GROUP_NAME:
      return { ...state, groupName: payload.value };

    case DeployTypes.SET_IS_EDIT:
      return { ...state, isEdit: payload.value };

    case DeployTypes.SET_LAST_GROUP_EDITED_ID:
      return { ...state, lastGroupEditedId: payload.value };

    case DeployTypes.SET_IS_ITEMS_COLLAPSED:
      return { ...state, isItemsCollapsed: payload.value };

    default:
      return state;
  }
};

export const DeployActions = Actions;
export default reducer;
