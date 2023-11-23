/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum HardwareTypes {
  SET_HARDWARE_SELECTED = '@hardware/SET_HARDWARE_SELECTED',
  RESET_STATE = '@hardware/RESET_STATE',
}

export interface SetHardwareSelected {
  type: HardwareTypes.SET_HARDWARE_SELECTED;
  payload: { value: Hardware | number };
}

export interface ResetState {
  type: HardwareTypes.RESET_STATE;
}

export type HardwareActionTypes = SetHardwareSelected | ResetState;

export interface HardwareState {
  hardwareSelected: Hardware;
}

export interface Hardware {
  id: number | string;
  hardwareId?: number;
  label?: string;
  iconName?: string;
  resourceUsage?: number;
  resourceLimit?: number;
}
