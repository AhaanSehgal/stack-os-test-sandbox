/* eslint-disable default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { DrawerState, DrawerTypes } from './types';

import * as Actions from './actions';
import { steps } from '@/components/DesktopLayout/drawer/helpers';
import { BLANK_ADDRESS } from '@/utils/constants';

const INITIAL_STATE: DrawerState = {
    isDrawerOpen: false,
    privateImage: false,
    advanceOptions: false,
    isError: false,
    portValues: [{ protocol: 'HTTP', containerPort: '80', port: '80' }],
    formValidationFunc: () => true,
    dataPersistence: false,
    status: 'default',
    loadingMessage: 'Loading...',
    stepIndex: 0,
    currentStep: steps[0],
    deployEnabled: false,
    activeSideStep: 1,
    selectedBobValues: [],
    drawerSuccessValues: {},
    clickOnConnectWallate: false,
    hardwareResource: false,
    deployLoading: false,
    subBalEstimate: {
        netETHRequired: '0',
        netXCTRequired: '0',
        xctRequired: '0',
        timePeriod: 0,
    },
    formValues: {
        advanceOptions: false,
        cpuType: 'cpuStandard',
        cpuTypeCount: 1,
        bandwidth: 1,
        storage: 0,
        fileResourceCount: 1,
        fileResourceType: {},
        image: {
            repository: 'alethio/ethereum-lite-explorer',
            tag: 'latest',
        },
        protocol: 'HTTP',
        containerPort: [{ port: '80', protocol: 'HTTP' }],
        servicePort: [{ port: '80', protocol: 'HTTP' }],
        envVariables: '',
        privateImage: false,
        privateImageRegistry: 'Docker',
        appName: 'explorer1',
        groupName: '',
        hostUrl: '',
        isHostUrlVerified: false,
        path: '',
        statefulSet: false,
        persistenceEnabled: false,
        envVariablesEnabled: false,
        argsEnabled: false,
        commandsEnabled: false,
        supportAddress: process.env.NEXT_PUBLIC_SUPPORT_ADDRESS as string,
        licenseAddress: BLANK_ADDRESS,
        referralAddress: BLANK_ADDRESS,
        platformAddress: process.env.NEXT_PUBLIC_PLATFORM_ADDRESS as string,
        licenseFee: '',
        licensePercent: '',
        isSoftwareLock: false,
        isNoDeployment: false,
        username: '',
        password: '',
        attributeVariableParam: {
            condition: {},
            conditionDescription: {},
            defaultValue: {},
        },
        attributeVariableValue: {},
        containerPortObj: {},
        file: undefined,
        subnetReplicaMap: {},
        encryptFlag: false,
    },
    updateFormFlag: false,
};

const reducer: Reducer<DrawerState> = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case DrawerTypes.SET_DRAWER_OPEN:
            return { ...state, isDrawerOpen: payload.value };

        case DrawerTypes.SET_PRIVATE_IMAGE:
            return { ...state, privateImage: payload.value };

        case DrawerTypes.SET_ADVANCE_OPTIONS:
            return { ...state, advanceOptions: payload.value };

        case DrawerTypes.SET_PORT_VALUES:
            return { ...state, portValues: payload.value };

        case DrawerTypes.SET_CPU_TYPE:
            return { ...state, cpuType: payload.value };

        case DrawerTypes.SET_IS_ERROR:
            return { ...state, isError: payload.value };

        case DrawerTypes.SET_DATA_PERSISTENCE:
            return { ...state, dataPersistence: payload.value };

        case DrawerTypes.SET_DRAWER_STATUS:
            return { ...state, status: payload.value };

        case DrawerTypes.SET_DRAWER_LOADING_MESSAGE:
            return { ...state, loadingMessage: payload.value };

        case DrawerTypes.SET_DRAWER_SUCCESS_VALUES:
            return { ...state, drawerSuccessValues: payload.values };

        case DrawerTypes.SET_SUB_BAL_ESTIMATE:
            return { ...state, subBalEstimate: payload.value };

        case DrawerTypes.SET_FORM_VALUES:
            return { ...state, formValues: payload };

        case DrawerTypes.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: payload.value,
                // stepIndex: payload.value.id
            };

        case DrawerTypes.SET_STEP_INDEX:
            return { ...state, stepIndex: payload.value };

        case DrawerTypes.SET_STEP:
            return { ...state, ...payload };

        case DrawerTypes.SET_DEPLOY_ENABLED:
            return { ...state, deployEnabled: payload.value };

        case DrawerTypes.SET_ACTIVE_SIDE_STEP:
            return { ...state, activeSideStep: payload.value };

        case DrawerTypes.CLICK_ON_CONNECT_WALLATE:
            return { ...state, clickOnConnectWallate: payload.value };

        case DrawerTypes.SET_HARDWARE_RESOURCE:
            return { ...state, hardwareResource: payload };

        case DrawerTypes.SET_DEPLOY_LOADING:
            return { ...state, deployLoading: payload.value };

        case DrawerTypes.SET_FORM_VALIDATION_FUNC:
            return { ...state, formValidationFunc: payload.value };

        case DrawerTypes.SET_UPDATE_FORM_FLAG:
            return { ...state, updateFormFlag: payload.value };

        case DrawerTypes.RESET_STATE:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const DrawerActions = Actions;
export default reducer;
