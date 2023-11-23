/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'src/redux/hooks';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useAccount, useNetwork } from 'wagmi';
import BN from 'bn.js';
import {
    setDeployLoading,
    setDrawerLoadingMessage,
    setDrawerOpen,
    setDrawerStatus,
    setDrawerSuccessValues,
    setHardwareResource,
    setStep,
    setStepIndex,
    setUpdateFormFlag,
} from '@/redux/drawer/actions';
import { setDeployedApps } from '@/redux/deploy/actions';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DeployHome from './DeployHome';
import DeployForm from './DeployForm';
import DeployApp from './DeployApp';
import DeploySuccess from './DeploySuccess';
import DeployEdit from './DeployEdit';
import PurchaseResources from './PurchaseResources';
import UpgradeSuccess from './UpgradeSuccess';
import UploadForm from './UploadForm';
import showToast from '@/utils/showToast';
import DeployFooter from './DeployFooter';
import // setUserResources
'@/redux/general/actions';
import {
    MIN_RES_TYPE_LENGTH,
    RESTYPE_NAME_TO_ID_MAP,
    RESOURCE_CATEGORY,
    URSULA_PARAMS,
} from '@/utils/constants';
import { client } from '@/pages/_app';
import {
    checkDeploymentStatus,
    getAppModifier,
    getContractParam,
    getPayload,
    getSubscriptionParam,
    replaceModVariable,
    sendFileToUploadOnIpfs,
    setAttribVar,
} from '@/utils/utils';
import { steps, fileUploadSteps } from './helpers';
import { DrawerState, FormValues } from '@/redux/drawer/types';

import {
    AppModifier,
    CRUD_APP_STAGE,
    ContractApp,
    SubscriptionParam,
} from '@decloudlabs/stk-v2/lib/types/types';
import { GeneralState } from '@/redux/general/types';
import { DeployState } from '@/redux/deploy/types';
import {
    setBalanceEndTime,
    setBalancesForSubscription,
    setCalcDripRateFlag,
    setSubscriptionParam,
} from '@/redux/general/actions';
import { ethers } from 'ethers';
import { APICallReturn } from '@/utils/types';
import { fileSubnetList } from './fileUploadSteps/helpers';
import * as forge from 'node-forge';
import UploadFormUpdate from './UploadFormUpdate';

