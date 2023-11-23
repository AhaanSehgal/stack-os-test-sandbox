/* eslint-disable import/prefer-default-export */
import { action } from 'typesafe-actions';
import { Hardware, HardwareActionTypes, HardwareTypes } from './types';

export function setHardwareSelected(value: Hardware | number): HardwareActionTypes {
  return action(HardwareTypes.SET_HARDWARE_SELECTED, { value });
}

export function resetStateHardware(): HardwareActionTypes {
  return action(HardwareTypes.RESET_STATE);
}
