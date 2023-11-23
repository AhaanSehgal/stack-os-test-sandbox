import { select } from 'redux-saga/effects';

import ApplicationState from './types';

export function* getGeneral() {
  const generalState: ApplicationState = yield select((state: ApplicationState) => state.general);
  return generalState;
}

export function* getAppStore() {
  const appStoreState: ApplicationState = yield select((state: ApplicationState) => state.appStore);
  return appStoreState;
}

export function* getDrawer() {
  const drawerState: ApplicationState = yield select((state: ApplicationState) => state.drawer);
  return drawerState;
}

export function* getHardware() {
  const hardwareState: ApplicationState = yield select((state: ApplicationState) => state.hardware);
  return hardwareState;
}

export function* getSwap() {
  const swapState: ApplicationState = yield select((state: ApplicationState) => state.swap);
  return swapState;
}
