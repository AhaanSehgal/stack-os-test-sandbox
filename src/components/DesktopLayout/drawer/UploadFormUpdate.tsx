/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useNetwork } from 'wagmi';
import router from 'next/router';
import { useSelector } from '@/redux/hooks';
import BasicInfo from './steps/BasicInfo';
import ContainerImage from './steps/ContainerImage';
import { Button, LoadingSpinner, Modal, Icon } from '@/components/common';
import Resources from './steps/resources';
import { stepName, steps as _steps, fileUploadStepName } from './helpers';
import {
    setDrawerOpen,
    setFormValues,
    setHardwareResource,
    setStepIndex,
} from '@/redux/drawer/actions';
import SubnetSelection from './steps/SubnetSelection';
import BalanceToAdd from './steps/BalanceToAdd';
import UpdateFile from './UpdateFile';
// import { ContractBasedDeployment, decryptApp, ipfs, utils } from '@/utils/appCryptoConfig';
import { setDeployedApps } from '@/redux/deploy/actions';
import showToast from '@/utils/showToast';
import { isDeployAndUpdateDisabled } from '@/utils/utils';
import ModAttributeCreator from './steps/ModAttributeCreator';
import { RESOURCE_CATEGORY } from '@/utils/constants';
import { getIpfsFilePath } from '@/utils/utils';
import { client } from '@/pages/_app';
import { fileSubnetList } from './fileUploadSteps/helpers';
import { CRUD_APP_STAGE, ContractApp } from '@decloudlabs/stk-v2/lib/types/types';
import { DeployState } from '@/redux/deploy/types';
import { GeneralState } from '@/redux/general/types';
import { DrawerState, Step } from '@/redux/drawer/types';
import { setBalanceEndTime, setBalancesForSubscription } from '@/redux/general/actions';
import FileInfo from './fileUploadSteps/FileInfo';
import FileResources from './fileUploadSteps/FileResources';

