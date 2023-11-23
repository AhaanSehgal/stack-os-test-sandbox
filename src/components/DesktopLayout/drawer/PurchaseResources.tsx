/* eslint-disable no-nested-ternary */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/redux/hooks';
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { Button } from '@/components/common';
import Resources from './steps/resources';
import Deploy from './steps/deploy';
import { steps } from './helpers';
import { setCurrentStep, setDeployEnabled, setStepIndex } from '@/redux/drawer/actions';

interface StepContents {
    resources: React.ReactElement;
    stack: React.ReactElement;
}

const DeployForm = () => {
    const { t } = useTranslation();
    const { drawer } = useSelector((state) => state);
    const { isConnected } = useAccount();

    const { currentStep, stepIndex, status } = drawer;
    const dispatch = useDispatch();

    const stepContent: StepContents = {
        resources: <Resources />,
        stack: <Deploy />,
    };

    const StepContent = stepContent[currentStep.name as keyof StepContents];

    function handleNextStepByButton() {
        if (currentStep.id <= 3) {
            dispatch(setStepIndex(stepIndex + 1));
        } else {
            dispatch(setDeployEnabled(true));
        }
    }

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const showReturnButton = () => {
        if (status === 'purchase-resources') {
            return currentStep.id === 4;
        }
        return currentStep.id > 1;
    };

    return (
        <>
            {StepContent}
            <div className="fixed bottom-0 flex h-[4.4rem] w-[inherit] items-center justify-center bg-stk-blue-200 px-6 shadow-[0px_0px_13px_rgba(255,255,255,0.1)]">
                <nav aria-label="Progress" className="flex w-full flex-row justify-between">
                    <div className="ml-auto flex flex-col items-center justify-center px-4">
                        {showReturnButton() && (
                            <span
                                className="text-sm font-medium text-stk-grey-300 hover:cursor-pointer"
                                onClick={() => dispatch(setCurrentStep(steps[currentStep.id - 2]))}
                            >
                                {t('DRAWER_STEP_BUTTON_SECONDARY')}
                            </span>
                        )}
                    </div>
                    <div data-tip="Connect to a wallet <br/> to deploy" data-for="deploy">
                        <Button
                            dataCy="drawer-button-next"
                            disabled={currentStep.id === 4 && !isConnected}
                            className="font-semibold"
                            onClick={() => handleNextStepByButton()}
                        >
                            {currentStep.id < 4
                                ? t('DRAWER_STEP_BUTTON_PRIMARY')
                                : t('DRAWER_STEP_BUTTON_CONFIRM')}
                        </Button>
                    </div>
                    {currentStep.id === 4 && !isConnected && (
                        <ReactTooltip
                            id="deploy"
                            multiline
                            place="right"
                            effect="solid"
                            backgroundColor="#DFDFDF"
                            textColor="#1F2937"
                            className="text-xs font-medium"
                        />
                    )}
                </nav>
            </div>
        </>
    );
};

export default DeployForm;
