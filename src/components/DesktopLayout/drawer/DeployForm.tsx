/* eslint-disable no-nested-ternary */
import { useSelector } from 'src/redux/hooks';
import React from 'react';
import BasicInfo from './steps/BasicInfo';
import ContainerImage from './steps/ContainerImage';
import Resources from './steps/resources';
import SubnetSelection from './steps/SubnetSelection';
import ModAttributeCreator from './steps/ModAttributeCreator';
import BalanceToAdd from './steps/BalanceToAdd';
import { steps } from './helpers';

interface StepContents {
    'basic-info': React.ReactElement;
    'container-image': React.ReactElement;
    resources: React.ReactElement;
    'subnet-selection': React.ReactElement;
    'attrib-var': React.ReactElement;
    //   'mod-attribute-creator': React.ReactElement;
    'balance-to-add': React.ReactElement;
    // stack: React.ReactElement;
}

const DeployForm = () => {
    const { drawer } = useSelector((state) => state);

    const { stepIndex } = drawer;

    const dockerSubnetList = [
        {
            subnetName: 'marvel',
            subnetID: '0',
        },
    ];

    const stepContent: StepContents = {
        'basic-info': <BasicInfo />,
        'container-image': <ContainerImage />,
        resources: <Resources />,
        'subnet-selection': <SubnetSelection selectionSubnetList={dockerSubnetList} />,
        'attrib-var': <ModAttributeCreator />,
        // 'mod-attribute-creator': <ModAttributeCreator />,
        'balance-to-add': <BalanceToAdd />,
        // stack: <Deploy />,
    };

    const StepContent =
        stepContent[steps[Math.min(stepIndex, steps.length - 1)].name as keyof StepContents];

    return <div className="scrollbar overflow-auto">{StepContent}</div>;
};

export default DeployForm;