const Drawer = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const drawer: DrawerState = useSelector((state: any) => state.drawer);
    const general: GeneralState = useSelector((state: any) => state.general);
    const deploy: DeployState = useSelector((state: any) => state.deploy);

    const {
        isDrawerOpen,
        status,
        formValues,
        loadingMessage,
        hardwareResource,
        stepIndex,
        deployLoading,
        formValidationFunc,
        updateFormFlag,
        subBalEstimate,
    } = drawer;
    const { selectedNft, subscriptionParam, balancesForSubscription, dripRateFactors, appCrypto } =
        general;
    const appManager = general.appManager;
    const fileAppManager = general.fileAppManager;
    const { deployedApps } = deploy;
    const { createTime: subscribeTime } = subscriptionParam;
    const [isFileApp, setIsFileApp] = useState(false);

    const methods = useForm<FormValues>({
        defaultValues: formValues,
    });

    const { address: userAddress } = useAccount();
    const { chain } = useNetwork();

    const goToNextSlide = () => {
        console.log('form validation func: ', formValidationFunc);
        if (
            (status === 'deploy-form' && stepIndex === steps.length - 1) ||
            (status === 'upload-form' && stepIndex === fileUploadSteps.length - 1)
        ) {
            methods.handleSubmit(onSubmit, onError)();
        } else if (formValidationFunc()) {
            dispatch(setStepIndex(stepIndex + 1));
        }
    };

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        console.log('errors in form: ', errors, e);
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (status === 'deploy-form' || status === 'upload-form') {
            dispatch(setDrawerStatus('loading'));
            dispatch(setDrawerLoadingMessage('Deploying your application...🚀'));
            dispatch(setDeployLoading(true));
            createApp(data).then((res) => {
                if (res.success) {
                    dispatch(setDrawerStatus('deploy-success'));
                    dispatch(setDeployLoading(false));
                    showToast(res.status, res.message);
                } else {
                    showToast(res.status, res.message);
                    dispatch(setDrawerStatus(status));
                    dispatch(setDrawerLoadingMessage('Loading...'));

                    if (status === 'deploy-form') {
                        dispatch(setCalcDripRateFlag(true));
                        dispatch(setStep(steps.length - 1, steps[steps.length - 1]));
                    } else if (status === 'upload-form') {
                        dispatch(setCalcDripRateFlag(true));
                        dispatch(
                            setStep(
                                fileUploadSteps.length - 1,
                                fileUploadSteps[fileUploadSteps.length - 1]
                            )
                        );
                    }

                    dispatch(
                        setDrawerSuccessValues({
                            deployed: false,
                            updated: false,
                            // type?: string;
                            // host?: string;
                            // pointsTo?: string;
                            // externalDNS?: string;
                            // internalDNS?: string;
                            // deployMessage?: string;
                        })
                    );
                    dispatch(setDeployLoading(false));
                }
            });
        }
        if (status === 'deploy-edit' || status === 'upload-form-update') {
            dispatch(setDrawerStatus('loading'));
            dispatch(setDrawerLoadingMessage('Updating your application...🚀'));
            dispatch(setDeployLoading(true));

            updateApp(data).then((res) => {
                if (res.success) {
                    dispatch(setDrawerStatus('deploy-success'));
                    dispatch(setDeployLoading(false));
                    showToast(res.status, res.message);
                } else {
                    dispatch(setCalcDripRateFlag(true));
                    showToast(res.status, res.message);
                    dispatch(setDrawerStatus(status));
                    dispatch(setDrawerLoadingMessage('Loading...'));

                    dispatch(
                        setDrawerSuccessValues({
                            deployed: false,
                            updated: true,
                            // type?: string;
                            // host?: string;
                            // pointsTo?: string;
                            // externalDNS?: string;
                            // internalDNS?: string;
                            // deployMessage?: string;
                        })
                    );

                    // if (status === 'deploy-form') {
                    //     dispatch(setStep(steps.length - 1, steps[steps.length - 1]));
                    // } else if (status === 'upload-form') {
                    //     dispatch(
                    //         setStep(
                    //             fileUploadSteps.length - 1,
                    //             fileUploadSteps[fileUploadSteps.length - 1]
                    //         )
                    //     );
                    // }

                    dispatch(setDeployLoading(false));
                }
            });
        }

        // if (status === 'upload-form') {
        //     dispatch(setDrawerStatus('loading'));
        //     dispatch(setDrawerLoadingMessage('Uploading your file...🚀'));
        //     dispatch(setDeployLoading(true));

        //     updateApp(data).then((res) => {
        //         if (res.success) {
        //             dispatch(setDrawerStatus('deploy-success'));
        //             dispatch(setDeployLoading(false));
        //             showToast(res.status, res.message);
        //         } else {
        //             showToast(res.status, res.message);
        //             dispatch(setDrawerStatus(status));
        //             dispatch(setDrawerLoadingMessage('Loading...'));

        //             dispatch(
        //                 setDrawerSuccessValues({
        //                     deployed: false,
        //                     updated: true,
        //                     // type?: string;
        //                     // host?: string;
        //                     // pointsTo?: string;
        //                     // externalDNS?: string;
        //                     // internalDNS?: string;
        //                     // deployMessage?: string;
        //                 })
        //             );

        //             dispatch(setDeployLoading(false));
        //         }
        //     });
        // }
    };

    const drawerStatuses: any = {
        default: <DeployHome />,
        loading: (
            <div
                data-cy="drawer-loading"
                className="flex h-full flex-col items-center justify-center"
            >
                <LoadingSpinner />
                <span className="mt-8 text-xl text-stk-green">
                    {loadingMessage || t('DRAWER_DEPLOYING')}
                </span>
            </div>
        ),
        'deploy-success': <DeploySuccess />,
        'update-success': <DeploySuccess />,
        'deploy-form': <DeployForm />,
        'deploy-app': <DeployApp />,
        'deploy-edit': (
            <DeployEdit onClickUpdate={() => methods.handleSubmit(onSubmit, onError)()} />
        ),
        'purchase-resources': <PurchaseResources />,
        'upgrade-success': <UpgradeSuccess />,
        'upload-form': <UploadForm />,
        'upload-form-update': (
            <UploadFormUpdate onClickUpdate={() => methods.handleSubmit(onSubmit, onError)()} />
        ),
    };

    const DrawerContent = deployLoading ? (
        drawerStatuses.loading
    ) : (
        <FormProvider {...methods}>{drawerStatuses[status]}</FormProvider>
    );

    const deployAppStore = () => {};

    useEffect(() => {
        if (formValues.appID || formValues.appID === '0') {
            const app = deployedApps?.find((app) => app.appID === formValues.appID);

            for (let i = 0; i < app?.resourceType.length; i++) {
                const resourceType = app?.resourceType[i];
                if (RESOURCE_CATEGORY.fileType.includes(resourceType)) {
                    setIsFileApp(true);

                    return;
                }
            }
            setIsFileApp(false);
        }
    }, [deployedApps, formValues]);

    const updateDockerApp = async (
        data: FormValues
    ): Promise<{
        success: boolean;
        status: 'success' | 'error' | 'info' | 'warning' | undefined;
        message: string;
    }> => {
        if (!appCrypto)
            return {
                success: false,
                status: 'error',
                message: 'AppCrypto not initialized',
            };
        let statusMessage = '';
        let statusText: 'success' | 'error' | 'info' | 'warning' | undefined;
        console.log('date check: ', new Date(new Date().toUTCString()));
        console.log('deployedApps: ', deployedApps);

        if (!appManager)
            return {
                success: false,
                status: 'error',
                message: '',
            };

        const appPayload = getPayload(selectedNft, chain ? chain.id : 0, data, false);

        if (!appPayload)
            return {
                success: false,
                status: 'error',
                message: '',
            };

        console.log('appPayload: ', appPayload);

        const contractParam: ContractApp = getContractParam(selectedNft, data);

        const appModifier: AppModifier = getAppModifier(selectedNft, contractParam, data);

        // console.log(
        //     'appPayload after replace: ',
        //     replaceModVariable(JSON.parse(JSON.stringify(appPayload)), {})
        // );

        const resp = await appManager.updateApp(
            subBalEstimate.xctRequired,
            contractParam,
            appPayload,
            appModifier,
            URSULA_PARAMS,
            async (status) => {
                console.log('create app status: ', status);
            }
        );
        if (resp.success == false)
            return {
                success: false,
                status: 'error',
                message: resp.data.error.message,
            };

        const balSubResp = await appCrypto.dripRateManager.getBalancesForSubscription(selectedNft);
        if (balSubResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balSubResp.data,
            });
        } else {
            dispatch(setBalancesForSubscription(balSubResp.data));
        }

        let balanceEndTime = 0;
        const balEndResp = await appCrypto.dripRateManager.getBalanceEndTime(selectedNft);
        if (balEndResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balEndResp.data,
            });
        } else {
            balanceEndTime = balEndResp.data;
            dispatch(setBalanceEndTime(balanceEndTime));
        }

        for (let i = 0; i < resp.data.warnings.length; i++) {
            showToast('warning', resp.data.warnings[i].error.message);
        }

        // const balResp =

        return {
            success: true,
            status: 'success',
            message: `${contractParam.appName} is updated successfully`,
        };
    };

    const deployDockerApp = async (
        data: FormValues
    ): Promise<{
        success: boolean;
        status: 'success' | 'error' | 'info' | 'warning' | undefined;
        message: string;
    }> => {
        if (!appCrypto)
            return {
                success: false,
                status: 'error',
                message: 'AppCrypto not initialized',
            };

        let statusMessage = '';
        let statusText: 'success' | 'error' | 'info' | 'warning' | undefined;

        console.log('date check: ', new Date().toUTCString());
        if (!appManager)
            return {
                success: false,
                status: 'error',
                message: '',
            };

        const appPayload = getPayload(selectedNft, chain ? chain.id : 0, data, false);
        if (!appPayload)
            return {
                success: false,
                status: 'error',
                message: '',
            };

        const subscriptionParam = getSubscriptionParam(data, subscribeTime);

        const contractParam: ContractApp = getContractParam(selectedNft, data);

        const appModifier: AppModifier = getAppModifier(selectedNft, contractParam, data);

        console.log('appPayload: ', appPayload, appModifier);

        console.log('contractApp: ', contractParam, subscriptionParam, dripRateFactors);

        const resp = await appManager.createApp(
            subBalEstimate.xctRequired,
            contractParam,
            subscriptionParam,
            dripRateFactors,
            appPayload,
            appModifier,
            URSULA_PARAMS,
            async (status) => {
                console.log('create app status: ', status);
            }
        );

        console.log('resp: ', resp);

        if (resp.success == false)
            return {
                success: false,
                status: 'error',
                message: resp.data.error.message,
            };

        const balSubResp = await appCrypto.dripRateManager.getBalancesForSubscription(selectedNft);
        if (balSubResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balSubResp.data,
            });
        } else {
            dispatch(setBalancesForSubscription(balSubResp.data));
        }

        let balanceEndTime = 0;
        const balEndResp = await appCrypto.dripRateManager.getBalanceEndTime(selectedNft);
        if (balEndResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balEndResp.data,
            });
        } else {
            balanceEndTime = balEndResp.data;
            dispatch(setBalanceEndTime(balanceEndTime));
        }

        for (let i = 0; i < resp.data.warnings.length; i++) {
            showToast('warning', resp.data.warnings[i].error.message);
        }

        return {
            success: true,
            status: 'success',
            message: `${contractParam.appName} is created successfully`,
        };
    };

    const updateFileApp = async (
        data: FormValues
    ): Promise<{
        success: boolean;
        status: 'success' | 'error' | 'info' | 'warning' | undefined;
        message: string;
    }> => {
        if (!appCrypto)
            return {
                success: false,
                status: 'error',
                message: 'AppCrypto not initialized',
            };
        if (!fileAppManager)
            return {
                success: false,
                status: 'error',
                message: 'AppManager not initialized',
            };

        const userAddress = appCrypto.contractService.selectedAccount;
        const contractParam: ContractApp = getContractParam(selectedNft, data);

        let filePath: string = '';
        let encryptionKey: string | undefined = undefined;
        let filePayload: any = {};
        if (data.file && data.file.length > 0) {
            try {
                if (data.encryptFlag) {
                    encryptionKey = forge.random.getBytesSync(16);
                }
                console.log('encryptionKey', encryptionKey);

                const userAuthResp = await fileAppManager.getUrsulaAuth(userAddress);
                if (!userAuthResp.success) throw userAuthResp.data;

                const resp = await sendFileToUploadOnIpfs(
                    appCrypto,
                    contractParam.appID,
                    data.file,
                    selectedNft,
                    appCrypto?.contractService.selectedAccount,
                    userAuthResp.data,
                    encryptionKey
                );
                console.log('resp: ', resp);
                console.log('rootpath: ', resp.data);
                filePath = resp.data.rootPath.cid;

                filePayload = {
                    filePath,
                    encryptKey: encryptionKey,
                };
            } catch (err: any) {
                console.log('error: ', err);
                return {
                    success: false,
                    status: 'error',
                    message: err.message,
                };
            }
        } else {
            console.log('file p: ', data.filePayload);
            if (data.filePayload) {
                filePayload = {
                    filePath: data.filePayload?.filePath,
                    encryptKey: data.filePayload.encryptKey,
                };
            }
        }
        console.log('filePayload: ', filePayload);

        const appModifier: AppModifier = getAppModifier(selectedNft, contractParam, data);

        const resp = await fileAppManager.updateApp(
            subBalEstimate.xctRequired,
            contractParam,
            filePayload,
            appModifier,
            URSULA_PARAMS,
            async (status) => {
                console.log('update app status: ', status);
            }
        );

        if (resp.success == false)
            return {
                success: false,
                status: 'error',
                message: resp.data.error.message,
            };

        const balSubResp = await appCrypto.dripRateManager.getBalancesForSubscription(selectedNft);
        if (balSubResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balSubResp.data,
            });
        } else {
            dispatch(setBalancesForSubscription(balSubResp.data));
        }

        let balanceEndTime = 0;
        const balEndResp = await appCrypto.dripRateManager.getBalanceEndTime(selectedNft);
        if (balEndResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balEndResp.data,
            });
        } else {
            balanceEndTime = balEndResp.data;
            dispatch(setBalanceEndTime(balanceEndTime));
        }

        for (let i = 0; i < resp.data.warnings.length; i++) {
            showToast('warning', resp.data.warnings[i].error.message);
        }

        return {
            success: true,
            status: 'success',
            message: `${contractParam.appName} is updated successfully`,
        };
    };

    const deployFileApp = async (
        data: FormValues
    ): Promise<{
        success: boolean;
        status: 'success' | 'error' | 'info' | 'warning' | undefined;
        message: string;
    }> => {
        if (!appCrypto)
            return {
                success: false,
                status: 'error',
                message: 'AppCrypto not initialized',
            };
        if (!fileAppManager)
            return {
                success: false,
                status: 'error',
                message: 'AppManager not initialized',
            };

        const userAddress = appCrypto.contractService.selectedAccount;
        const contractParam: ContractApp = getContractParam(selectedNft, data);

        const subscriptionParam = getSubscriptionParam(data, subscribeTime);

        let filePath: string = '';
        let isVideoFile = false;
        let encryptionKey: string | undefined = undefined;

        if (data.file) console.log('data file: ', data.file.length);
        if (data.file && data.file.length == 1) {
            const fileNameSplit = data.file[0].name.split('.');
            console.log('file name split: ', fileNameSplit[fileNameSplit.length - 1]);
            if (fileNameSplit[fileNameSplit.length - 1] === 'mp4') isVideoFile = true;
        }

        console.log('isVideoFile: ', isVideoFile);
        try {
            if (data.encryptFlag) {
                encryptionKey = forge.random.getBytesSync(16);
            }

            // console.log('file: ', data.file);

            console.log('encryptionKey', encryptionKey);

            const userAuthResp = await fileAppManager.getUrsulaAuth(userAddress);
            if (!userAuthResp.success) throw userAuthResp.data;

            const resp = await sendFileToUploadOnIpfs(
                appCrypto,
                contractParam.appID,
                data.file,
                selectedNft,
                appCrypto?.contractService.selectedAccount,
                userAuthResp.data,
                encryptionKey
            );

            console.log('resp: ', resp);
            console.log('rootpath: ', resp.data);
            filePath = resp.data.rootPath.cid;
        } catch (err: any) {
            console.log('error: ', err);
            return {
                success: false,
                status: 'error',
                message: err.message,
            };
        }

        const appModifier: AppModifier = getAppModifier(selectedNft, contractParam, data);

        const fileAppPayload: any = {
            filePath,
            encryptKey: encryptionKey,
            isVideoFile,
        };

        console.log('file app payload: ', fileAppPayload);

        const resp = await fileAppManager.createApp(
            subBalEstimate.xctRequired,
            contractParam,
            subscriptionParam,
            dripRateFactors,
            fileAppPayload,
            appModifier,
            URSULA_PARAMS,
            async (status) => {
                console.log('create app status: ', status);
            }
        );

        if (resp.success == false)
            return {
                success: false,
                status: 'error',
                message: resp.data.error.message,
            };

        const balSubResp = await appCrypto.dripRateManager.getBalancesForSubscription(selectedNft);
        if (balSubResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balSubResp.data,
            });
        } else {
            dispatch(setBalancesForSubscription(balSubResp.data));
        }

        let balanceEndTime = 0;
        const balEndResp = await appCrypto.dripRateManager.getBalanceEndTime(selectedNft);
        if (balEndResp.success == false) {
            resp.data.warnings.push({
                stage: CRUD_APP_STAGE.UPDATE_SUCCESSFUL,
                error: balEndResp.data,
            });
        } else {
            balanceEndTime = balEndResp.data;
            dispatch(setBalanceEndTime(balanceEndTime));
        }

        for (let i = 0; i < resp.data.warnings.length; i++) {
            showToast('warning', resp.data.warnings[i].error.message);
        }

        return {
            success: true,
            status: 'success',
            message: `${contractParam.appName} is created successfully`,
        };
    };

    const updateApp = async (
        data: FormValues
    ): Promise<{
        success: boolean;
        status: 'success' | 'error' | 'info' | 'warning' | undefined;
        message: string;
    }> => {
        let fileAppFlag = false;
        for (let i = 0; i < fileSubnetList.length; i++) {
            const fileSubnet = fileSubnetList[i];
            if (data.subnetReplicaMap[fileSubnet.subnetID]) {
                fileAppFlag = true;
                break;
            }
        }

        if (fileAppFlag) {
            const resp = await updateFileApp(data);
            return resp;
        }

        const resp = await updateDockerApp(data);
        return resp;
    };

    const createApp = async (
        data: FormValues
    ): Promise<{
        success: boolean;
        status: 'success' | 'error' | 'info' | 'warning' | undefined;
        message: string;
    }> => {
        let fileAppFlag = false;
        for (let i = 0; i < fileSubnetList.length; i++) {
            const fileSubnet = fileSubnetList[i];
            if (data.subnetReplicaMap[fileSubnet.subnetID]) {
                fileAppFlag = true;
                break;
            }
        }

        if (fileAppFlag) {
            const resp = await deployFileApp(data);
            return resp;
        }

        const resp = await deployDockerApp(data);
        return resp;
    };

    useEffect(() => {
        if (updateFormFlag) {
            methods.reset(formValues);
            dispatch(setUpdateFormFlag(false));
        }
    }, [updateFormFlag]);

    return (
        <Transition.Root show={isDrawerOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => {}}>
                <div className="fixed bottom-0 right-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel
                            data-cy="drawer"
                            className={`${
                                status === 'deploy-edit' || status === 'deploy-app'
                                    ? 'w-[36.25rem]'
                                    : 'w-[32rem]'
                            } relative flex h-[calc(100vh_-_4.31rem)] flex-1 flex-col bg-stk-blue-200 shadow-[0px_0px_13px_rgba(0,0,0,0.35)]`}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div
                                    className={`absolute top-0 right-0 ${
                                        formValues.isNoDeployment ? 'pt-16' : 'pt-5'
                                    }`}
                                >
                                    {status !== 'loading' && status !== 'deploy-success' && (
                                        <button
                                            type="button"
                                            className="ml-1 mt-3 mr-3 flex h-10 w-10 items-center justify-center text-stk-green duration-300 hover:opacity-80"
                                            onClick={() => {
                                                dispatch(setDrawerOpen(false));
                                                // dispatch(setSelectedApp(undefined));
                                                dispatch(setDeployLoading(false));
                                                // reset();
                                            }}
                                        >
                                            <span className="sr-only">Close drawer</span>
                                            <i
                                                className="fa-regular fa-xmark text-2xl -mr-6"
                                                aria-hidden
                                            />
                                        </button>
                                    )}
                                </div>
                            </Transition.Child>
                            {DrawerContent}
                            {(status === 'deploy-form' ||
                                status === 'deploy-app' ||
                                status === 'upload-form') &&
                                !deployLoading && (
                                    <DeployFooter handleNextStepByButton={goToNextSlide} />
                                )}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Drawer;
