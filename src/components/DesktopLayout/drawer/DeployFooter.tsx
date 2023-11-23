/* eslint-disable no-nested-ternary */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/redux/hooks';
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Button, Icon } from '@/components/common';
import { steps, fileUploadSteps } from './helpers';
import {
    setActiveSideStep,
    setCurrentStep,
    setDeployEnabled,
    setStepIndex,
} from '@/redux/drawer/actions';
import { Step } from '@/redux/drawer/types';
import { isDeployAndUpdateDisabled } from '@/utils/utils';

interface Props {
    handleNextStepByButton: any;
}

const DeployFooter = ({ handleNextStepByButton }: Props) => {
    const { t } = useTranslation();
    const {
        appStore,
        general,
        drawer,
        // swap
    } = useSelector((state) => state);
    const { isConnected } = useAccount();

    // const { selectedApp } = appStore;
    // const { swapSuccess } = swap;
    const { selectedNft, nftRole } = general;
    const { selectedAppConfig } = appStore;

    const { currentStep, stepIndex, status, activeSideStep, portValues, deployEnabled } = drawer;
    const dispatch = useDispatch();
    const [activeSteps, setActiveSteps] = useState(
        status === 'deploy-form' ? steps : fileUploadSteps
    );

    // const { getStackPrice } = useStackosUpgrade();

    const getStepIcon: any = {
        list: 'fa-list-ul',
        server: 'fa-server',
        'cloud-check': 'fa-cloud-check',
        'subnet-selection': 'fa-circle-nodes',
    };

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    function handleNextStepByButton1() {
        const stepObj = steps[stepIndex + 1];
        // dispatch(setStepIndex(stepIndex + 1));
        // if (status === 'deploy-app') {
        //   if (activeSideStep === 1 && currentStep.id < 4) {
        //     dispatch(setStepIndex(stepIndex + 4));
        //   } else if (currentStep.id === 3) {
        //     dispatch(setActiveSideStep(1));
        //     dispatch(setCurrentStep(steps[3]));
        //   }
        // //   else if (currentStep.id === 4) {
        // //     dispatch(setActiveSideStep(1));
        // //     dispatch(setCurrentStep(steps[4]));
        // //   }
        //   else if (currentStep.id === 4) {
        //     dispatch(setActiveSideStep(1));
        //     dispatch(setCurrentStep(steps[5]));
        //     selectedAppConfig?.forEach((app: any) =>
        //       deployAppStore(app).then((success) => {
        //         // calls += 1;
        //         // if (!success) {
        //         //   dispatch(setIsError(true));
        //         //   dispatch(setDrawerStatus('deploy-app'));
        //         //   deployStatus = 'error';
        //         //   setLoading(false);
        //         // }
        //         // if (calls === selectedAppConfig?.length && deployStatus !== 'error') {
        //         //   dispatch(setDrawerStatus('deploy-success'));
        //         //   setLoading(false);
        //         //   router.push('/deploy');
        //         // }
        //       })
        //     );
        //   } else if (currentStep.id === 5) {
        //     dispatch(setDeployEnabled(true));
        //     deployApp();
        //   } else {
        //     dispatch(setStepIndex(stepIndex + 1));
        //   }
        // } else if (currentStep.id < steps.length + 1) {
        //     console.log("currentSTep.id: ", stepIndex, currentStep);
        //   const isThereBlankContainerPorts = portValues.find((item) => !item.containerPort);
        //   const isThereBlankServicePorts = portValues.find((item) => !item.port);
        //   if (!isThereBlankContainerPorts && !isThereBlankServicePorts) {
        //     dispatch(setStepIndex(stepIndex + 1));
        //   }
        // } else {
        //   deployApp();
        // }
    }

    function handlePreviousStepByButton() {
        if (status === 'deploy-app' && activeSideStep === 1) {
            dispatch(setCurrentStep(activeSteps[0]));
        } else {
            dispatch(setStepIndex(stepIndex - 1));
            dispatch(setCurrentStep(activeSteps[stepIndex - 1]));
            // const prevStep = steps.find((step) => st)
            // dispatch(setCurrentStep(s))
        }
    }

    //   function handleSetStepByMenu(stepId: number) {
    //     if (currentStep.id <= 4 && stepId > currentStep.id) {
    //       dispatch(setStepIndex(stepId));
    //     } else {
    //       dispatch(setStepIndex(stepId));
    //       dispatch(setCurrentStep(activeSteps.find((step) => step.id === stepId) as Step));
    //     }
    //   }

    useEffect(() => {
        if (status === 'deploy-app') {
            if (activeSideStep === 1) {
                const { 0: first, length, [length - 1]: last } = activeSteps;
                setActiveSteps([first, last]);
            } else setActiveSteps(steps.slice(0, -1));
        }
    }, [activeSideStep]);

    return (
        <div className="fixed bottom-0 flex h-[4.4rem] w-[inherit] items-center justify-center bg-stk-blue-200 px-6 shadow-[0px_0px_13px_rgba(255,255,255,0.1)]">
            <nav
                aria-label="Progress"
                className={`flex w-full flex-row justify-between ${
                    status === 'deploy-app' ? ' pl-[3.2rem]' : ''
                }`}
            >
                <div className="flex flex-col items-center justify-center px-4">
                    {stepIndex > 0 && (
                        <span
                            className="text-sm font-medium text-stk-grey-300 hover:cursor-pointer"
                            onClick={() => handlePreviousStepByButton()}
                        >
                            {t('DRAWER_STEP_BUTTON_SECONDARY')}
                        </span>
                    )}
                </div>
                <div data-tip="Connect to a wallet <br/> to deploy" data-for="deploy">
                    <Button
                        dataCy="drawer-button-next"
                        disabled={
                            (stepIndex === activeSteps.length - 1 &&
                                (!isConnected || !selectedNft)) ||
                            (stepIndex === activeSteps.length - 1 && !deployEnabled)
                            //   isDeployAndUpdateDisabled(nftRole)
                        }
                        className="font-semibold"
                        onClick={() => handleNextStepByButton()}
                    >
                        {
                            // (status === 'deploy-app' && currentStep.id > 2) ||
                            stepIndex === activeSteps.length - 1
                                ? t('DRAWER_STEP_BUTTON_DEPLOY')
                                : t('DRAWER_STEP_BUTTON_PRIMARY')
                        }
                    </Button>
                </div>
                {/* {currentStep.id === 5 && !isConnected && (
          <ReactTooltip
            id="deploy"
            multiline
            place="right"
            effect="solid"
            backgroundColor="#DFDFDF"
            textColor="#1F2937"
            className="text-xs font-medium"
          />
        )} */}
            </nav>
        </div>
    );
};

export default DeployFooter;
