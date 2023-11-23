/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Icon from '@/components/common/Icon';
import {
    fileResourceOptions as _fileResourceOptions,
    fileSubnetList,
    fileSubnetServices,
} from './helpers';
import { RESTYPE_ID_TO_NAME_MAP } from '@/utils/constants';

const FileResources = () => {
    const {
        register,
        clearErrors,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useFormContext();

    const [fileResourceOptions, setFileResourceOptions] = useState({});
    const [selectedResType, setSelectedResType] = useState<{ [id: string]: string }>({});

    useEffect(() => {
        const filteredFileResourceOptions: { [subnetName: string]: any } = {};

        const selectedFileSubnets = fileSubnetList.filter(
            (subnet) => getValues().subnetReplicaMap[subnet.subnetID]
        );

        for (let i = 0; i < selectedFileSubnets.length; i++) {
            const fileSubnet = selectedFileSubnets[i];

            filteredFileResourceOptions[
                fileSubnet.subnetName as keyof typeof filteredFileResourceOptions
            ] = _fileResourceOptions.filter((opt) =>
                fileSubnetServices[
                    fileSubnet.subnetName as keyof typeof fileSubnetServices
                ].includes(opt.icon)
            );
        }

        // TODO : make subnetName dynamic
        handleResTypeSelect('matrix', 5);

        setFileResourceOptions(filteredFileResourceOptions);
    }, []);

    const handleResTypeSelect = (fileSubnetName: string, resTypeId: number) => {
        setSelectedResType({
            ...selectedResType,
            [findSubnetId(fileSubnetName) || '']: RESTYPE_ID_TO_NAME_MAP[resTypeId],
        });
        setValue('fileResourceType', {
            ...selectedResType,
            [findSubnetId(fileSubnetName) || '']: RESTYPE_ID_TO_NAME_MAP[resTypeId],
        });
    };

    const findSubnetId = (fileSubnetName: string) => {
        const res = fileSubnetList.find(
            (fileSubnet) => fileSubnet.subnetName === fileSubnetName
        )?.subnetID;
        return res;
    };

    return (
        <div className="scrollbar flex h-full flex-col overflow-auto">
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                <i className="fa-solid fa-cloud-check mr-2 h-5 w-5 text-stk-green" />
                <span>Resource Usage</span>
            </div>
            <div className="scrollbar mb-[4.5rem] mr-3 h-0 flex-1 overflow-y-auto pb-5">
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    <p className="mt-3 mb-4 text-sm">
                        Select storage service for selected subnets.
                    </p>
                    <div className="mt-4 grid gap-4 w-full">
                        <div className="mt-2">
                            {Object.entries(fileResourceOptions).map(
                                ([fileSubnetName, options]) => (
                                    <div key={fileSubnetName} className="mb-5">
                                        <h4 className="mb-5 border-stk-white/20 border-b-[0.5px]">
                                            {fileSubnetName}
                                        </h4>
                                        <div className="flex flex-wrap gap-5">
                                            {options.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className={`flex flex-col gap-2 items-center p-3 rounded-md duration-300 
                        ${
                            selectedResType[findSubnetId(fileSubnetName) || ''] !==
                            RESTYPE_ID_TO_NAME_MAP[option.resTypeId]
                                ? 'opacity-80'
                                : 'border border-solid border-stk-green'
                            // hover:cursor-pointer hover:border-[0.5px]
                        }
                         `}
                                                    // onClick={() => handleResTypeSelect(fileSubnetName, option.resTypeId)}
                                                >
                                                    <Icon
                                                        className="flex items-center"
                                                        iconName={option.icon}
                                                        width={100}
                                                    />
                                                    <p className="text-xs text-stk-grey-400">
                                                        {option.name}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileResources;
