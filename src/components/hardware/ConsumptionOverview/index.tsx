import { Progress, ProgressIndicator } from '@radix-ui/react-progress';
import { Separator } from '@radix-ui/react-separator';
// import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Icon, Select } from '@/components/common';
import { hardwareList, consumptionOptions } from '../helpers';
// import { Hardware } from '@/redux/hardware/types';
import { useSelector } from '@/redux/hooks';
// import { setHardwareSelected } from '@/redux/hardware/actions';
import HardwareChart from './HardwareChart';
import SkeletonConsumptionOverview from '../skeletons/SkeletonConsumptionOverview';
import SkeletonMobileConsumptionOverview from '../skeletons/SkeletonMobileConsumptionOverview';

const ConsumptionOverview = () => {
    const { hardware, general } = useSelector((state) => state);
    const { hardwareSelected } = hardware;
    const { isMobile } = general;
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // function getResourceConsumption(item: Hardware) {
    //   const { resourceUsage, resourceLimit } = item;
    //   const usage = resourceUsage >= 10 ** 3 ? resourceUsage / 10 ** 3 : resourceUsage;
    //   const limit = resourceLimit >= 10 ** 3 ? resourceLimit / 10 ** 3 : resourceLimit;
    //   let measure = resourceLimit >= 10 ** 3 ? 'GB' : 'MB';

    //   if (item.id === 1) measure = 'MCI';

    //   return `${usage}/${limit} ${measure}`;
    // }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="flex h-[calc(100vh_-_3.5rem)] w-full flex-col justify-start md:mt-6 md:h-full">
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? (
                isMobile ? (
                    <SkeletonMobileConsumptionOverview />
                ) : (
                    <SkeletonConsumptionOverview />
                )
            ) : (
                <>
                    <div className="hidden flex-row items-center justify-between md:flex">
                        <h2 className="text-2xl font-semibold text-stk-white">
                            Consumption overview
                        </h2>
                        <Select
                            className="w-[15rem] rounded-md border-[1px] border-stk-blue-100 py-2 px-4 text-stk-white"
                            options={consumptionOptions}
                        />
                    </div>
                    <div className="mt-7 rounded-xl bg-stk-blue-300">
                        <div className="flex flex-row flex-wrap divide-stk-blue-100 md:divide-x">
                            {hardwareList.map((item) => (
                                <div
                                    key={item.id}
                                    className={`${
                                        isMobile &&
                                        'border-stk-blue-100 first:border-b last:border-t odd:border-r'
                                    } flex flex-[0_0_50%] flex-col justify-start p-6 text-stk-grey-200 duration-300 hover:cursor-pointer hover:bg-stk-blue-200 md:flex-1 md:text-stk-grey-400`}
                                    // style={{
                                    //   background:
                                    //     hardwareSelected.id === item.id
                                    //       ? 'linear-gradient(180deg, rgba(217, 215, 215, 0) 48.96%, rgba(255, 255, 255, 0.26) 100%)'
                                    //       : '',
                                    // }}
                                    // onClick={() => dispatch(setHardwareSelected(item))}
                                >
                                    <span className="text-xs font-semibold md:text-2xl md:font-normal">
                                        {item.label}
                                    </span>
                                    <span className="text-[0.625rem] font-semibold md:text-base md:font-normal">
                                        {/* {getResourceConsumption(item)} */}
                                    </span>
                                    <Progress
                                        // value={(item.resourceUsage / item.resourceLimit) * 100}
                                        className="relative mt-4 h-[0.375rem] overflow-hidden rounded-full bg-stk-blue-100 duration-500 md:h-3 md:w-[85%]"
                                    >
                                        <ProgressIndicator
                                            // style={{
                                            //   transform: `translateX(-${
                                            //     100 - (item.resourceUsage / item.resourceLimit) * 100
                                            //   }%)`,
                                            // }}
                                            className="h-full w-full bg-stk-green duration-500"
                                        />
                                    </Progress>
                                </div>
                            ))}
                        </div>
                        <div className="hidden flex-row border-t border-stk-blue-100 md:flex">
                            <div className="w-[70%] border-r border-stk-blue-100 px-7 pt-9 pb-6">
                                <div className="flex w-[95%] flex-row items-center justify-between">
                                    <div className="flex flex-col justify-start">
                                        <span className="text-2xl text-stk-white">{`${hardwareSelected.label} Consumption`}</span>
                                        <span className="text-stk-grey-400">
                                            Showing last 30 days
                                        </span>
                                        <span className="text-sm text-stk-grey-500">
                                            As of May 19 2022, 10:09 PM
                                        </span>
                                    </div>
                                    <div className="flex flex-row gap-5 text-stk-grey-400">
                                        <div className="flex flex-row items-center gap-2">
                                            <Separator className="h-[0.125rem] w-8 bg-stk-white" />
                                            <span>Available</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <Separator className="h-[0.125rem] w-8 bg-stk-green" />
                                            <span className="w-full text-ellipsis">App X</span>
                                        </div>
                                    </div>
                                </div>
                                <HardwareChart className="mt-10" />
                            </div>
                            <div className="flex w-[30%] flex-col divide-y divide-stk-blue-100">
                                <div className="flex flex-col items-center justify-center p-7">
                                    <span className="text-lg font-semibold text-stk-white">
                                        Available
                                    </span>
                                    <span className="text-2xl font-bold text-stk-grey-400">
                                        {hardwareSelected.resourceLimit}
                                        {hardwareSelected.id === 1 ? ' MCI' : ' MB'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-7">
                                    <span className="text-lg font-semibold text-stk-white">
                                        Used
                                    </span>
                                    <span className="text-2xl font-bold text-stk-green">
                                        {hardwareSelected.resourceUsage}
                                        {hardwareSelected.id === 1 ? ' MCI' : ' MB'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-7">
                                    <span className="text-lg font-semibold text-stk-white">
                                        Free
                                    </span>
                                    <span className="text-2xl font-bold text-stk-grey-400">
                                        {/* {hardwareSelected.resourceLimit - hardwareSelected.resourceUsage} */}
                                        {hardwareSelected.id === 1 ? ' MCI' : ' MB'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-7">
                                    <span className="text-lg font-semibold text-stk-white">
                                        Current Monthly Cost
                                    </span>
                                    <div className="flex flex-row items-center">
                                        <span className="text-lg font-bold text-stk-grey-400">
                                            16.312
                                        </span>
                                        <Icon
                                            iconName="stack-inverted"
                                            width={16}
                                            height={16}
                                            className="mx-2 leading-3"
                                            layout="fixed"
                                        />
                                        <span className="text-lg text-stk-grey-400">STACK</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center p-7">
                                    <span className="text-lg font-semibold text-stk-white">
                                        Last Upgrade
                                    </span>
                                    <span className="text-2xl font-bold text-stk-grey-400">
                                        May 05
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <HardwareChart className="mt-10 md:hidden" />
                </>
            )}
        </div>
    );
};

export default ConsumptionOverview;
