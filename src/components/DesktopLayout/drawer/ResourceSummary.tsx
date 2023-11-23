import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BANDWIDTH, CPU, MEMMORY, STORAGE } from '@/utils/constants';

const ResourceSummary = () => {
  const { getValues } = useFormContext();

  return (
    <>
      <div className="space-y-4 w-full mt-4">
        <i className="fa fa-list  text-stk-green" aria-hidden="true" />{' '}
        <span>Resources Summary:</span>
      </div>
      {Number(getValues().cpuTypeCount) ? (
        <>
          <div className="my-2 py-3 flex w-full flex-row items-center justify-between text-base text-stk-white border-stk-white/20 border-b-[0.5px]">
            <div className="flex flex-row justify-start">
              <i className="fa-regular fa-microchip w-4 h-4 mr-1" />
              <span className="mx-1 text-sm">CPU</span>
            </div>
            <span className="text-sm">
              {getValues().cpuType === 'cpuStandard'
                ? Number(getValues().cpuTypeCount) * CPU.CPU_STANDARD
                : ''}
              {getValues().cpuType === 'cpuIntensive'
                ? Number(getValues().cpuTypeCount) * CPU.CPU_INTENSIVE
                : ''}
              {getValues().cpuType === 'gpuStandard'
                ? Number(getValues().cpuTypeCount) * CPU.GPU_STANDARD
                : ''}{' '}
              MCI
            </span>
          </div>
          <div className="my-2 py-3 flex w-full flex-row items-center justify-between text-base text-stk-white border-stk-white/20 border-b-[0.5px]">
            <div className="flex flex-row justify-start">
              <i className="fa-regular fa-sd-card w-4 h-4 mr-1" />
              <span className="mx-1 text-sm">Memory</span>
            </div>
            <span className="text-sm">
              {getValues().cpuType === 'cpuStandard'
                ? Number(getValues().cpuTypeCount) * MEMMORY.CPU_STANDARD
                : ''}
              {getValues().cpuType === 'cpuIntensive'
                ? Number(getValues().cpuTypeCount) * MEMMORY.CPU_INTENSIVE
                : ''}
              {getValues().cpuType === 'gpuStandard'
                ? Number(getValues().cpuTypeCount) * MEMMORY.GPU_STANDARD
                : ''}{' '}
              MB
            </span>
          </div>
        </>
      ) : null}
      {Number(getValues().bandwidth) ? (
        <div className="my-2 py-3 flex w-full flex-row items-center justify-between text-base text-stk-white border-stk-white/20 border-b-[0.5px]">
          <div className="flex flex-row justify-start">
            <i className="fa-regular fa-wifi w-4 h-4 mr-1" />
            <span className="mx-1 text-sm">Bandwidth</span>
          </div>
          <span className="text-sm">
            {getValues().bandwidth && Number(getValues().bandwidth) * BANDWIDTH} GB
          </span>
        </div>
      ) : null}
      {Number(getValues().storage) ? (
        <div className="my-2 py-3 flex w-full flex-row items-center justify-between text-base text-stk-white border-stk-white/20 border-b-[0.5px]">
          <div className="flex flex-row justify-start">
            <i className="fa-regular fa-box-archive w-4 h-4 mr-1" />
            <span className="mx-1 text-sm">Storage</span>
          </div>
          <span className="text-sm">
            {getValues().storage && Number(getValues().storage) * STORAGE} GB
          </span>
        </div>
      ) : null}
    </>
  );
};

export default ResourceSummary;
