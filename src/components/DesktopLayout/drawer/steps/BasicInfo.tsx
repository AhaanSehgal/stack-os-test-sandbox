/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react';
import { useNetwork } from 'wagmi';
import { Input, CopyField } from '@/components/common';
import { useSelector } from '@/redux/hooks';
import { setFormValidationFunc } from '@/redux/drawer/actions';
import DrawerSelect from '@/components/common/DrawerSelect';
import CheckboxInput from '@/components/common/CheckBox';
import { GeneralState, Port } from '@/redux/general/types';
import { RESOURCE_CATEGORY } from '@/utils/constants';
import { DeployState } from '@/redux/deploy/types';
import { DrawerState } from '@/redux/drawer/types';
import { setCalcDripRateFlag, setDripRateFactors } from '@/redux/general/actions';

const BasicInfo = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { chain } = useNetwork();
    // const { drawer, deploy, general } = useSelector((state) => state);
    const drawer: DrawerState = useSelector((state: any) => state.drawer);
    const general: GeneralState = useSelector((state: any) => state.general);
    const deploy: DeployState = useSelector((state: any) => state.deploy);
    const { subscriptionParam, selectedNft } = general;
    const { createTime } = subscriptionParam;
    const { status, formValues } = drawer;
    const { deployedApps } = deploy;

    const [hostingDetails, setHostingDetails] = useState({
        type: '',
        host: '',
        externalDNS: '',
        internalDNS: '',
        pointsTo: '',
    });

    const [advancedState, setAdvancedState] = useState(false);
    const [isPrivateImage, setIsPrivateImage] = useState(false);
    const [isFileApp, setIsFileApp] = useState(false);

    //   const [appName, setAppName] = useState("");

    const {
        register,
        clearErrors,
        control,
        formState: { errors },
        setValue,
        setError,
        getValues,
    } = useFormContext();

    //   const {
    //     register,
    //     clearErrors,
    //     handleSubmit,
    //     formState: { errors },
    //     setValue,
    //     reset,
    //     setError,
    //     getValues,
    //   } = useForm<FormValues>({
    //     defaultValues: formValues,
    //   });
    //   const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    //     slideActions.setSlide(stepName.BASIC_INFO);
    //   };

    //   const onSubmit: SubmitHandler<FormValues> = (data) => {
    //     dispatch(setFormValues({ ...formValues, ...data, privateImage }));
    //     slideActions.goToNextSlide(stepName.BASIC_INFO);
    //   };

    function hasDuplicateAppName() {
        // eslint-disable-next-line prefer-regex-literals
        const letters = new RegExp(/^[a-zA-Z0-9]+$/);
        if (!getValues('appName')) {
            setError('appName', {
                type: 'required',
                message: 'Name cannot be empty',
            });

            return false;
        }

        if (!letters.test(getValues('appName') || '')) {
            setError('appName', {
                type: 'required',
                message: 'Name has invalid characters',
            });
            return false;
        }

        if (deployedApps && deployedApps?.find((app) => app.appName === getValues('appName'))) {
            setError('appName', {
                type: 'required',
                message: 'Name already in use',
            });
            return false;
        }

        return true;
    }

    //   const handleUpdateForm = debounce((field: string, value: any) => {
    //     if (status === 'deploy-edit') {
    //       dispatch(setFormValues({ ...formValues, [field]: value }));
    //     } else if (status === 'deploy-app') {
    //       const updatedAppConfig = selectedAppConfig;
    //       if (updatedAppConfig) {
    //         updatedAppConfig[activeSideStep - 2] = {
    //           ...updatedAppConfig[activeSideStep - 2],
    //           [field]: value,
    //         };
    //         dispatch(setSelectedAppConfig(updatedAppConfig));
    //       }
    //       dispatch(setFormValues({ ...formValues, [field]: value }));
    //     }
    //   });

    //   useEffect(() => {
    //     if (status === 'deploy-app') reset(formValues);
    //   }, [formValues]);

    useEffect(() => {
        if (status === 'deploy-edit') {
            let baseUrl = window.sessionStorage.getItem('stackosBaseUrl') || '';
            if (baseUrl.includes('/api')) {
                baseUrl = baseUrl.replace('/api', '');
            }

            setHostingDetails({
                type: 'A',
                host: formValues.hostUrl || '',
                externalDNS: formValues.hostUrl
                    ? `https://${formValues.hostUrl}${
                          Number((formValues.servicePort?.[0] as Port)?.port) === 80
                              ? ''
                              : `:${(formValues.servicePort?.[0] as Port)?.port}`
                      }${getValues('path') || '/'}`
                    : '',
                internalDNS: `${formValues.appName?.toLowerCase()}-n${selectedNft}:${
                    (formValues.servicePort?.[0] as Port)?.port
                }`,
                // pointsTo: getInfraNodeIp(chain?.id as 137 | 56, baseUrl),
                pointsTo: '',
            });
        }
    }, [status, formValues.hostUrl]);

    useEffect(() => {
        const app = deployedApps?.find((app) => app.appID === formValues.appID);

        for (let i = 0; i < app?.resourceType.length; i++) {
            const resourceType = app?.resourceType[i];
            if (RESOURCE_CATEGORY.fileType.includes(resourceType)) {
                setIsFileApp(true);

                return;
            }
        }
        setIsFileApp(false);
    }, [deployedApps, formValues]);

    //   useEffect(() => {
    //     if (slideActions.isSlideUpdated(stepName.BASIC_INFO)) {
    //       if (status === 'deploy-edit' || !hasDuplicateAppName())
    //       {
    //         handleSubmit(onSubmit, onError)();
    //       } else {
    //         slideActions.setSlide(stepName.BASIC_INFO);
    //       }
    //     }
    //   }, [stepIndex]);

    useEffect(() => {
        dispatch(setFormValidationFunc(hasDuplicateAppName));
    }, []);

    useEffect(() => {
        if (getValues().privateImage === true) {
            setIsPrivateImage(true);
        }
    }, [getValues().privateImage]);

    return (
        <div
            data-cy="drawer-basic-info"
            className="scrollbar flex h-full w-full flex-col overflow-auto"
        >
            {/* // <form
    //   data-cy="drawer-basic-info"
    //   onSubmit={handleSubmit(onSubmit, onError)}
    //   className="scrollbar flex h-full w-full flex-col overflow-auto"
    // > */}
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                {status !== 'deploy-edit' && (
                    <i className="fa-regular fa-list-ul mr-2 h-5 w-5 text-stk-green" />
                )}
                <span>{t('DRAWER_STEP1_TITLE')}</span>
            </div>
            <div
                className={`${
                    status === 'deploy-form' || status === 'deploy-app' ? 'mb-[4.5rem] mr-3' : ''
                } scrollbar h-0 flex-1 overflow-y-auto pb-5`}
            >
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    {(status === 'deploy-form' || status === 'deploy-app') && (
                        <p className="mt-3 text-sm">{t('DRAWER_STEP1_SUBTITLE')}</p>
                    )}

                    <div className="mt-7 flex w-full flex-row gap-4 child:flex-1">
                        <div className="w-full">
                            <Input
                                dataCy="drawer-basic-info-name"
                                disabled={
                                    status === 'deploy-app' ||
                                    status === 'deploy-edit' ||
                                    getValues().appName.toLowerCase() === 'webtty'
                                }
                                label={t('DRAWER_STEP1_INPUT2_LABEL')}
                                register={register}
                                errors={errors}
                                validation={{
                                    required: true,
                                    maxLength: 32,
                                    lowerCase: true,
                                }}
                                clearErrors={clearErrors}
                                name="appName"
                                placeholder={t('DRAWER_STEP1_INPUT2_PLACEHOLDER')}
                            />
                        </div>
                    </div>
                    {getValues().appName?.toLowerCase() === 'webtty' ? (
                        <>
                            <div className="mt-7 w-full">
                                <Input
                                    dataCy="drawer-basic-info-image"
                                    label={t('DRAWER_STEP1_INPUT7_LABEL')}
                                    register={register}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    name="username"
                                    validation={{ required: true }}
                                    placeholder={t('DRAWER_STEP1_INPUT7_PLACEHOLDER')}
                                    disabled={
                                        status === 'deploy-edit' && getValues().isSoftwareLock
                                    }
                                />
                            </div>
                            <div className="mt-7 w-full">
                                <Input
                                    dataCy="drawer-basic-info-image"
                                    label={t('DRAWER_STEP1_INPUT8_LABEL')}
                                    register={register}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    name="password"
                                    type="password"
                                    validation={{ required: true }}
                                    placeholder={t('DRAWER_STEP1_INPUT8_PLACEHOLDER')}
                                    disabled={
                                        status === 'deploy-edit' && getValues().isSoftwareLock
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        !isFileApp && (
                            <>
                                <div className="mt-7 w-full">
                                    <Input
                                        dataCy="drawer-basic-info-image"
                                        label={t('DRAWER_STEP1_INPUT5_LABEL')}
                                        register={register}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        name="image.repository"
                                        validation={{ required: true }}
                                        placeholder={t('DRAWER_STEP1_INPUT5_PLACEHOLDER')}
                                        disabled={
                                            status === 'deploy-edit' && getValues().isSoftwareLock
                                        }
                                    />
                                </div>
                                <div className="mt-7 w-full">
                                    <Input
                                        dataCy="drawer-basic-info-tag"
                                        label={t('DRAWER_STEP1_INPUT6_LABEL')}
                                        register={register}
                                        errors={errors}
                                        name="image.tag"
                                        validation={{ required: true }}
                                        placeholder={t('DRAWER_STEP1_INPUT6_PLACEHOLDER')}
                                        disabled={
                                            getValues().isSoftwareLock && status === 'deploy-edit'
                                        }
                                    />
                                </div>
                                <div
                                    className={`${
                                        getValues().privateImage ? 'mt-7' : ''
                                    } flex w-full items-center gap-x-10`}
                                >
                                    <div>
                                        <CheckboxInput
                                            register={register}
                                            errors={errors}
                                            value={getValues().privateImage}
                                            onClick={() => {
                                                setIsPrivateImage(!isPrivateImage);
                                                setValue('privateImage', !getValues().privateImage);
                                            }}
                                            label={t('PRIVATE_IMAGE')}
                                            disabled={
                                                getValues().isSoftwareLock &&
                                                status === 'deploy-edit'
                                            }
                                            name="privateImage"
                                            validation={false}
                                        />
                                    </div>
                                    {isPrivateImage && (
                                        <div className="w-full">
                                            <DrawerSelect
                                                defaultValue={{ label: 'Docker' }}
                                                label={t('IMAGE_REGISTRY')}
                                                options={[{ label: 'Docker' }]}
                                                register={register}
                                                errors={errors}
                                                clearErrors={clearErrors}
                                                name="privateImageRegistry"
                                                validation={{ required: true }}
                                                onChange={(value: string) => {
                                                    setValue('privateImageRegistry', value);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )
                    )}

                    {isPrivateImage && (
                        <>
                            <div className="mt-7 w-full">
                                <Input
                                    label={t('USERNAME')}
                                    register={register}
                                    errors={errors}
                                    name="privateImageUsername"
                                    placeholder={t('USERNAME_PLACEHOLDER')}
                                    clearErrors={clearErrors}
                                    validation={{ required: true }}
                                />
                            </div>
                            <div className="mt-7 w-full">
                                <Input
                                    label={t('PASSWORD')}
                                    register={register}
                                    errors={errors}
                                    name="privateImagePassword"
                                    placeholder={t('PASSWORD_PLACEHOLDER')}
                                    clearErrors={clearErrors}
                                    validation={{ required: true }}
                                />
                            </div>
                        </>
                    )}

                    {!isFileApp && (
                        <div className="mt-5 flex flex-row gap-2">
                            <div className=" flex flex-col items-center justify-center">
                                <Controller
                                    name="advanceOptions"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch
                                            checked={field.value}
                                            onChange={(value: any) => {
                                                field.onChange?.(value);
                                                setAdvancedState(value);
                                            }}
                                            className={`${
                                                getValues().advanceOptions
                                                    ? 'bg-stk-green'
                                                    : 'bg-stk-white'
                                            }  relative inline-flex h-[17px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`${
                                                    getValues().advanceOptions
                                                        ? 'translate-x-5'
                                                        : 'translate-x-0'
                                                }
                          pointer-events-none inline-block h-[13px] w-[13px] rounded-full bg-stk-blue-500 shadow-lg ring-0 transition duration-200 ease-in-out`}
                                            />
                                        </Switch>
                                    )}
                                />
                            </div>
                            <span>{t('ADVANCE_OPTIONS')}</span>
                        </div>
                    )}

                    {!isFileApp && getValues().advanceOptions && (
                        <>
                            <div className="mt-7 w-full">
                                <DrawerSelect
                                    defaultValue={{
                                        label: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
                                    }}
                                    label={t('SUPPORT_ADDRESS')}
                                    options={[
                                        {
                                            label: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
                                        },
                                    ]}
                                    register={register}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    name="supportAddress"
                                    validation={{ required: status === 'deploy-form' }}
                                    onChange={(value: string) => {
                                        setValue('supportAddress', value);
                                    }}
                                    disabled={Number(createTime) > 0 || status === 'deploy-edit'}
                                />
                            </div>

                            <div className="flex w-full items-center gap-x-10">
                                <div className="mt-7 w-full">
                                    <Input
                                        dataCy="drawer-basic-info-image"
                                        label="License Address"
                                        register={register}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        name="licenseAddress"
                                        placeholder="License Address"
                                        disabled={
                                            Number(createTime) > 0 || status === 'deploy-edit'
                                        }
                                    />
                                </div>

                                <div className="mt-7 w-full">
                                    <Input
                                        dataCy="drawer-basic-info-image"
                                        label="License Fee (Per Day)"
                                        register={register}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        name="licenseFee"
                                        validation={{
                                            required: true,
                                            pattern: {
                                                value: /^\d{0,9}(\.\d{0,6})?$/,
                                                message: 'Must not exceed 6 decimals',
                                            },
                                            min: { value: 0, message: 'Must not exceed 999' },
                                            max: { value: 999, message: 'Must not exceed 999' },
                                        }}
                                        placeholder="License Fee"
                                        onChange={(value) => {
                                            dispatch(setCalcDripRateFlag(true));
                                            // );
                                            // dispatch(
                                            //     setDripRateFactors({
                                            //         ...dripRateFactors,
                                            //         licenseFactor: [licenseFactor[0], value]
                                            //     })
                                            // );
                                        }}
                                        disabled={
                                            Number(createTime) > 0 || status === 'deploy-edit'
                                        }
                                    />
                                </div>

                                <div className="mt-7 w-full">
                                    <Input
                                        dataCy="drawer-basic-info-image"
                                        label="License Percent"
                                        register={register}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        name="licensePercent"
                                        validation={{
                                            required: true,
                                            min: { value: 0, message: 'Must be 1-100' },
                                            max: { value: 100, message: 'Must be 1-100' },
                                        }}
                                        placeholder="License Percent"
                                        onChange={(value) => {
                                            dispatch(setCalcDripRateFlag(true));
                                        }}
                                        disabled={
                                            Number(createTime) > 0 || status === 'deploy-edit'
                                        }
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {status !== 'deploy-edit' && (
                        <div className="mt-7 w-full">
                            <span> Software Lock : </span>
                            <Controller
                                name="isSoftwareLock"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onChange={(value: boolean) => {
                                            field?.onChange(value);
                                        }}
                                        className={`${
                                            getValues().isSoftwareLock
                                                ? 'bg-stk-green'
                                                : 'bg-stk-white'
                                        } relative inline-flex h-[17px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${
                                                getValues().isSoftwareLock
                                                    ? 'translate-x-5'
                                                    : 'translate-x-0'
                                            }
                pointer-events-none inline-block h-[13px] w-[13px] rounded-full bg-stk-blue-500 shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                )}
                            />
                        </div>
                    )}

                    {!isFileApp && (
                        <div className="mt-7 w-full">
                            <span> No Deployment : </span>
                            <Controller
                                name="isNoDeployment"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onChange={(value: boolean) => {
                                            field?.onChange?.(value);
                                        }}
                                        className={`${
                                            getValues().isNoDeployment
                                                ? 'bg-stk-green'
                                                : 'bg-stk-white'
                                        } relative inline-flex h-[17px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${
                                                getValues().isNoDeployment
                                                    ? 'translate-x-5'
                                                    : 'translate-x-0'
                                            }
                pointer-events-none inline-block h-[13px] w-[13px] rounded-full bg-stk-blue-500 shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                )}
                            />
                        </div>
                    )}

                    {status === 'deploy-edit' && (
                        <div className="flex flex-col w-full self-start mt-6 pt-7 border-t-2 border-[#1b232e] gap-y-5">
                            <span className="text-stk-green text-xl font-bold">
                                {t('HOSTING_DETAILS')}
                            </span>
                            {!isFileApp ? (
                                <>
                                    <span className="text-stk-white text-sm font-semibold w-[22rem] truncate">
                                        {`${t('DRAWER_SUCCESS_MESSAGE_TYPE')}: `}
                                        <span className="font-normal">{hostingDetails?.type}</span>
                                    </span>
                                    <div className="flex cursor-pointer w-full">
                                        <div className="flex text-sm items-end font-semibold max-w-[24.4rem] duration-500">
                                            <span className="text-stk-white mr-1">
                                                {`${t('DRAWER_SUCCESS_MESSAGE_HOST')}:`}
                                            </span>
                                            <CopyField
                                                text={hostingDetails?.host}
                                                bodyClassName="flex items-end font-normal truncate"
                                                iconClassName="text-base font-light"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex cursor-pointer w-full">
                                        <div className="flex text-sm items-end font-semibold max-w-[24.4rem] duration-500">
                                            <span className="text-stk-white mr-1">
                                                {`${t('DRAWER_SUCCESS_MESSAGE_POINTS_TO')}:`}
                                            </span>
                                            <CopyField
                                                text={hostingDetails?.pointsTo}
                                                bodyClassName="flex items-end font-normal truncate"
                                                iconClassName="text-base font-light"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex cursor-pointer w-full">
                                        <div className="flex text-sm items-end font-semibold max-w-[24.4rem] duration-500">
                                            <span className="text-stk-white mr-1 whitespace-nowrap">
                                                {`${t('DRAWER_SUCCESS_MESSAGE_INTERNAL_DNS')}:`}
                                            </span>
                                            <CopyField
                                                text={hostingDetails?.internalDNS}
                                                bodyClassName="flex items-end font-normal truncate"
                                                iconClassName="text-base font-light"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : null}
                            {hostingDetails?.externalDNS ? (
                                <div className="flex cursor-pointer w-full">
                                    <div className="flex text-sm items-end font-semibold max-w-[24.4rem] duration-500">
                                        <span className="text-stk-white mr-1 whitespace-nowrap">
                                            {`${t('DRAWER_SUCCESS_MESSAGE_EXTERNAL_DNS')}:`}
                                        </span>
                                        <CopyField
                                            text={hostingDetails?.externalDNS}
                                            bodyClassName="flex items-end font-normal truncate"
                                            iconClassName="text-base font-light"
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {!hostingDetails?.externalDNS && isFileApp ? (
                                <span className="mt-2 mb-2 truncate  text-sm font-medium text-stk-grey-400">
                                    No File Uploded
                                </span>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
            {/* </form> */}
        </div>
    );
};

export default BasicInfo;
