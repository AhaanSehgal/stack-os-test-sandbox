/* eslint-disable no-shadow */
// eslint-disable-next-line react/button-has-type
/* eslint-disable no-plusplus */
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useEffect, useState } from 'react';
import {
    resetStateDrawer,
    setAdvanceOptions,
    setDrawerLoadingMessage,
    setDrawerOpen,
    setDrawerStatus,
    setFormValues,
    setPortValues,
    setUpdateFormFlag,
} from '@/redux/drawer/actions';
import { useSelector } from '@/redux/hooks';
import {
    resetStateGeneral,
    setBalancesForSubscription,
    setConnectedAccount,
    setDripRateFactors,
    setSubscriptionParam,
} from '@/redux/general/actions';
import { resetState } from '@/redux/app-store/actions';
import { resetStateHardware } from '@/redux/hardware/actions';
import { resetStateSwap } from '@/redux/swap/actions';
import { resetStateDeploy, setDeployedApps } from '@/redux/deploy/actions';
import { RESOURCE_CATEGORY, RESTYPE_ID_TO_NAME_MAP } from '@/utils/constants';
import showToast from '@/utils/showToast';
import { client } from '@/pages/_app';
import Modal from '@/components/common/Modal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Button from '@/components/common/Button';
import {
    AppModifier,
    AppPayload,
    ContractApp,
    EncryptedPayload,
    EncryptedPayloadWithKeys,
} from '@decloudlabs/stk-v2/lib/types/types';
import { DeployState } from '@/redux/deploy/types';
import { GeneralState } from '@/redux/general/types';
import { formatAppParams } from '@decloudlabs/stk-v2/lib/utils/utils';
import { APICallReturn } from '@/utils/types';
import { fileSubnetList } from '@/components/DesktopLayout/drawer/fileUploadSteps/helpers';

interface Props {
    appID: string;
}

