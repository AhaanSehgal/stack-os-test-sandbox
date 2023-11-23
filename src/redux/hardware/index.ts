/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { HardwareState, HardwareTypes } from './types';

import * as Actions from './actions';
import { hardwareList } from '@/components/hardware/helpers';

const INITIAL_STATE: HardwareState = {
    hardwareSelected: hardwareList[0],
};

const reducer: Reducer<HardwareState> = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case HardwareTypes.SET_HARDWARE_SELECTED:
            return { ...state, hardwareSelected: payload.value };

        case HardwareTypes.RESET_STATE:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const HardwareActions = Actions;
export default reducer;
