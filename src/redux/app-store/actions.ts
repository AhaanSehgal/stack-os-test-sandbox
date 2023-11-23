import { action } from 'typesafe-actions';
import { AppStoreApp, AppStoreActionTypes, AppStoreTypes } from './types';

export function setApps(data: AppStoreApp[]): AppStoreActionTypes {
  return action(AppStoreTypes.SET_APPS, { data });
}

export function setSearchApp(data: AppStoreApp): AppStoreActionTypes {
  return action(AppStoreTypes.SET_SEARCH_APP, { data });
}

export function getAppDescription(
  officialImage?: boolean,
  repository?: string
): AppStoreActionTypes {
  return action(AppStoreTypes.GET_APP_DESCRIPTION, { officialImage, repository });
}

export function getAppTags(
  officialImage?: boolean,
  repository?: string,
  page?: number,
  ordering?: string,
  name?: string
): AppStoreActionTypes {
  return action(AppStoreTypes.GET_APP_TAGS, {
    officialImage,
    repository,
    page,
    ordering,
    name,
  });
}

export function setLoading(value: boolean): AppStoreActionTypes {
  return action(AppStoreTypes.SET_LOADING, { value });
}

export function setSelectedApp(value?: string | number): AppStoreActionTypes {
  return action(AppStoreTypes.SET_SELECTED_APP, { value });
}

export function setSelectedAppConfig(value: any[] | undefined): AppStoreActionTypes {
  return action(AppStoreTypes.SET_SELECTED_APP_CONFIG, { value });
}

export function resetState(): AppStoreActionTypes {
  return action(AppStoreTypes.RESET_STATE);
}