const UploadFormUpdate = ({ onClickUpdate }: { onClickUpdate: Function }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // const { drawer, general, deploy } = useSelector((state) => state);
    const drawer: DrawerState = useSelector((state) => state.drawer);
    const general: GeneralState = useSelector((state) => state.general);
    const deploy: DeployState = useSelector((state) => state.deploy);
    const { selectedNft, nftRole, appCrypto, fileAppManager } = general;
    const { status, formValues, hardwareResource, stepIndex } = drawer;
    const { deployedApps } = deploy;
    const { appID } = formValues;

    const { address: userAddress } = useAccount();
    const { chain } = useNetwork();

    // const [steps, setSteps] = useState(_steps);
    // const [currentApp, setCurrentApp] = useState<ContractApp | null>(null);
    // const [isFileUpdateDisabled, setIsFileUpdateDisabled] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    // useEffect(() => {
    //     const app = deployedApps?.find((app) => app.appID === formValues.appID);
    //     setCurrentApp(app);

    //     let fileAppFlag = false;
    //     for (let i = 0; i < fileSubnetList.length; i++) {
    //         const fileSubnet = fileSubnetList[i];
    //         if (formValues.subnetReplicaMap[fileSubnet.subnetID]) {
    //             fileAppFlag = true;
    //             break;
    //         }
    //     }

    //     // for (let i = 0; i < app?.resourceType.length; i++) {
    //     //     const resourceType = app?.resourceType[i];
    //     //     if (RESOURCE_CATEGORY.fileType.includes(resourceType)) {
    //     //         setIsFileUpdateDisabled(false);
    //     //         return;
    //     //     }
    //     // }
    //     console.log('fileAppFlag: ', fileAppFlag);
    //     setIsFileUpdateDisabled(!fileAppFlag);
    // }, [deployedApps, formValues]);

    // useEffect(() => {
    //     // Only for file app
    //     if (!appCrypto) return;
    //     if (!appID) return;
    //     if (isFileUpdateDisabled) return;
    //     if (!userAddress) return;

    //     (async () => {
    //         try {
    //             const ipfsFilePath = await getIpfsFilePath(appID, selectedNft);

    //             const { filePath } = ipfsFilePath.data.data;
    //             const fileHostUrl = `ipfs.io/ipfs/${filePath}`;

    //             const cacheResp = await appCrypto.appBrowserCache.getAppPayload(
    //                 userAddress,
    //                 selectedNft,
    //                 appID
    //             );
    //             if (cacheResp.success == false) throw cacheResp.data;

    //             const filePayload: any = cacheResp.data.appPayload;

    //             filePayload.hostUrl = fileHostUrl;

    //             dispatch(
    //                 setFormValues({
    //                     ...formValues,
    //                     hostUrl: fileHostUrl,
    //                 })
    //             );
    //         } catch (error: any) {
    //             dispatch(
    //                 setFormValues({
    //                     ...formValues,
    //                     hostUrl: undefined,
    //                 })
    //             );
    //             console.error('Error while getting file path: ', error);
    //         }
    //     })();
    // }, [isFileUpdateDisabled]);

    const fileSubnetList = [
        {
            subnetName: 'matrix',
            subnetID: '1',
        },
    ];

    // const stepContent: any = {
    //     'basic-info': <BasicInfo />,
    //     'container-image': <ContainerImage />,
    //     resources: <Resources />,
    //     'subnet-selection': <SubnetSelection selectionSubnetList={fileSubnetList} />,
    //     'attrib-var': <ModAttributeCreator />,
    //     'update-file': <UpdateFile />,
    //     'balance-to-add': <BalanceToAdd />,
    // };

    const getStepIcon: any = {
        'file-info': 'fa-file',
        'file-resources': 'fa-cloud-check',
        'subnet-selection': 'fa-circle-nodes',
        'balance-to-add': 'fa-list-ul',
    };

    const stepContent: { [id: string]: any } = {
        'file-info': <FileInfo />,
        'file-resources': <FileResources />,
        'file-subnet-selection': <SubnetSelection selectionSubnetList={fileSubnetList} />,
        'balance-to-add': <BalanceToAdd />,
    };

    const fileUploadSteps = [
        {
            id: 0,
            slideName: fileUploadStepName.FILE_INFO,
            icon: 'file-info',
            title: 'File Information',
        },
        {
            id: 1,
            slideName: fileUploadStepName.SUBNET_SELECTION,
            icon: 'subnet-selection',
            title: 'Choose Subnets',
        },
        {
            id: 2,
            slideName: fileUploadStepName.FILE_RESOURCES,
            icon: 'file-resources',
            title: 'Resources Usage',
        },
        {
            id: 3,
            slideName: fileUploadStepName.BALANCE_TO_ADD,
            icon: 'balance-to-add',
            title: 'Balance To Add',
        },
    ];

    // const[
    //     { id: 0, name: stepName.BASIC_INFO, icon: 'list', title: 'Basic Information' },
    //     {
    //         id: 5,
    //         name: stepName.UPDATE_FILE,
    //         icon: 'update-file',
    //         title: 'Update File',
    //     },
    //     {
    //         id: 5,
    //         name: stepName.BALANCE_TO_ADD,
    //         icon: 'stackos-icon',
    //         title: 'Balance To Add',
    //     },
    // ]

    // const test = fileUploadSteps[0].slideName
    const StepContent =
        stepContent[fileUploadSteps[Math.min(stepIndex, fileUploadSteps.length - 1)].slideName];

    const onClickDelete = async () => {
        if (!fileAppManager) return;
        if (!appID) return;
        if (!appCrypto) return;

        try {
            setLoading(true);

            const { appName, appID } = formValues;

            const resp = await fileAppManager.deleteApp(selectedNft, appID, async () => {
                return {
                    success: true,
                    data: '',
                };
            });

            if (!resp.success) {
                showToast('warning', 'Something went wrong! Please try again later.');
                setLoading(false);
                return;
            }

            const balSubResp = await appCrypto.dripRateManager.getBalancesForSubscription(
                selectedNft
            );
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

            dispatch(setHardwareResource(!hardwareResource));

            dispatch(setDrawerOpen(false));

            if (router.pathname !== 'deploy') {
                router.push('/deploy');
            }

            setLoading(false);
        } catch (error: any) {
            console.error('Error while deleting app: ', error);
            setLoading(false);
            showToast('warning', error?.message);
        }
    };

    // useEffect(() => {
    //     if (status === 'deploy-edit') {
    //         const newSteps = [..._steps];
    //         newSteps.map((step) => {
    //             if (step.id === 5) {
    //                 step.id = 6;
    //             }
    //         });
    //         console.log('changing steps: ', isFileUpdateDisabled);
    //         if (!isFileUpdateDisabled) {
    //             setSteps([
    //                 { id: 0, name: stepName.BASIC_INFO, icon: 'list', title: 'Basic Information' },
    //                 {
    //                     id: 5,
    //                     name: stepName.UPDATE_FILE,
    //                     icon: 'update-file',
    //                     title: 'Update File',
    //                 },
    //                 {
    //                     id: 5,
    //                     name: stepName.BALANCE_TO_ADD,
    //                     icon: 'stackos-icon',
    //                     title: 'Balance To Add',
    //                 },
    //             ]);
    //         }
    //     }
    // }, [status, isFileUpdateDisabled]);

    return (
        <div className="flex h-full w-full flex-row">
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
            <div className="z-50 w-[3.6rem]">
                <div className="h-screen bg-stk-blue-500">
                    {fileUploadSteps.map((step, index) => (
                        <div
                            key={step.slideName}
                            className={`flex h-[3.6rem] items-center justify-center duration-500 hover:bg-stk-blue-300 ${
                                index === stepIndex
                                    ? 'bg-stk-blue-100 text-stk-green'
                                    : 'text-stk-grey-500'
                            } ${
                                step.slideName === stepName.UPDATE_FILE
                                    ? 'opacity-25'
                                    : 'hover:cursor-pointer'
                            }`}
                            data-tip={step.title}
                            data-for="drawer-menus"
                            onClick={() => {
                                // dispatch(setCurrentStep(step))
                                // slideActions.setSlide(step.name);
                                if (step.slideName !== stepName.UPDATE_FILE) {
                                    dispatch(setStepIndex(index));
                                } else if (step.slideName === stepName.UPDATE_FILE) {
                                    dispatch(setStepIndex(index));
                                }
                            }}
                        >
                            {step.icon === 'stackos-icon' ? (
                                <Icon
                                    iconName="stack-regular"
                                    className="leading-3 duration-700"
                                    layout="fixed"
                                    width={10}
                                    height={20}
                                />
                            ) : (
                                <i className={`fa-solid ${getStepIcon[step.icon]} h-5 w-5`} />
                            )}
                        </div>
                    ))}
                    <ReactTooltip
                        id="drawer-menus"
                        place="left"
                        effect="solid"
                        backgroundColor="#DFDFDF"
                        textColor="#1F2937"
                        className="text-xs font-medium"
                    />
                </div>
            </div>
            <div className="flex h-full w-full flex-col">
                {StepContent}
                {status === 'upload-form-update' && (
                    <div className="bottom-0 flex w-full flex-row items-center justify-end pb-3 pr-8">
                        <div
                            onClick={() => setDeleteModalOpen(true)}
                            className="text-base font-medium text-stk-white hover:cursor-pointer"
                        >
                            <i className="fa-thin fa-trash mr-2 text-stk-green" />
                            {t('DELETE')}
                        </div>
                        <Button
                            onClick={() => onClickUpdate()}
                            className="ml-9 bg-stk-grey-200 text-base font-medium text-stk-blue-500"
                            disabled={isDeployAndUpdateDisabled(nftRole)}
                        >
                            <i className="fa-light fa-repeat mr-2" />
                            {t('UPDATE')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadFormUpdate;
