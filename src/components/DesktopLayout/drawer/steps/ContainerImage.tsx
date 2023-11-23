/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@/components/common';
import { useSelector } from '@/redux/hooks';
import { setFormValidationFunc } from '@/redux/drawer/actions';
import DrawerSelect from '@/components/common/DrawerSelect';
import ConditionalInput from '@/components/common/ConditionalInput';

const ContainerImage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { drawer, general } = useSelector((state) => state);
    const { selectedNft } = general;
    const { status, stepIndex } = drawer;

    const {
        register,
        control,
        clearErrors,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        setError,
        getValues,
    } = useFormContext();

    const containerPortFields = useFieldArray({
        control,
        name: 'containerPort',
    });

    const servicePortFields = useFieldArray({
        control,
        name: 'servicePort',
    });

    //   const onSubmit: SubmitHandler<FormValues> = (data) => {
    //     let {
    //       protocol,
    //       containerPort,
    //       hostUrl,
    //       path,
    //       servicePort,
    //       statefulSet,
    //       mountVolume,
    //       envVariablesEnabled,
    //       envVariables,
    //       argsEnabled,
    //       args,
    //       commandsEnabled,
    //       commands,
    //     } = data;

    //     const buildContainerPort = () => {
    //       let finalContainerPort: any = [];
    //       portValues.forEach((item) => {
    //         finalContainerPort.push({ port: item.containerPort, protocol: item.protocol.label });
    //       });
    //       return finalContainerPort;
    //     };

    //     const buildServicePort = () => {
    //       let finalServicePort: any = [];
    //       portValues.forEach((item) => {
    //         finalServicePort.push({ port: item.port, protocol: item.protocol.label });
    //       });
    //       return finalServicePort;
    //     };

    //     containerPort = buildContainerPort();
    //     servicePort = buildServicePort();

    //     // dispatch(setCurrentStep(steps[stepIndex - 1]));
    //     // dispatch();

    //     dispatch(
    //       setFormValues({
    //         ...formValues,
    //         protocol,
    //         containerPort,
    //         servicePort,
    //         hostUrl,
    //         path,
    //         statefulSet,
    //         mountVolume,
    //         envVariablesEnabled,
    //         envVariables,
    //         argsEnabled,
    //         args,
    //         commandsEnabled,
    //         commands,
    //       })
    //     );

    //     slideActions.goToNextSlide(stepName.CONTAINER_IMAGE);
    //   };

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

    const [isHostUrlChanged, setIsHostUrlChanged] = useState<boolean>(false);

    //   const verifyHostUrl = async (hostUrl: string | undefined) => {
    //     const errorComponent: ReactNode = (
    //       <span>
    //         {t('URL_NOT_FOUND1')}
    //         <a
    //           className="text-stk-green font-medium cursor-pointer"
    //           href="https://medium.com/stackos/managing-dns-on-stackos-518d027c4a08"
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           {t('URL_NOT_FOUND2')}
    //           <i className="fa-regular fa-arrow-up-right-from-square h-5 w-5 pl-1" />
    //         </a>
    //       </span>
    //     );

    //     try {
    //       if (!hostUrl) {
    //         showToast('error', errorComponent);
    //         return;
    //       }

    //       const response = await axios.get(
    //         `/api/checkDns?domain=${hostUrl.toLowerCase()}&ethAddress=${address}`
    //       );

    //       const { data: res } = response || {};

    //       if (!res.isUrlVerified) {
    //         showToast('error', errorComponent);
    //         return;
    //       }

    //       showToast('success', t('URL_FOUND'));
    //       setIsHostUrlChanged(false);
    //       dispatch(setFormValues({ ...formValues, isHostUrlVerified: true }));
    //     } catch (error: any) {
    //       if (!error.response.data.isUrlVerified && error.response.status === 500) {
    //         showToast('error', errorComponent);
    //         return;
    //       }

    //       console.error('Error while verifying url: ', error);
    //       showToast('error', 'Something went wrong! Try again later');
    //     }
    //   };

    //   useEffect(() => {
    //     setValues(getValues());
    //     if (slideActions.isSlideUpdated(stepName.CONTAINER_IMAGE) ) {
    //       handleSubmit(onSubmit, onError)();
    //     }
    //   }, [stepIndex]);

    //   useEffect(() => {
    //     if (!formValues.hostUrl) {
    //       let hostUrl;
    //       if (formValues.appName?.toLowerCase() === 'webtty') {
    //         hostUrl = `shell-n${selectedNft || '*'}-${infraNode}.stackos.io`;
    //       } else {
    //         hostUrl = `${formValues.appName}-n${selectedNft || '*'}-${infraNode}.stackos.io`;
    //       }
    //       setValue('hostUrl', hostUrl);
    //       setIsHostUrlChanged(false);
    //       return;
    //     }

    //     if (!formValues.isHostUrlVerified) {
    //       setIsHostUrlChanged(true);
    //     }
    //   }, [formValues.hostUrl, formValues.appName, formValues.isHostUrlVerified, selectedNft]);

    const validationFunc = () => {
        const containerPort = getValues('containerPort');
        const servicePort = getValues('servicePort');
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < containerPort.length; i++) {
            if (!containerPort[i].protocol) {
                setError(`containerPort.${i}.protocol`, {
                    type: 'required',
                    message: 'required',
                });
                return false;
            }
            if (!containerPort[i].port) {
                setError(`containerPort.${i}.port`, {
                    type: 'required',
                    message: 'required',
                });
                return false;
            }
            if (!servicePort[i].port) {
                setError(`servicePort.${i}.port`, {
                    type: 'required',
                    message: 'required',
                });
                return false;
            }
            if (!servicePort[i].protocol) {
                setError(`servicePort.${i}.protocol`, {
                    type: 'required',
                    message: 'required',
                });
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const visibleHostUrl = `${getValues().appName.toLowerCase()}-n${selectedNft}-marvel.stackos.io`;
        setValue('hostUrl', visibleHostUrl);
        dispatch(setFormValidationFunc(validationFunc));
    }, [stepIndex]);

    return (
        <div
            data-cy="drawer-container-image"
            className="scrollbar flex h-full w-full flex-col overflow-auto"
        >
            {/* <form
      data-cy="drawer-container-image"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="scrollbar flex h-full w-full flex-col overflow-auto"
    > */}
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                {status !== 'deploy-edit' && (
                    <i className="fa-solid fa-server mr-2 h-5 w-5 text-stk-green" />
                )}
                <span>{t('DRAWER_STEP2_TITLE')}</span>
            </div>
            <div
                className={`${
                    status === 'deploy-form' || status === 'deploy-app' ? 'mb-[4.5rem] mr-3' : ''
                } scrollbar h-0 flex-1 overflow-y-auto pb-5`}
            >
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    {(status === 'deploy-form' || status === 'deploy-app') && (
                        <p className="mt-3 text-sm">{t('DRAWER_STEP2_SUBTITLE')}</p>
                    )}
                    {getValues('appName')?.toLowerCase() !== 'webtty' && (
                        <>
                            {containerPortFields.fields.map((field, idx) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <div key={field.id} className="flex">
                                    <div className="mt-7 flex w-full flex-row gap-3 child:flex-1">
                                        <DrawerSelect
                                            register={register}
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            value={{
                                                label:
                                                    getValues(`containerPort.${idx}.protocol`) ||
                                                    getValues(`servicePort.${idx}.protocol`),
                                            }}
                                            label={t('DRAWER_STEP2_INPUT1_LABEL')}
                                            options={[{ label: 'HTTP' }, { label: 'TCP' }]}
                                            onChange={(value: { label: string }) => {
                                                setValue(`servicePort.${idx}.protocol`, value);
                                                setValue(`containerPort.${idx}.protocol`, value);
                                            }}
                                            disabled={
                                                getValues().isSoftwareLock &&
                                                status === 'deploy-edit'
                                            }
                                        />
                                        <Input
                                            //   dynamicRequired
                                            key={field.id}
                                            register={register}
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            name={`containerPort.${idx}.port`}
                                            type="string"
                                            label={`${t('DRAWER_STEP2_INPUT2_LABEL')} ${idx + 1}`}
                                            placeholder={t('DRAWER_STEP2_INPUT2_PLACEHOLDER')}
                                            disabled={
                                                getValues().isSoftwareLock &&
                                                status === 'deploy-edit'
                                            }
                                        />
                                        <Input
                                            //   dynamicRequired
                                            register={register}
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            name={`servicePort.${idx}.port`}
                                            type="string"
                                            label={`${t('DRAWER_STEP2_INPUT3_LABEL')} ${idx + 1}`}
                                            placeholder={t('DRAWER_STEP2_INPUT3_PLACEHOLDER')}
                                            disabled={
                                                getValues().isSoftwareLock &&
                                                status === 'deploy-edit'
                                            }
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            servicePortFields.remove(idx);
                                            containerPortFields.remove(idx);
                                        }}
                                        className={`${
                                            idx > 0 ? '' : 'invisible'
                                        } mt-14 ml-2 rounded-md border p-3 text-xs`}
                                        disabled={
                                            getValues().isSoftwareLock && status === 'deploy-edit'
                                        }
                                    >
                                        <i className="fa-solid fa-trash" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    servicePortFields.append({ port: '80', protocol: 'TCP' });
                                    containerPortFields.append({ port: '80', protocol: 'TCP' });
                                }}
                                // onClick={() => addPortForm()}
                                className={`${
                                    getValues().isSoftwareLock ? 'opacity-40' : 'opacity-100'
                                } mt-7 w-full rounded-md border border-stk-grey-500 text-3xl font-light text-stk-grey-500`}
                                disabled={getValues().isSoftwareLock && status === 'deploy-edit'}
                            >
                                +
                            </button>
                        </>
                    )}

                    <div className="mt-5 flex flex-col w-full gap-1">
                        <div className="w-full">
                            <Input
                                label={t('DRAWER_STEP2_INPUT4_LABEL')}
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                                name="hostUrl"
                                placeholder={t('DRAWER_STEP2_INPUT4_PLACEHOLDER')}
                                onChange={(value) => {
                                    setValue('hostUrl', value);
                                    //   setValues({ ...values, hostUrl: value });
                                    //   handleUpdateForm('hostUrl', value);
                                    if (value) {
                                        setIsHostUrlChanged(true);
                                        setValue('isHostUrlVerified', false);
                                        // dispatch(
                                        //   setFormValues({
                                        //     ...formValues,
                                        //     isHostUrlVerified: false,
                                        //   })
                                        // );
                                    }
                                }}
                                disabled={true}
                                // disabled={
                                //   (getValues().isSoftwareLock && status === 'deploy-edit') ||
                                //   getValues().appName?.toLowerCase() === 'webtty'
                                // }
                            />
                        </div>
                        <span className="text-stk-grey-500 text-sm">
                            {t('DRAWER_STEP2_URL_HELP1')}
                            <a
                                href="https://medium.com/stackos/managing-dns-on-stackos-518d027c4a08"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#a2db30] outline-none cursor-pointer"
                            >
                                {t('DRAWER_STEP2_URL_HELP2')}
                                <i className="fa-regular fa-arrow-up-right-from-square h-5 w-5 pl-1" />
                            </a>
                        </span>
                    </div>
                    {getValues().appName?.toLowerCase() !== 'webtty' && (
                        <>
                            {isHostUrlChanged && (
                                <div className="mt-3">
                                    <Button
                                        onClick={() => {
                                            //   handleSubmit(onSubmit, onError);
                                            //   verifyHostUrl(values?.hostUrl);
                                            // verifyHostUrl(getValues("hostUrl"));
                                        }}
                                    >
                                        Verify
                                    </Button>
                                </div>
                            )}
                            <div className="mt-3 w-full">
                                <Input
                                    label={t('DRAWER_STEP2_INPUT5_LABEL')}
                                    register={register}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    name="path"
                                    placeholder={t('DRAWER_STEP2_INPUT5_PLACEHOLDER')}
                                    onChange={(value) => setValue('path', value)}
                                    disabled={
                                        getValues().isSoftwareLock && status === 'deploy-edit'
                                    }
                                />
                            </div>
                            <ConditionalInput
                                clearErrors={clearErrors}
                                errors={errors}
                                control={control}
                                label={t('ENV_VARIABLES')}
                                switchName="envVariablesEnabled"
                                textAreaName="envVariables"
                                placeholder={t('ENV_VARIABLES_PLACEHOLDER')}
                                register={register}
                                disabled={getValues().isSoftwareLock && status === 'deploy-edit'}
                            />
                            <div
                                className={`${
                                    getValues().isSoftwareLock && status === 'deploy-edit'
                                        ? 'opacity-40'
                                        : 'opacity-100'
                                }
                mt-5 flex flex-row gap-2`}
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <Controller
                                        name="statefulSet"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value}
                                                onChange={(value: any) => {
                                                    field.onChange?.(value);
                                                }}
                                                disabled={
                                                    getValues().isSoftwareLock &&
                                                    status === 'deploy-edit'
                                                }
                                                className={`${
                                                    field.value ? 'bg-stk-green' : 'bg-stk-white'
                                                } relative inline-flex h-[17px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                            >
                                                <span className="sr-only">Use setting</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`${
                                                        field.value
                                                            ? 'translate-x-5'
                                                            : 'translate-x-0'
                                                    }
                            pointer-events-none inline-block h-[13px] w-[13px] rounded-full bg-stk-blue-500 shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                />
                                            </Switch>
                                        )}
                                    />
                                </div>
                                <span>{t('STATEFUL_SET')}</span>
                            </div>

                            <ConditionalInput
                                clearErrors={clearErrors}
                                control={control}
                                errors={errors}
                                label={t('ARGS')}
                                textAreaName="args"
                                switchName="argsEnabled"
                                placeholder={t('ARGS_PLACEHOLDER')}
                                register={register}
                                disabled={getValues().isSoftwareLock && status === 'deploy-edit'}
                            />
                            <ConditionalInput
                                control={control}
                                clearErrors={clearErrors}
                                errors={errors}
                                label={t('COMMANDS')}
                                switchName="commandsEnabled"
                                textAreaName="commands"
                                placeholder={t('COMMANDS_PLACEHOLDER')}
                                register={register}
                                disabled={getValues().isSoftwareLock && status === 'deploy-edit'}
                            />
                        </>
                    )}
                </div>
            </div>
            {/* </form> */}
        </div>
    );
};

export default ContainerImage;
