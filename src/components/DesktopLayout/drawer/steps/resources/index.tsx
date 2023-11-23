import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import { setToTokenAmount } from '@/redux/swap/actions';
import { useSelector } from '@/redux/hooks';
import { setFormValidationFunc } from '@/redux/drawer/actions';
import { Input, DrawerSelect } from '@/components/common';
import RangeSlider from '@/components/common/RangeSlider';
import ResourceSummary from '../../ResourceSummary';
import { cpuLabels, cpuOptions } from './helpers';
import { setCalcDripRateFlag } from '@/redux/general/actions';

const Resources = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { drawer } = useSelector((state) => state);
    const { stepIndex, status } = drawer;
    //   const {
    //     register,
    //     clearErrors,
    //     handleSubmit,
    //     setValue,
    //     formState: { errors },
    //     getValues,
    //   } = useForm<FormValues>({
    //     defaultValues: {
    //       ...formValues,
    //       storageType: formValues.storageType === 'ssd-sc' ? 'High IOPS' : 'Standard IOPS',
    //       mountVolume: formValues.mountVolume
    //         ? formValues.mountVolume
    //         : formValues?.volumeMounts?.[0]?.mountPath || '',
    //     },
    //   });
    const {
        register,
        clearErrors,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useFormContext();

    //   const onError: SubmitErrorHandler<FormValues> = () => {
    //     slideActions.setSlide(stepName.RESOURCES);
    //   };

    //   const onSubmit: SubmitHandler<FormValues> = (data) => {
    //     const { persistenceEnabled, mountVolume, storageType } = data;

    //     //   dispatch(setCurrentStep(steps[stepIndex - 1]));

    //       dispatch(
    //         setFormValues({
    //           ...formValues,
    //           persistenceEnabled,
    //           storageType,
    //           mountVolume,
    //         })
    //       );

    //       slideActions.goToNextSlide(stepName.RESOURCES);
    //     // if (currentStep.id < 6) {

    //     // }
    //   };

    //   useEffect(() => {
    //     if (slideActions.isSlideUpdated(stepName.RESOURCES)) {
    //       handleSubmit(onSubmit, onError)();
    //     }
    //   }, [stepIndex]);

    useEffect(() => {
        dispatch(setToTokenAmount(null));
    }, []);

    useEffect(() => {
        dispatch(setFormValidationFunc(() => true));
    }, [stepIndex]);

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

    return (
        <div data-cy="drawer-resources" className="scrollbar flex h-full flex-col overflow-auto">
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                {status !== 'deploy-edit' && (
                    <i className="fa-solid fa-cloud-check mr-2 h-5 w-5 text-stk-green" />
                )}
                <span>
                    {status === 'purchase-resources'
                        ? t('DRAWER_STEP3_PURCHASE_TITLE')
                        : t('DRAWER_STEP3_TITLE')}
                </span>
            </div>
            <div
                className={`${
                    status === 'deploy-form' ||
                    status === 'deploy-app' ||
                    status === 'purchase-resources'
                        ? 'mb-[4.5rem] mr-3'
                        : ''
                } scrollbar h-0 flex-1 overflow-y-auto pb-5`}
            >
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    {(status === 'deploy-form' ||
                        status === 'deploy-app' ||
                        status === 'purchase-resources') && (
                        <p className="mt-3 mb-4 text-sm">
                            {status === 'purchase-resources'
                                ? t('DRAWER_STEP3_PURCHASE_SUBTITLE')
                                : t('DRAWER_STEP3_SUBTITLE')}
                        </p>
                    )}

                    <div className="mt-4 grid gap-4 w-full">
                        {/* CPU---------------------------------------------------------------------------- */}
                        <div className="child:flex-1">
                            <div className="mb-3">
                                <DrawerSelect
                                    value={{
                                        label: cpuLabels[
                                            getValues('cpuType') as keyof typeof cpuLabels
                                        ],
                                        value: getValues('cpuType'),
                                    }}
                                    label="Choose Instance type"
                                    options={cpuOptions}
                                    register={register}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    name="cpuType"
                                    onChange={(val: { value: string; label: string }) => {
                                        setValue('cpuType', val.value);
                                        dispatch(setCalcDripRateFlag(true));
                                    }}
                                />
                            </div>

                            <div className="mt-2">
                                <RangeSlider
                                    name="cpuTypeCount"
                                    register={register}
                                    value={Number(getValues('cpuTypeCount'))}
                                    control={control}
                                    onChange={() => {
                                        dispatch(setCalcDripRateFlag(true));
                                    }}
                                />
                            </div>
                        </div>
                        {/* BANDWIDTH---------------------------------------------------------------------------- */}
                        <div className="child:flex-1 self-end">
                            <div>
                                <p>Bandwidth</p>
                            </div>
                            <div className="mt-2">
                                <RangeSlider
                                    name="bandwidth"
                                    register={register}
                                    control={control}
                                    onChange={(val: any) => {
                                        setValue('bandwidth', val);
                                        dispatch(setCalcDripRateFlag(true));
                                    }}
                                />
                            </div>
                        </div>
                        {/* STORAGE---------------------------------------------------------------------------- */}
                        <div
                            className={`relative child:flex-1 ${
                                !getValues('persistenceEnabled') ? 'opacity-40' : ''
                            }`}
                        >
                            <div>
                                <p>Storage</p>
                            </div>
                            <div className="mt-2">
                                <RangeSlider
                                    disabled={!getValues('persistenceEnabled')}
                                    name="storage"
                                    control={control}
                                    register={register}
                                    value={getValues('storage')}
                                    onChange={(val: any) => {
                                        setValue('storage', val);
                                        dispatch(setCalcDripRateFlag(true));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {(status === 'deploy-app' ||
                        status === 'deploy-form' ||
                        status === 'deploy-edit') && (
                        <>
                            <div className="mt-[1.12rem] flex flex-row gap-2">
                                <div className="flex flex-col items-center justify-center">
                                    <Switch
                                        checked={getValues('persistenceEnabled')}
                                        onChange={(e: boolean) => {
                                            dispatch(setCalcDripRateFlag(true));
                                            setValue(
                                                'persistenceEnabled',
                                                !getValues('persistenceEnabled')
                                            );
                                            setValue('storageType', 'Standard IOPS');
                                            setValue('mountVolume', '');
                                            if (e) setValue('storage', 1);
                                            else setValue('storage', 0);
                                            clearErrors('storage');
                                        }}
                                        className={`${
                                            getValues('persistenceEnabled')
                                                ? 'bg-stk-green'
                                                : 'bg-stk-white'
                                        } relative inline-flex h-[17px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`${
                                                getValues('persistenceEnabled')
                                                    ? 'translate-x-5'
                                                    : 'translate-x-0'
                                            }
        pointer-events-none inline-block h-[13px] w-[13px] rounded-full bg-stk-blue-500 shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                </div>
                                <span>{t('DATA_PERSISTENCE')}</span>
                            </div>
                            {getValues('persistenceEnabled') && (
                                <div className="flex w-full gap-x-3">
                                    <div className="mt-5 w-1/2">
                                        <Input
                                            label={t('MOUNT_VOLUME')}
                                            register={register}
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            name="mountVolume"
                                            placeholder="/path"
                                            onChange={(value) => {
                                                setValue('mountVolume', value);
                                            }}
                                        />
                                    </div>
                                    <div className="mt-5 w-1/2">
                                        <DrawerSelect
                                            menuPlacement="top"
                                            defaultValue={
                                                getValues()?.storageType
                                                    ? { label: getValues()?.storageType }
                                                    : { label: 'Standard IOPS' }
                                            }
                                            label={t('STORAGE_TYPE')}
                                            options={[
                                                { label: 'Standard IOPS' },
                                                { label: 'High IOPS' },
                                            ]}
                                            register={register}
                                            errors={errors}
                                            clearErrors={clearErrors}
                                            name="storageType"
                                            validation={{ required: t('FORM_ERROR_REQUIRED') }}
                                            onChange={(value: string) => {
                                                setValue('storageType', value);
                                                // handleUpdateForm('storageType', value);
                                                dispatch(setCalcDripRateFlag(true));
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <ResourceSummary />
                </div>
            </div>
        </div>
    );
};

export default Resources;