const AppOptions = ({ appID }: Props) => {
    const { chain } = useNetwork();
    // const { general, deploy } = useSelector((state) => state);.
    const general: GeneralState = useSelector((state: any) => state.general);
    const deploy: DeployState = useSelector((state: any) => state.deploy);
    const [disableEdit, setDisableEdit] = useState(false);
    const {
        connectedAccount,
        selectedNft,
        nftRole,
        subscriptionParam,
        dripRateFactors,
        appManager,
        appCrypto,
    } = general;
    const { licenseAddress, platformAddress, referralAddress, supportAddress } = subscriptionParam;
    const { licenseFactor } = dripRateFactors;
    const { deployedApps } = deploy;
    const {
        address,
        // status: connectStatus
    } = useAccount();
    const {
        disconnect,
        // status: disconnects
    } = useDisconnect();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (!address || (address && connectedAccount && address !== connectedAccount)) {
            console.log('refresh in app options');
            window.sessionStorage.clear();
            disconnect();
            dispatch(resetState());
            dispatch(resetStateGeneral());
            dispatch(resetStateDrawer());
            dispatch(resetStateHardware());
            dispatch(resetStateSwap());
            dispatch(resetStateDeploy());
        }

        if (address) dispatch(setConnectedAccount(address));
    }, [address]);

    const onClickEdit = async () => {
        const getResources = (resourceCount: number[], resourceType: number[]) => {
            const showResources: { [id: string]: number } = {};
            const categoryList = Object.keys(RESOURCE_CATEGORY);
            const showResourceTypes: {
                [index: string]: string;
            } = {};

            for (let i = 0; i < resourceType.length; i++) {
                const resType = resourceType[i];
                const resCount = resourceCount[i];

                // eslint-disable-next-line no-restricted-syntax
                for (const categoryEntry of Object.entries(RESOURCE_CATEGORY)) {
                    const category = categoryEntry[0];
                    const categoryResourceTypeList = categoryEntry[1];

                    for (let j = 0; j < categoryResourceTypeList.length; j++) {
                        const catResType = categoryResourceTypeList[j];

                        if (resType === catResType) {
                            showResources[RESTYPE_ID_TO_NAME_MAP[catResType]] = resCount;
                            showResourceTypes[category] = RESTYPE_ID_TO_NAME_MAP[catResType];
                        }
                    }
                }
            }

            return { showResources, showResourceTypes };
        };

        try {
            if (!appManager) return;
            if (!deployedApps) return;

            const contractAppData = deployedApps.find((app: ContractApp) => app.appID === appID);

            if (!contractAppData) return;

            if (!appCrypto) return;

            const { subnetList, resourceCount, resourceType, multiplier } = contractAppData;

            dispatch(setDrawerOpen(true));
            setDisableEdit(true);
            dispatch(setDrawerStatus('loading'));
            dispatch(setDrawerLoadingMessage('Opening your app...'));

            dispatch(setDrawerLoadingMessage('Getting app data from IPFS ...'));

            dispatch(setDrawerLoadingMessage('Decrypting your app data...'));

            const userAddress = appCrypto.contractService.selectedAccount;

            const decryptResp = await appManager.fetchAndDecryptApp(contractAppData, userAddress);

            if (!decryptResp.success) throw decryptResp.data;

            // const { appPayload, appModifier } = decryptResp.data;
            const appModifier = decryptResp.data.appModifier;
            const decryptedPayload: any = decryptResp.data.appPayload;

            console.log('decrypted app: ', decryptedPayload, appModifier);

            const subnetReplicaMap: { [subnetID: string]: number } = {};

            let noDeployment = true;

            for (let i = 0; i < multiplier.length; i++) {
                for (let j = 0; j < multiplier[i].length; j++) {
                    if (multiplier[i][j] > 0) {
                        noDeployment = false;
                        break;
                    }
                    if (!noDeployment) break;
                }
            }

            if (noDeployment) {
                const modContractParam = appModifier.contractParam;
                const subnetList = Object.keys(modContractParam.multiplier || {});
                for (let i = 0; i < subnetList.length; i++) {
                    const subnetID = subnetList[i];
                    if (modContractParam.multiplier && modContractParam.multiplier[subnetID]) {
                        const multArr = modContractParam.multiplier[subnetID];
                        for (let j = 0; j < multArr.length; j++) {
                            if (multArr[j] > 0) {
                                subnetReplicaMap[subnetID] = multArr[j];
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < subnetList.length; i++) {
                    const subnetID = subnetList[i];
                    let mCount = 0;

                    for (let j = 0; j < multiplier[i].length; j++) {
                        mCount = multiplier[i][j];
                        if (mCount > 0) {
                            subnetReplicaMap[subnetID] = mCount;
                        }
                    }
                }
            }

            if (!decryptedPayload) {
                dispatch(setDrawerOpen(false));
                setDisableEdit(false);
                return;
            }

            let fileAppFlag = false;
            for (let i = 0; i < fileSubnetList.length; i++) {
                const fileSubnet = fileSubnetList[i];
                if (subnetReplicaMap[fileSubnet.subnetID]) {
                    fileAppFlag = true;
                    break;
                }
            }

            console.log('file app flag: ', fileAppFlag, subnetReplicaMap);
            if (fileAppFlag) {
                const filePayload = decryptedPayload;
                dispatch(
                    setFormValues({
                        // ...appPayload,
                        appName: contractAppData.appName,
                        appID,
                        image: {
                            repository: '',
                            tag: '',
                        },
                        // imageName: image.repository,
                        // tag: image.tag,
                        containerPort: [],
                        servicePort: [],
                        envVariablesEnabled: false,
                        argsEnabled: false,
                        envVariables: [],
                        args: [],
                        persistenceEnabled: false,
                        mountVolume: '',
                        // storageType: persistence && persistence[0].storageType,
                        commands: [],
                        commandsEnabled: false,
                        subnetReplicaMap,
                        cpuType: 'cpuStandard',
                        cpuTypeCount: 0,
                        privateImage: false,
                        licenseAddress,
                        licenseFee: licenseFactor.length ? licenseFactor[1].toString() : '0',
                        licensePercent: licenseFactor.length ? licenseFactor[0].toString() : '0',
                        supportAddress,
                        referralAddress,
                        platformAddress,
                        isNoDeployment: noDeployment,
                        isSoftwareLock: contractAppData.cidLock,
                        isHostUrlVerified: true,
                        hostUrl: 'test',
                        username: '',
                        password: '',
                        // attributeVariableParam: {
                        //     condition: appPayload.condition,
                        //     conditionDescription: appPayload.conditionDescription,
                        //     defaultValue: appPayload.defaultValue,
                        // },
                        attributeVariableParam: {
                            condition: [],
                            conditionDescription: [],
                            defaultValue: [],
                        },
                        attributeVariableValue: {
                            ...appModifier?.modAttribVar,
                        },
                        containerPortObj: {},
                        file: undefined,
                        fileResourceType: {},
                        advanceOptions: false,
                        encryptFlag: filePayload.encryptKey,
                        filePayload,
                    })
                );

                dispatch(setUpdateFormFlag(true));
                dispatch(setAdvanceOptions(true));
                dispatch(setDrawerOpen(true));
                dispatch(setDrawerStatus('upload-form-update'));
                setDisableEdit(false);
                return;
            }

            const appPayload: AppPayload = decryptedPayload;

            if (appPayload) {
                const {
                    // image,
                    // containerPort,
                    // servicePort,
                    // envVariables,
                    // args,
                    // commands,
                    // persistenceEnabled,
                    // volumeMounts,
                    // storageType,
                    // appName,
                    // privateImagePassword,
                    // privateImageRegistry,
                    // privateImageUsername,
                    // statefulSet,
                    // advanceOptions,
                    appName,
                    containers,
                } = appPayload;

                const httpPortList = containers
                    .map((container) =>
                        container.httpPorts.map((httpPort) => ({
                            ...httpPort,
                            protocol: 'HTTP',
                        }))
                    )
                    .flat();
                const tcpPortList = containers
                    .map((container) =>
                        container.tcpPorts.map((tcpPort) => ({
                            ...tcpPort,
                            protocol: 'TCP',
                        }))
                    )
                    .flat();
                const portList = [...httpPortList, ...tcpPortList];

                // const containerPortData = containerPort && JSON.parse(containerPort);
                // const servicePortData = servicePort && JSON.parse(servicePort as string);
                let env = '';
                let argsValue = '';
                let commandsValue = '';
                const newPortValues = portList.map(
                    (
                        item: { containerPort: string; protocol: string; servicePort: string },
                        idx: number
                    ) => ({
                        protocol: item.protocol,
                        containerPort: item.containerPort.toString(),
                        port: item.servicePort.toString(),
                    })
                );

                const containerPortData = newPortValues.map((portObj) => ({
                    protocol: portObj.protocol,
                    port: portObj.containerPort,
                }));

                const servicePortData = newPortValues.map((portObj) => ({
                    protocol: portObj.protocol,
                    port: portObj.port,
                }));

                dispatch(setPortValues(newPortValues));

                const envVariables = containers[0].envVariables;
                if (envVariables?.length) {
                    envVariables?.forEach((item: any) => {
                        env += `${item.name} = ${item.value}\n`;
                    });
                    while (env.indexOf('\n\n') >= 0) {
                        env = env.replace(/\n\n/g, '\n');
                    }
                    env = env.replace(/\n$/, '');
                }

                const args = containers[0].args;
                if (args?.length) {
                    args.forEach((value: any) => {
                        argsValue += `${value}\n`;
                    });
                    while (argsValue.indexOf('\n\n') >= 0) {
                        argsValue = argsValue.replace(/\n\n/g, '\n');
                    }
                    argsValue = argsValue.replace(/\n$/, '');
                }

                const commands = containers[0].commands;
                if (commands?.length) {
                    commands?.forEach((value: any) => {
                        commandsValue += `${value.trim()}\n`;
                    });
                    while (commandsValue.indexOf('\n\n') >= 0) {
                        commandsValue = commandsValue.replace(/\n\n/g, '\n');
                    }
                    commandsValue = commandsValue.replace(/\n$/, '');
                    commandsValue = commandsValue.trim();
                }

                const { showResourceTypes, showResources } = getResources(
                    resourceCount,
                    resourceType
                );

                const cpuType = showResourceTypes.cpuType;
                const cpuTypeCount = showResources[cpuType];

                const [imageName, tag] = containers[0].image.split(':');
                const volumeMounts = containers[0].volumeMounts;
                const persistence = appPayload.persistence;
                const privateImage = appPayload.privateImage;

                let hostUrl = '';
                for (let i = 0; i < containers[0].httpPorts.length; i++) {
                    const containerHostUrl = containers[0].httpPorts[i].hostUrl;
                    if (containerHostUrl != undefined) {
                        hostUrl = containerHostUrl;
                        break;
                    }
                }

                dispatch(
                    setFormValues({
                        // ...appPayload,
                        appName,
                        appID,
                        image: {
                            repository: imageName,
                            tag,
                        },
                        // imageName: image.repository,
                        // tag: image.tag,
                        containerPort: containerPortData,
                        servicePort: servicePortData,
                        envVariablesEnabled: envVariables ? envVariables.length > 0 : false,
                        argsEnabled: args ? args.length > 0 : false,
                        envVariables: env,
                        args: argsValue,
                        persistenceEnabled: appPayload.persistence != undefined,
                        mountVolume: volumeMounts && volumeMounts[0]?.mountPath,
                        // storageType: persistence && persistence[0].storageType,
                        ...(persistence &&
                            persistence.length && {
                                storageType: persistence[0].storageType,
                            }),
                        commands: commandsValue,
                        commandsEnabled: commands ? commands.length > 0 : false,
                        subnetReplicaMap,
                        cpuType,
                        cpuTypeCount,
                        privateImage: appPayload.privateImage ? true : false,
                        privateImagePassword: privateImage && privateImage.password,
                        privateImageRegistry: privateImage && privateImage.registry,
                        privateImageUsername: privateImage && privateImage.username,
                        storage: showResources.storage,
                        bandwidth: showResources.bandwidth,
                        licenseAddress,
                        licenseFee: licenseFactor.length ? licenseFactor[1].toString() : '0',
                        licensePercent: licenseFactor.length ? licenseFactor[0].toString() : '0',
                        supportAddress,
                        referralAddress,
                        platformAddress,
                        isNoDeployment: noDeployment,
                        isSoftwareLock: contractAppData.cidLock,
                        isHostUrlVerified: true,
                        hostUrl: hostUrl,
                        username: '',
                        password: '',
                        // attributeVariableParam: {
                        //     condition: appPayload.condition,
                        //     conditionDescription: appPayload.conditionDescription,
                        //     defaultValue: appPayload.defaultValue,
                        // },
                        attributeVariableParam: {
                            condition: [],
                            conditionDescription: [],
                            defaultValue: [],
                        },
                        attributeVariableValue: {
                            ...appModifier?.modAttribVar,
                        },
                        containerPortObj: {},
                        file: undefined,
                        fileResourceType: {},
                        advanceOptions: false,
                    })
                );

                dispatch(setUpdateFormFlag(true));
                dispatch(setAdvanceOptions(true));
                dispatch(setDrawerOpen(true));
                dispatch(setDrawerStatus('deploy-edit'));
                setDisableEdit(false);
            } else {
                // dispatch(
                //     setFormValues({
                //         // ...appPayload,
                //         appName: contractAppData.appName,
                //         appID,
                //         image: {
                //             repository: '',
                //             tag: '',
                //         },
                //         // imageName: image.repository,
                //         // tag: image.tag,
                //         containerPort: [],
                //         servicePort: [],
                //         envVariablesEnabled: false,
                //         argsEnabled: false,
                //         envVariables: [],
                //         args: [],
                //         persistenceEnabled: false,
                //         mountVolume: '',
                //         // storageType: persistence && persistence[0].storageType,

                //         commands: [],
                //         commandsEnabled: false,
                //         subnetReplicaMap,
                //         cpuType: 'cpuStandard',
                //         cpuTypeCount: 0,
                //         privateImage: false,
                //         licenseAddress,
                //         licenseFee: licenseFactor.length ? licenseFactor[1].toString() : '0',
                //         licensePercent: licenseFactor.length ? licenseFactor[0].toString() : '0',
                //         supportAddress,
                //         referralAddress,
                //         platformAddress,
                //         isNoDeployment: noDeployment,
                //         isSoftwareLock: contractAppData.cidLock,
                //         isHostUrlVerified: true,
                //         hostUrl: 'test',
                //         username: '',
                //         password: '',
                //         // attributeVariableParam: {
                //         //     condition: appPayload.condition,
                //         //     conditionDescription: appPayload.conditionDescription,
                //         //     defaultValue: appPayload.defaultValue,
                //         // },
                //         attributeVariableParam: {
                //             condition: [],
                //             conditionDescription: [],
                //             defaultValue: [],
                //         },
                //         attributeVariableValue: {
                //             ...appModifier?.modAttribVar,
                //         },
                //         containerPortObj: {},
                //         file: undefined,
                //         fileResourceType: {},
                //         advanceOptions: false,
                //     })
                // );
                dispatch(setDrawerOpen(false));
                setDisableEdit(false);
            }
        } catch (error: any) {
            console.error('Error while editing an app: ', error);

            // if (error.code === 401 && error.message === 'Signature expired') {
            //     await decryptApp.login(await client.connector?.getProvider(), address, chain?.id);
            // }
            showToast('warning', error?.message);
            dispatch(setDrawerOpen(false));
            setDisableEdit(false);
        }
    };

    const onClickDelete = async () => {
        try {
            if (!deployedApps) return;
            if (!appManager) return;

            setLoading(true);
            // const contractAppData: ContractApp = deployedApps.find((app) => app.appID === appID);
            console.log('contract app data: ', appID);
            // const { appID } = contractAppData;

            const resp = await appManager.deleteApp(selectedNft, appID, async (status) => {});
            if (!resp.success) throw resp.data;

            dispatch(setDrawerOpen(false));
            setDeleteModalOpen(false);

            setLoading(false);
            showToast('success', 'Your application deleted successfully');
        } catch (error: any) {
            console.error('Error while deleting app: ', error);
            showToast('warning', error?.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                showModal={deleteModalOpen}
                clickOutsideClose={!loading}
                onCloseModal={() => setDeleteModalOpen(false)}
            >
                <div className="h-56 w-[21.7rem]">
                    {loading ? (
                        <div className="flex h-full flex-col items-center justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            <h2 className="mb-10 text-xl font-semibold text-stk-white">
                                {t('DRAWER_DELETE_MODAL_TITLE')}
                            </h2>
                            <span className="text-lg text-stk-white">
                                {t('DRAWER_DELETE_MODAL_DESCRIPTION')}
                                <span className="font-bold text-stk-green">
                                    {t('DRAWER_DELETE_MODAL_DESCRIPTION_SPAN')}
                                </span>
                            </span>
                            <div className="mt-14 flex w-full items-center justify-between">
                                <span
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="cursor-pointer font-light text-stk-white"
                                >
                                    {t('CANCEL')}
                                </span>
                                <Button onClick={() => onClickDelete()}>
                                    <i className="fa-light fa-trash" />
                                    <span className="ml-2 font-medium">{t('CONFIRM')}</span>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
            <Modal showModal={loading} clickOutsideClose={!loading}>
                <div className="h-56 w-[21.7rem]">
                    {loading ? (
                        <div className="flex h-full flex-col items-center justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : null}
                </div>
            </Modal>
            <div className="absolute top-[0.688rem] right-10 flex text-stk-grey-500  duration-200  child:mx-[0.625rem] child:outline-none">
                <button type="button" disabled={disableEdit} onClick={() => onClickEdit()}>
                    <i
                        data-tip={t('DEPLOY_APP_OPTION3')}
                        data-for="code"
                        className="fa-regular fa-pen-to-square cursor-pointer"
                    />
                </button>
                <ReactTooltip
                    id="code"
                    place="top"
                    effect="solid"
                    backgroundColor="#DFDFDF"
                    textColor="#1F2937"
                    className="text-xs font-medium"
                />
            </div>
            <div className="absolute top-[0.688rem] right-0 flex text-stk-grey-500  duration-200  child:mx-[0.625rem] child:outline-none">
                <button
                    type="button"
                    disabled={disableEdit}
                    onClick={() => setDeleteModalOpen(true)}
                >
                    <i data-tip="Delete" data-for="code" className="fa-solid fa-trash" />
                </button>
                <ReactTooltip
                    id="code"
                    place="top"
                    effect="solid"
                    backgroundColor="#DFDFDF"
                    textColor="#1F2937"
                    className="text-xs font-medium"
                />
            </div>
        </>
    );
};

export default AppOptions;
