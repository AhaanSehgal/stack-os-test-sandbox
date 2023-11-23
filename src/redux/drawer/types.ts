/* eslint-disable no-shadow */

import { BalancesForSubscription, SubBalanceEstimate } from '@decloudlabs/stk-v2/lib/types/types';
import { App } from '../general/types';

/* eslint-disable no-unused-vars */
export enum DrawerTypes {
    SET_DRAWER_OPEN = '@drawer/SET_DRAWER_OPEN',
    SET_PRIVATE_IMAGE = '@drawer/SET_PRIVATE_IMAGE',
    SET_ADVANCE_OPTIONS = '@drawer/SET_ADVANCE_OPTIONS',
    SET_PORT_VALUES = '@drawer/SET_PORT_VALUES',
    SET_CPU_TYPE = '@drawer/SET_CPU_TYPE',
    SET_IS_ERROR = '@drawer/SET_IS_ERROR',
    SET_DATA_PERSISTENCE = '@drawer/SET_DATA_PERSISTENCE',
    SET_DRAWER_STATUS = '@drawer/SET_DRAWER_STATUS',
    SET_DRAWER_LOADING_MESSAGE = '@drawer/SET_DRAWER_LOADING_MESSAGE',
    SET_DRAWER_SUCCESS_VALUES = '@drawer/SET_DRAWER_SUCCESS_VALUES',
    SET_FORM_VALUES = '@drawer/SET_FORM_VALUES',
    SET_CURRENT_STEP = '@drawer/SET_CURRENT_STEP',
    SET_STEP_INDEX = '@drawer/SET_STEP_INDEX',
    SET_DEPLOY_ENABLED = '@drawer/SET_DEPLOY_ENABLED',
    SET_ACTIVE_SIDE_STEP = '@drawer/SET_ACTIVE_SIDE_STEP',
    RESET_STATE = '@drawer/RESET_STATE',
    SET_SELECTED_BOB_VALUE = '@drawer/SET_SELECTED_BOB_VALUE',
    SELECTED_NFT = '@drawer/SELECTED_NFT',
    CLICK_ON_CONNECT_WALLATE = 'drawer/CLICK_ON_CONNECT_WALLATE',
    SET_HARDWARE_RESOURCE = 'drawer/SET_HARDWARE_RESOURCE',
    SET_STEP = 'drawer/SET_STEP',
    SET_DEPLOY_LOADING = 'drawer/SET_DEPLOY_LOADING',
    SET_FORM_VALIDATION_FUNC = 'drawer/SET_FORM_VALIDATION_FUNC',
    SET_UPDATE_FORM_FLAG = 'drawer/SET_UPDATE_FORM_FLAG',
    SET_SUB_BAL_ESTIMATE = 'drawer/SET_SUB_BAL_ESTIMATE',
}

export interface SetUpdateFormFlag {
    type: DrawerTypes.SET_UPDATE_FORM_FLAG;
    payload: { value: any };
}

export interface SetFormValidationFunc {
    type: DrawerTypes.SET_FORM_VALIDATION_FUNC;
    payload: { value: any };
}

export interface SetSubBalanceEstimate {
    type: DrawerTypes.SET_SUB_BAL_ESTIMATE;
    payload: { value: SubBalanceEstimate };
}

export interface SetDrawerOpen {
    type: DrawerTypes.SET_DRAWER_OPEN;
    payload: { value: boolean };
}

export interface SetPrivateImage {
    type: DrawerTypes.SET_PRIVATE_IMAGE;
    payload: { value: boolean };
}

export interface SetAdvanceOptions {
    type: DrawerTypes.SET_ADVANCE_OPTIONS;
    payload: { value: boolean };
}

export interface SetPortValues {
    type: DrawerTypes.SET_PORT_VALUES;
    payload: { value: PortValues[] };
}

export interface SetCpuType {
    type: DrawerTypes.SET_CPU_TYPE;
    payload: { value: string };
}

export interface SetSelectedBobValues {
    type: DrawerTypes.SET_SELECTED_BOB_VALUE;
    payload: { value: PortValues[] };
}

export interface SetIsError {
    type: DrawerTypes.SET_IS_ERROR;
    payload: { value: boolean };
}

export interface SetDataPersistence {
    type: DrawerTypes.SET_DATA_PERSISTENCE;
    payload: { value: boolean };
}

export interface SetDrawerStatus {
    type: DrawerTypes.SET_DRAWER_STATUS;
    payload: { value: string };
}

export interface SetLoadingMessage {
    type: DrawerTypes.SET_DRAWER_LOADING_MESSAGE;
    payload: { value: string };
}

export interface SetDrawerSuccessValues {
    type: DrawerTypes.SET_DRAWER_SUCCESS_VALUES;
    payload: { values: any };
}

export interface SetFormValues {
    type: DrawerTypes.SET_FORM_VALUES;
    payload: FormValues;
}

export interface SetCurrentStep {
    type: DrawerTypes.SET_CURRENT_STEP;
    payload: { value: Step };
}

export interface SetStepIndex {
    type: DrawerTypes.SET_STEP_INDEX;
    payload: { value: number };
}

export interface SetStep {
    type: DrawerTypes.SET_STEP;
    payload: { stepIndex: number; currentStep: Step };
}

