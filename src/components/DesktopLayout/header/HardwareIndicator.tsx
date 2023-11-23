/* eslint-disable react/style-prop-object */
import React from 'react';
import { Progress, ProgressIndicator } from '@radix-ui/react-progress';
import ReactTooltip from 'react-tooltip';

interface Props {
  progressValue: number;
  iconName: keyof Icons;
  usedValue: any;
  totalValue: any;
  unity: string;
}

export interface Icons {
  bandwidth: React.ReactElement;
  cpu: React.ReactElement;
  memory: React.ReactElement;
  storage: React.ReactElement;
}

const HardwareIndicator = ({
  progressValue,
  iconName,
  usedValue,
  totalValue,
  unity,
  value,
  id,
}: Props) => {
  const icons: Icons = {
    bandwidth: <i className="fa-regular fa-wifi text-base text-stk-green" />,
    cpu: <i className="fa-regular fa-microchip text-base text-stk-green" />,
    memory: <i className="fa-regular fa-sd-card text-base text-stk-green" />,
    storage: <i className="fa-regular fa-box-archive text-base text-stk-green" />,
  };

  const icon = icons[iconName];

  return (
    <div
      data-tip={id}
      data-for="code"
      className="mx-2 flex w-[4.7rem] flex-col items-center justify-center md:flex-row"
    >
      {/* <Progress
        value={progressValue || 0}
        className="relative hidden h-1 w-9 -rotate-90 overflow-hidden rounded-full bg-stk-grey-500 duration-500 md:block"
      >
        <ProgressIndicator
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
          className="h-full w-full bg-stk-green duration-500"
        />
      </Progress> */}

      <div className="hidden items-center justify-center font-light text-stk-green md:flex md:flex-col">
        {icon}
        <p className="ml-1 text-sm font-extralight">
          {value || 0} {unity}
        </p>
      </div>
      {/* <p className="" data-tip={unity} data-for="code">
        {unity}
      </p> */}
      <ReactTooltip
        id="code"
        place="top"
        effect="solid"
        backgroundColor="#DFDFDF"
        textColor="#1F2937"
        className="text-xs font-medium"
      />
    </div>
  );
};

export default HardwareIndicator;
