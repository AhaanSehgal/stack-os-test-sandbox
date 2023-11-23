/* eslint-disable no-shadow */

import { App } from '../general/types';

/* eslint-disable no-unused-vars */
export enum AppStoreTypes {
  SET_APPS = '@appStore/SET_APPS',
  SET_SEARCH_APP = '@appStore/SET_SEARCH_APP',
  GET_APP_DESCRIPTION = '@appStore/GET_APP_DESCRIPTION',
  GET_APP_TAGS = '@appStore/GET_APP_TAGS',
  SET_LOADING = '@appStore/SET_LOADING',
  SET_SELECTED_APP = '@appStore/SET_SELECTED_APP',
  SET_SELECTED_APP_CONFIG = '@appStore/SET_SELECTED_APP_CONFIG',

  RESET_STATE = '@appStore/RESET_STATE',
}

export interface SetApps {
  type: AppStoreTypes.SET_APPS;
  payload: { data: AppStoreApp[] };
}
export interface GetAppDescription {
  type: AppStoreTypes.GET_APP_DESCRIPTION;
  payload: { officialImage?: boolean; namespace?: string; repository?: string };
}

export interface GetAppTags {
  type: AppStoreTypes.GET_APP_TAGS;
  payload: {
    officialImage?: boolean;
    namespace?: string;
    repository?: string;
    page?: number;
    ordering?: string;
    name?: string;
  };
}

export interface SetLoading {
  type: AppStoreTypes.SET_LOADING;
  payload: { value: boolean };
}

export interface SetSearchApp {
  type: AppStoreTypes.SET_SEARCH_APP;
  payload: { data: AppStoreApp };
}

export interface SetSelectedApp {
  type: AppStoreTypes.SET_SELECTED_APP;
  payload: { value: string | number | undefined };
}

export interface SetSelectedAppConfig {
  type: AppStoreTypes.SET_SELECTED_APP_CONFIG;
  payload: { value: any[] | undefined };
}

export interface ResetState {
  type: AppStoreTypes.RESET_STATE;
}

export type AppStoreActionTypes =
  | SetApps
  | GetAppDescription
  | GetAppTags
  | SetLoading
  | SetSearchApp
  | SetSelectedApp
  | SetSelectedAppConfig
  | ResetState;

export interface AppStoreState {
  apps: AppStoreApp[] | null;
  searchApp?: AppStoreApp;
  loading?: boolean;
  selectedApp?: string | number | undefined;
  selectedAppConfig?: any[];
}

export interface AppStoreApp extends App {
  appName: string;
  hostUrl: string;
  image: any;
  enabled: true;
  title?: string;
  category?: string;
  description?: string;
  dockerDescription?: string;
  coverImage?: string;
  featured: boolean;
  namespace?: string;
  repository?: string;
  tags?: { results: any[]; count: number; next: string; previous: string };
  necessaryApps?: App[];
}