export interface SetDeployEnabled {
    type: DrawerTypes.SET_DEPLOY_ENABLED;
    payload: { value: boolean };
}

export interface SetActiveSideStep {
    type: DrawerTypes.SET_ACTIVE_SIDE_STEP;
    payload: { value: number };
}

export interface SetDeployLoading {
    type: DrawerTypes.SET_DEPLOY_LOADING;
    payload: { value: boolean };
}

export interface ResetState {
    type: DrawerTypes.RESET_STATE;
}

export interface SetClickOnConnectWallate {
    type: DrawerTypes.CLICK_ON_CONNECT_WALLATE;
}

export interface SetHardwareResource {
    type: DrawerTypes.SET_HARDWARE_RESOURCE;
}

// export interface SetTotalDripRate {
//     type: DrawerTypes.SET_TOTAL_DRIP_RATE;
// }

export type DrawerActionTypes =
    | SetDrawerOpen
    | SetPrivateImage
    | SetAdvanceOptions
    | SetPortValues
    | SetCpuType
    | SetIsError
    | SetDataPersistence
    | SetDrawerStatus
    | SetLoadingMessage
    | SetDrawerSuccessValues
    | SetSelectedBobValues
    | SetFormValues
    | SetStepIndex
    | SetStep
    | SetCurrentStep
    | SetDeployEnabled
    | SetActiveSideStep
    | SetClickOnConnectWallate
    | SetHardwareResource
    | ResetState
    | SetSubBalanceEstimate
    | SetDeployLoading
    | SetFormValidationFunc
    | SetUpdateFormFlag;

export interface DrawerState {
    isDrawerOpen: boolean;
    privateImage: boolean;
    advanceOptions: boolean;
    isError: boolean;
    portValues: PortValues[];
    dataPersistence: boolean;
    status:
        | 'default'
        | 'loading'
        | 'deploy-success'
        | 'deploy-form'
        | 'deploy-app'
        | 'deploy-edit'
        | 'purchase-resources'
        | 'upgrade-success'
        | 'upload-form'
        | 'upload-form-update';
    loadingMessage: string;
    drawerSuccessValues: DrawerSuccessValues;
    selectedBobValues: [];
    stepIndex: number;
    currentStep: Step;
    activeSideStep: number;
    formValues: FormValues;
    deployEnabled: boolean;
    clickOnConnectWallate: boolean;
    hardwareResource: boolean;
    deployLoading: boolean;
    formValidationFunc: any;
    updateFormFlag: boolean;
    subBalEstimate: SubBalanceEstimate;
    // totalDripRate: string;
}

export interface Step {
    id: number;
    name: string;
    icon: string;
    title?: string;
}

export interface SubnetReplicaMap {
    [key: string]: number;
}

export interface CreateAppVolumeMounts {
    mountPath: string;
    name: string; // should just get rid of thie. THis is going to be app name always.
}

export interface CreateAppEnvVariables {
    name: string;
    value: string;
}

export interface CreateAppImage {
    repository: string;
    tag: string;
}

export interface WebTTYAppPayload {
    namespace: string;
    username: string;
    password: string;
    // cpu: string;
    // memory: string;
    networkId: string;
    nftID: string;
}

export interface AttributeVariable {
    name: string;
    condition: string;
    conditionDescription?: string;
    defaultValue?: string;
}

export interface AttributeVariableParam {
    condition: any;
    conditionDescription: any;
    defaultValue: any;
}
export interface AttributeVariableValue {
    currentValue: any;
}

export interface FormValues extends App {
    cpuType: 'cpuStandard' | 'cpuIntensive' | 'gpuStandard';
    cpuTypeCount: number;
    bandwidth?: number;
    storage?: number;
    fileResourceCount?: number;
    fileResourceType: {
        [subnetId: number]: 'ipfsUpload' | 'googleCloudUpload' | 'amazonS3';
    };
    path?: string;
    statefulSet?: boolean;
    envVariablesEnabled?: boolean;
    argsEnabled?: boolean;
    commandsEnabled?: boolean;
    mountVolume?: string;
    maxreplica?: string;
    minreplica?: string;
    adress?: boolean;
    supportAddress: string;
    licenseAddress: string;
    referralAddress: string;
    licenseFee: string;
    licensePercent: string;
    computes?: any;
    subnetReplicaMap: SubnetReplicaMap;
    isSoftwareLock: boolean;
    isNoDeployment: boolean;
    platformAddress: string;
    isHostUrlVerified: boolean;
    username: string;
    password: string;
    attributeVariableParam: AttributeVariableParam;
    attributeVariableValue: {
        [index: string]: string;
    };
    image: {
        repository: string;
        tag: string;
    };
    containerPortObj: {
        [key: number]: any;
    };
    advanceOptions: boolean;
    file: FileList | undefined;
    encryptFlag: boolean;
    filePayload?: {
        encryptKey: string;
        filePath: string;
    };
}

export interface PortValues {
    protocol: any;
    containerPort: string;
    port: string;
}

export interface DrawerSuccessValues {
    deployed?: boolean;
    updated?: boolean;
    type?: string;
    host?: string;
    pointsTo?: string;
    externalDNS?: string;
    internalDNS?: string;
    deployMessage?: string;
}
