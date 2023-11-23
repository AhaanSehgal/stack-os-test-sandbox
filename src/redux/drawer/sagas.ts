// eslint-disable-next-line no-unused-vars
import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { DrawerTypes, SetDrawerOpen } from './types';
import { DrawerActions } from '.';
import { steps } from '@/components/DesktopLayout/drawer/helpers';

function* resetContent({ payload: { value } }: SetDrawerOpen) {
    if (value) {
        yield put(DrawerActions.setCurrentStep(steps[0]));
        yield put(DrawerActions.setDrawerStatus('default'));
    } else {
        yield put(DrawerActions.resetStateDrawer());
    }
}

function* drawerSaga() {
    yield all([takeLatest(DrawerTypes.SET_DRAWER_OPEN, resetContent)]);
}

export default drawerSaga;
