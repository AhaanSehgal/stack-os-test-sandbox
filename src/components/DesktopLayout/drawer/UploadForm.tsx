import React from 'react';
import { useSelector } from 'src/redux/hooks';
import FileInfo from './fileUploadSteps/FileInfo';
import FileResources from './fileUploadSteps/FileResources';
import FileSubnetSelection from './fileUploadSteps/FileSubnetSelection';
import { fileUploadSteps } from './helpers';
import BalanceToAdd from './steps/BalanceToAdd';
import SubnetSelection from './steps/SubnetSelection';

interface StepContents {
    'file-info': React.ReactElement;
    'file-resources': React.ReactElement;
    'file-subnet-selection': React.ReactElement;
    'balance-to-add': React.ReactElement;
}

const fileSubnetList = [
    {
        subnetName: 'matrix',
        subnetID: '1',
    },
];

const UploadForm = () => {
    const { drawer } = useSelector((state) => state);

    const { stepIndex } = drawer;

    const stepContent: StepContents = {
        'file-info': <FileInfo />,
        'file-resources': <FileResources />,
        'file-subnet-selection': <SubnetSelection selectionSubnetList={fileSubnetList} />,
        'balance-to-add': <BalanceToAdd />,
    };

    const StepContent =
        stepContent[
            fileUploadSteps[Math.min(stepIndex, fileUploadSteps.length - 1)]
                .name as keyof StepContents
        ];

    return <div className="scrollbar overflow-auto">{StepContent}</div>;
};

export default UploadForm;
