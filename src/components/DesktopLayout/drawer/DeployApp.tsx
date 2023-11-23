/* eslint-disable no-nested-ternary */
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Input } from '@/components/common';
import {
    setActiveSideStep,
    setCurrentStep,
    setFormValues,
    setIsError,
} from '@/redux/drawer/actions';
import Deploy from './steps/deploy';
import { useSelector } from '@/redux/hooks';
import { FormValues, Step } from '@/redux/drawer/types';
import DeployForm from './DeployForm';
import { steps } from './helpers';
import { setSelectedAppConfig } from '@/redux/app-store/actions';

const DeployApp = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { appStore, drawer, deploy } = useSelector((state) => state);
    const { currentStep, activeSideStep, stepIndex, isError } = drawer;
    const { apps, selectedApp, selectedAppConfig } = appStore;
    const { deployedApps } = deploy;
    const [sideSteps, setSideSteps] = useState<Step[]>([
        { id: 1, name: 'main', icon: 'rocket', title: 'Deploy' },
    ]);
    const [mainInfo, setMainInfo] = useState({
        hostUrl: '',
        appName: '',
    });

    const {
        register,
        clearErrors,
        handleSubmit,
        setValue,
        setError,
        getValues,
        formState: { errors },
    } = useForm<FormValues>();

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    useEffect(() => {
        if (isError && selectedAppConfig) {
            setValue('appName', selectedAppConfig[0].appName);
            setValue('hostUrl', selectedAppConfig[0].hostUrl);
            setMainInfo({
                appName: selectedAppConfig[0].appName,
                hostUrl: selectedAppConfig[0].hostUrl,
            });

            const extraSteps = selectedAppConfig?.map((app, index) => ({
                id: index + 2,
                name: app.appName,
                icon: 'cog',
                title: app.appName,
            }));

            setSideSteps([{ id: 1, name: 'main', icon: 'rocket', title: 'Deploy' }, ...extraSteps]);
            dispatch(setIsError(false));
        } else if (apps && selectedApp) {
            const appConfig = apps.find((app) => app.appName === selectedApp);
            const necessaryAppsConfig: any[] = [];

            if (appConfig) {
                appConfig.necessaryApps?.forEach((stepConfig: any) => {
                    const {
                        image,
                        containerPort,
                        servicePort,
                        envVariables,
                        args,
                        commands,
                        resourceLimits,
                        storageSize,
                        appName,
                    } = stepConfig;
                    let envVariablesEnabled = false;
                    let env = '';
                    let argsEnabled = false;
                    let argsValue = '';
                    let commandsEnabled = false;
                    let commandsValue = '';

                    if (envVariables?.length) {
                        envVariablesEnabled = true;
                        envVariables.forEach((item: any) => {
                            env += `${item.name} = ${item.value}\n`;
                        });
                        while (env.indexOf('\n\n') >= 0) {
                            env = env.replace(/\n\n/g, '\n');
                        }
                        env = env.replace(/\n$/, '');
                    }
                    if (args?.length) {
                        argsEnabled = true;
                        args.forEach((value: any) => {
                            argsValue += `${value}\n`;
                        });
                        while (argsValue.indexOf('\n\n') >= 0) {
                            argsValue = argsValue.replace(/\n\n/g, '\n');
                        }
                        argsValue = argsValue.replace(/\n$/, '');
                    }
                    if (commands?.length) {
                        commandsEnabled = true;
                        commands.forEach((value: any) => {
                            commandsValue += `${value.trim()}\n`;
                        });
                        while (commandsValue.indexOf('\n\n') >= 0) {
                            commandsValue = commandsValue.replace(/\n\n/g, '\n');
                        }
                        commandsValue = commandsValue.replace(/\n$/, '');
                        commandsValue = commandsValue.trim();
                    }

                    let { cpu, memory } = resourceLimits;
                    cpu = parseFloat(cpu);
                    memory = parseFloat(memory);
                    const storage = storageSize
                        ? parseFloat(storageSize.toString()).toString()
                        : '0';

                    necessaryAppsConfig.push({
                        ...stepConfig,
                        appName,
                        imageName: image.repository,
                        tag: image.tag,
                        containerPort,
                        servicePort,
                        envVariablesEnabled,
                        envVariables: env,
                        argsEnabled,
                        args: argsValue,
                        commandsEnabled,
                        commands: commandsValue,
                        cpu,
                        memory,
                        storage,
                    });
                });

                dispatch(setSelectedAppConfig(necessaryAppsConfig));

                setValue('appName', appConfig.appName);
                setValue('hostUrl', appConfig.hostUrl);
                setMainInfo({
                    appName: appConfig.appName,
                    hostUrl: appConfig.hostUrl,
                });

                const extraSteps = necessaryAppsConfig?.map((app, index) => ({
                    id: index + 2,
                    name: app.appName,
                    icon: 'cog',
                    title: app.appName,
                }));

                setSideSteps([
                    { id: 1, name: 'main', icon: 'rocket', title: 'Deploy' },
                    ...extraSteps,
                ]);
            }
        }
    }, [selectedApp]);

    const getStepIcon: any = {
        rocket: 'fa-rocket',
        cog: 'fa-gear',
    };

    const onSubmit = (data: FormValues, stepId?: number) => {
        const updatedAppConfig =
            selectedAppConfig &&
            selectedAppConfig.map((app) => {
                const appName = app?.appName?.replace(mainInfo.appName, data.appName);

                return {
                    ...app,
                    appName,
                    hostUrl: data.hostUrl,
                };
            });

        if (updatedAppConfig) {
            dispatch(setSelectedAppConfig(updatedAppConfig));
            const extraSteps = updatedAppConfig.map((app, index) => ({
                id: index + 2,
                name: app.appName,
                icon: 'cog',
                title: app.appName,
            }));

            setSideSteps([{ id: 1, name: 'main', icon: 'rocket', title: 'Deploy' }, ...extraSteps]);
        }

        setMainInfo({
            appName: data.appName || '',
            hostUrl: data.hostUrl || '',
        });

        if (stepId) {
            if (stepId !== 1) {
                if (updatedAppConfig) {
                    const stepConfig = updatedAppConfig && updatedAppConfig[stepId - 2];

                    if (stepConfig) {
                        dispatch(setFormValues(stepConfig));
                        dispatch(setCurrentStep(steps[0]));
                    }
                }
            } else {
                dispatch(setCurrentStep(steps[0]));
            }
            dispatch(setActiveSideStep(stepId));
        } else {
            dispatch(setActiveSideStep(1));
            dispatch(setCurrentStep(steps[3]));
        }
    };

    function onClickSideStep(stepId: number) {
        if (!hasDuplicateAppName()) handleSubmit((data) => onSubmit(data, stepId))();
    }

    useEffect(() => {
        if (activeSideStep === 1 && stepIndex >= 2) {
            if (!hasDuplicateAppName()) handleSubmit((data) => onSubmit(data))();
        }
    }, [stepIndex]);

    function hasDuplicateAppName() {
        if (
            deployedApps &&
            deployedApps?.find(
                (app) => app.status === 'DEPLOYED' && app.label === getValues('appName')
            )
        ) {
            setError('appName', {
                type: 'required',
                message: 'Name already in use',
            });
            return true;
        }

        return false;
    }

    return (
        <div className="flex h-full w-full flex-row">
            <div className="z-50">
                <div className="h-screen bg-stk-blue-500">
                    {sideSteps.map((step) => (
                        <div
                            key={step.id}
                            className={`flex h-[3.6rem] w-[3.2rem] items-center justify-center duration-500 hover:cursor-pointer hover:bg-stk-blue-300 ${
                                step.id === activeSideStep
                                    ? 'bg-stk-blue-100 text-stk-green'
                                    : 'text-stk-grey-500'
                            }`}
                            data-tip={step.title}
                            data-for="drawer-menus"
                            onClick={() => onClickSideStep(step.id)}
                        >
                            {step.id > 1 && (
                                <div
                                    className={`${
                                        step.id === activeSideStep
                                            ? 'bg-stk-white'
                                            : 'bg-stk-grey-400'
                                    } absolute mb-4 ml-4 h-[0.7rem] w-[0.7rem] rounded-full duration-300`}
                                >
                                    <div className="relative flex h-full items-center justify-center">
                                        <span className="text-[0.42rem] font-bold text-stk-blue-400">
                                            {step.id - 1}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <i className={`fa-solid ${getStepIcon[step.icon]} text-xl`} />
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
            <div className="scrollbar flex h-full w-full flex-col overflow-auto">
                {activeSideStep === 1 ? (
                    <div>
                        {currentStep.id === 1 ? (
                            <div className="flex h-full flex-col">
                                <div className="px-6 pt-10">
                                    <form className="flex h-full w-full flex-col justify-start gap-7">
                                        <div className="flex shrink-0 items-center text-xl font-bold text-stk-green">
                                            <span>
                                                {apps?.find((app) => app.appName === selectedApp)
                                                    ?.title || selectedApp}
                                            </span>
                                        </div>

                                        <div className="w-full text-stk-white">
                                            <Input
                                                dataCy="drawer-basic-info-name"
                                                label={t('DRAWER_STEP1_INPUT2_LABEL')}
                                                register={register}
                                                errors={errors}
                                                validation={{
                                                    required: true,
                                                    maxLength: 10,
                                                    lowerCase: true,
                                                }}
                                                clearErrors={clearErrors}
                                                name="appName"
                                                value={getValues().appName}
                                                placeholder={t('DRAWER_STEP1_INPUT2_PLACEHOLDER')}
                                                onChange={(value) => {
                                                    const letters = /^[a-zA-Z0-9]+$/;
                                                    if (letters.test(value) && selectedAppConfig) {
                                                        setValue('appName', value);
                                                        setValue(
                                                            'hostUrl',
                                                            mainInfo.hostUrl.replace(
                                                                mainInfo.hostUrl.split('-')[0],
                                                                value
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="w-full text-stk-white">
                                            <div className="flex flex-col w-full gap-1">
                                                <div className="w-full">
                                                    <Input
                                                        label={t('DRAWER_STEP2_INPUT4_LABEL')}
                                                        register={register}
                                                        errors={errors}
                                                        clearErrors={clearErrors}
                                                        name="hostUrl"
                                                        placeholder={t(
                                                            'DRAWER_STEP2_INPUT4_PLACEHOLDER'
                                                        )}
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
                                            {/* {isHostUrlChanged && (
                        <div className="mt-3">
                          <Button
                            onClick={() => {
                              handleSubmit(onSubmit, onError);
                              verifyHostUrl(getValues().hostUrl);
                            }}
                          >
                            Verify
                          </Button>
                        </div>
                      )} */}
                                            {/* /> */}
                                        </div>
                                        <span className="text-sm font-medium text-stk-grey-400">
                                            The following apps will be deployed
                                        </span>
                                        <div className="flex h-full flex-col justify-start">
                                            {sideSteps?.map((step) => (
                                                <div
                                                    key={step.id}
                                                    className="flex flex-row items-center justify-start gap-2 text-stk-green first:hidden"
                                                >
                                                    <div className="mr-2 h-1 w-1 rounded-full bg-stk-green p-1" />
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => onClickSideStep(step.id)}
                                                    >
                                                        {step.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <Deploy />
                        )}
                    </div>
                ) : (
                    <DeployForm />
                )}
            </div>
        </div>
    );
};

export default DeployApp;
