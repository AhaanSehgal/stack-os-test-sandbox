/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { AppStoreState, AppStoreTypes } from './types';

import * as Actions from './actions';

const INITIAL_STATE: AppStoreState = {
  apps: null,
  searchApp: undefined,
  loading: false,
  selectedApp: undefined,
  selectedAppConfig: undefined,
};

const reducer: Reducer<AppStoreState> = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AppStoreTypes.SET_APPS:
      return { ...state, apps: payload.data };

    case AppStoreTypes.SET_SEARCH_APP:
      return { ...state, searchApp: payload.data };

    case AppStoreTypes.GET_APP_DESCRIPTION:
      return { ...state, loading: true };

    case AppStoreTypes.GET_APP_TAGS:
      return { ...state, loading: true };

    case AppStoreTypes.SET_LOADING:
      return { ...state, loading: payload.value };

    case AppStoreTypes.SET_SELECTED_APP:
      return { ...state, selectedApp: payload.value };

    case AppStoreTypes.SET_SELECTED_APP_CONFIG:
      return { ...state, selectedAppConfig: payload.value };

    case AppStoreTypes.RESET_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export const AppStoreActions = Actions;
export default reducer;
