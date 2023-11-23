import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BN } from 'bn.js';
import { useAccount } from 'wagmi';
import { useSelector } from '@/redux/hooks';
import SkeletonMobileConsumptionOverview from './skeletons/SkeletonMobileConsumptionOverview';
import SkeletonAllocationHistory from './skeletons/SkeletonAllocationHistory';
import { Icons } from '../DesktopLayout/header/HardwareIndicator';
import showToast from '@/utils/showToast';
import { BANDWIDTH, CPU, MEMMORY, STORAGE } from '@/utils/constants';

const ResourcesOverview = () => {
    const { t } = useTranslation();
    const { address } = useAccount();
    const { general, deploy } = useSelector((state) => state);
    const { loading, deployedApps } = deploy;
    const { isMobile, selectedNft, appCrypto } = general;
    const [hardware, setHardware] = useState([]);
    const [balanceOf, setBalanceOf] = useState();
    const [subscriptionTotalBalance, setSubscriptionTotalBalance] = useState();

    const balanceCalculation = async () => {
        if (!appCrypto) return;
        const requestList = [
            appCrypto.contractService.SubscriptionBalance.totalPrevBalance(selectedNft),
            appCrypto.contractService.XCT.balanceOf(address),
        ];

        let [subscriptionBalance, xctBalance] = await Promise.all(requestList);

        subscriptionBalance = new BN(subscriptionBalance).div(new BN((10 ** 16).toString()));
        subscriptionBalance = subscriptionBalance.toNumber();
        subscriptionBalance = subscriptionBalance / 100;

        setSubscriptionTotalBalance(subscriptionBalance);

        xctBalance = new BN(xctBalance).div(new BN((10 ** 16).toString()));
        xctBalance = xctBalance.toNumber();
        xctBalance = xctBalance / 100;
        setBalanceOf(xctBalance);
    };

    useEffect(() => {
        (async () => {
            if (!selectedNft) return;

            try {
                await balanceCalculation();
            } catch (error: any) {
                console.error('Error while calculating balance: ', error);

                showToast(error, error.message);
            }
        })();
    }, [selectedNft]);

    useEffect(() => {
        (async () => {
            let resource: number[][] = [];
            selectedNft &&
                deployedApps &&
                deployedApps.forEach((obj: any) => {
                    resource.push(obj.resourceArray);
                });

            const resourceLength = 5;
            let sum = new Array(resourceLength).fill(0);
            for (let i = 0; i < resourceLength; i++) {
                for (let j = 0; j < resource.length; j++) {
                    if (resource[j].length < i + 1) {
                        continue;
                    }
                    sum[i] += resource[j][i];
                }
            }

            const cpu =
                sum[0] * CPU.CPU_STANDARD + sum[1] * CPU.CPU_INTENSIVE + sum[2] * CPU.GPU_STANDARD;

            const memmory =
                sum[0] * MEMMORY.CPU_STANDARD +
                sum[1] * MEMMORY.CPU_INTENSIVE +
                sum[2] * MEMMORY.GPU_STANDARD;

            const bandwidth = sum[3] * BANDWIDTH;
            const storage = sum[4] * STORAGE;

            const hardware = [
                {
                    id: 'cpu',
                    unity: 'MCI',
                    hardwareId: 1,
                    label: 'ALLOCATION_CPU',
                    iconName: 'cpu' as keyof Icons,
                    value: cpu,
                },
                {
                    id: 'memory',
                    unity: 'MB',
                    hardwareId: 3,
                    label: 'ALLOCATION_MEMORY',
                    iconName: 'memory' as keyof Icons,
                    value: memmory,
                },
                {
                    id: 'storage',
                    unity: 'GB',
                    hardwareId: 4,
                    label: 'ALLOCATION_STORAGE',
                    iconName: 'storage' as keyof Icons,
                    value: storage,
                },
                {
                    id: 'bandwidth',
                    unity: 'GB',
                    hardwareId: 2,
                    label: 'ALLOCATION_BANDWIDTH',
                    iconName: 'bandwidth' as keyof Icons,
                    value: bandwidth,
                },
            ];

            //   setHardware(hardware);
        })();
    }, [selectedNft, deployedApps]);

    return (
        <div className="flex w-full flex-col justify-start md:mt-6 md:h-full">
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? (
                isMobile ? (
                    <SkeletonMobileConsumptionOverview />
                ) : (
                    <SkeletonAllocationHistory />
                )
            ) : (
                <>
                    <div className="hidden flex-row items-center justify-between md:flex">
                        <h2 className="text-2xl font-semibold text-stk-white">
                            {t('HARDWARE_RESOURCES_OVERVIEW_TITLE')}
                        </h2>
                    </div>
                    <div className="mt-7 rounded-xl bg-stk-blue-300">
                        <div className="flex flex-row flex-wrap divide-stk-blue-100 md:divide-x">
                            {hardware.length !== 0 &&
                                hardware.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`${
                                            isMobile &&
                                            'border-stk-blue-100 first:border-b last:border-t odd:border-r'
                                        } flex flex-[0_0_50%] flex-col justify-start p-6 text-stk-grey-200 duration-300 md:flex-1 md:text-stk-grey-400`}
                                    >
                                        <span className="text-xs font-semibold md:text-lg md:font-normal lg:text-2xl">
                                            {t(item.label)}
                                        </span>
                                        <span className="whitespace-nowrap text-[0.625rem] font-semibold md:text-sm md:font-normal lg:text-base">
                                            {/* {`${usage}/${limit} ${constants[item.id as keyof Resources]}`} */}
                                            {Number(item.value) || 0}
                                        </span>
                                        {/* <Progress
                        value={item.value}
                        className="relative mt-4 h-[0.375rem] overflow-hidden rounded-full bg-stk-blue-100 duration-500 md:h-3 md:w-[85%]"
                      >
                        <ProgressIndicator
                          style={{
                            transform: `translateX(-${limit ? 100 - (usage * 100) / limit : 100}%)`,
                          }}
                          className="h-full w-full bg-stk-green duration-500"
                        />
                      </Progress> */}
                                    </div>
                                ))}
                        </div>
                    </div>
                    {isMobile && (
                        <div className="mt-7 rounded-xl bg-stk-blue-300 p-4">
                            <p>Wallet Balance : ${balanceOf} </p>
                            <p>Total Subscription Balance : ${subscriptionTotalBalance}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ResourcesOverview;
