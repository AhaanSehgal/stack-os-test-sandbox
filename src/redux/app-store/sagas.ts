import { all, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { AppStoreTypes, GetAppDescription, GetAppTags } from './types';
import { AppStoreActions } from '.';
import * as selectors from '../selectors';

function* getAppDescription({ payload: { officialImage, repository } }: GetAppDescription) {
  try {
    const { searchApp } = yield selectors.getAppStore();

    const appDetails: AxiosResponse = yield axios.get(`/api/dockerhub/description`, {
      params: { officialImage, repository },
    });

    yield put(
      AppStoreActions.setSearchApp({
        ...searchApp,
        dockerDescription: appDetails?.data?.full_description || null,
      })
    );

    yield put(AppStoreActions.setLoading(false));
  } catch (err) {
    yield put(AppStoreActions.setLoading(false));
    console.error(err);
  }
}

function* getAppTags({ payload: { officialImage, repository, page, ordering, name } }: GetAppTags) {
  try {
    const { searchApp } = yield selectors.getAppStore();

    const tags: AxiosResponse = yield axios.get(`/api/dockerhub/tags`, {
      params: { officialImage, repository, page, ordering, name },
    });

    yield put(
      AppStoreActions.setSearchApp({
        ...searchApp,
        tags: tags?.data || null,
      })
    );

    yield put(AppStoreActions.setLoading(false));
  } catch (err) {
    yield put(AppStoreActions.setLoading(false));
    console.error(err);
  }
}

function* appStoreSaga() {
  yield all([takeLatest(AppStoreTypes.GET_APP_DESCRIPTION, getAppDescription)]);
  yield all([takeLatest(AppStoreTypes.GET_APP_TAGS, getAppTags)]);
}

export default appStoreSaga;
