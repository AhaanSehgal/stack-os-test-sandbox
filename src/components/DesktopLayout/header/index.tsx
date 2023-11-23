/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import {
    resetStateDrawer,
    setDrawerOpen,
    setDrawerStatus,
    setFormValues,
    setUpdateFormFlag,
} from '@/redux/drawer/actions';
import { Button, AddressInfo } from '@/components/common';
import { GeneralActions } from '@/redux/general';
import { Resources } from '@/redux/general/types';
import HardwareIndicator, { Icons } from './HardwareIndicator';
import { useSelector } from '@/redux/hooks';
import { setShellModalOpen } from '@/redux/general/actions';
import { isDeployAndUpdateDisabled } from '@/utils/utils';
import { BANDWIDTH, CPU, MEMMORY, STORAGE } from '@/utils/constants';
import { setDeployedApps } from '@/redux/deploy/actions';

const Header = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { isConnected } = useAccount();
    const { general, drawer, deploy } = useSelector((state) => state);
    const { hardwareResource, formValues } = drawer;
    const { deployedApps } = deploy;
    const { nftRole, selectedNft } = general;

    //   const [hardware, setHardware] = useState([]);

    //   useEffect(() => {
    //     if (!selectedNft) return;

    //     (async () => {
    //       //   const data = await ContractBasedDeployment.getAppsOfNFT(selectedNft);
    //       //   dispatch(setDeployedApps(data));

    //       let resourceCount = [];

    //       selectedNft &&
    //         deployedApps?.forEach(function (obj: any) {
    //           resourceCount.push(obj.resourceCount);
    //         });

    //       const sum =
    //         resourceCount.length !== 0 && resourceCount?.reduce((a, b) => a?.map((c, i) => c + b[i]));

    //       const cpu =
    //         sum[0] * CPU.CPU_STANDARD + sum[1] * CPU.CPU_INTENSIVE + sum[2] * CPU.GPU_STANDARD;

    //       const memmory =
    //         sum[0] * MEMMORY.CPU_STANDARD +
    //         sum[1] * MEMMORY.CPU_INTENSIVE +
    //         sum[2] * MEMMORY.GPU_STANDARD;

    //       const bandwidth = sum[3] * BANDWIDTH;
    //       const storage = sum[4] * STORAGE;

    //       // eslint-disable-next-line no-shadow
    //       const hardware = [
    //         {
    //           id: 'cpu',
    //           tooltipText: 'CPU',
    //           unity: 'MCI',
    //           hardwareId: 1,
    //           label: 'ALLOCATION_CPU',
    //           iconName: 'cpu' as keyof Icons,
    //           value: cpu,
    //         },
    //         {
    //           id: 'memory',
    //           tooltipText: 'Memory',
    //           unity: 'MB',
    //           hardwareId: 3,
    //           label: 'ALLOCATION_MEMORY',
    //           iconName: 'memory' as keyof Icons,
    //           value: memmory,
    //         },
    //         {
    //           id: 'storage',
    //           tooltipText: 'Storage',
    //           unity: 'GB',
    //           hardwareId: 4,
    //           label: 'ALLOCATION_STORAGE',
    //           iconName: 'storage' as keyof Icons,
    //           value: storage,
    //         },
    //         {
    //           id: 'bandwidth',
    //           tooltipText: 'Bandwidth',
    //           unity: 'GB',
    //           hardwareId: 2,
    //           label: 'ALLOCATION_BANDWIDTH',
    //           iconName: 'bandwidth' as keyof Icons,
    //           value: bandwidth,
    //         },
    //       ];

    //       setHardware(hardware);
    //     })();
    //   }, [selectedNft, hardwareResource, deployedApps]);

    return (
        <header className="relative z-50 col-span-1">
            <div className="fixed flex h-[4.32rem] w-full bg-stk-blue-200 pr-[5rem] shadow-[0px_0px_15px_2px_rgba(0,0,0,0.15)]">
                {/* <div className="flex items-center">
          {hardware.map((item) => (
            <div
              className="flex h-full flex-row border-r border-solid border-stk-blue-100 duration-300"
              key={item.id}
            >
              <HardwareIndicator
                usedValue={resourcesUsage[item.id as keyof Resources]}
                totalValue={userResources[item.id as keyof Resources]}
                value={item.value}
                unity={item.unity}
                progressValue={
                  (Number(resourcesUsage[item.id as keyof Resources]) * 100) /
                    Number(userResources[item.id as keyof Resources]) || 0
                }
                iconName={item.iconName}
                id={item.tooltipText}
              />
            </div>
          ))}
        </div> */}
                {/* <Link href="/hardware" passHref>
                    <div className="m-4 hidden min-w-[11rem] cursor-pointer truncate rounded-md border border-stk-green text-stk-green duration-300 hover:bg-stk-green hover:text-stk-blue-500 lg:flex lg:items-center lg:justify-center">
                        <span>{t('HEADER_BUY_RESOURCES')}</span>
                    </div>
                </Link> */}
                <div className="my-4 ml-2 flex w-full justify-end space-x-14 duration-500">
                    <div className="flex">
                        {isConnected ? (
                            <div className="flex">
                                <AddressInfo />

                                {selectedNft && (
                                    <Button
                                        className="mx-2 xl:mx-5"
                                        isOutline={false}
                                        disabled={true}
                                        onClick={() => {
                                            if (
                                                deployedApps?.some((el) => el.appName === 'webtty')
                                            ) {
                                                dispatch(setShellModalOpen(true));
                                            } else {
                                                dispatch(setDrawerOpen(true));
                                                dispatch(
                                                    setFormValues({
                                                        ...formValues,
                                                        appName: 'webtty',
                                                    })
                                                );
                                                dispatch(setUpdateFormFlag(true));
                                                dispatch(setDrawerStatus('deploy-form'));
                                            }
                                        }}
                                    >
                                        <div className="flex items-center truncate font-semibold">
                                            Run Shell
                                        </div>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <Button
                                dataCy="connect-wallet"
                                className="mx-2 font-semibold"
                                isOutline={false}
                                onClick={() => dispatch(GeneralActions.setLoginModal(true))}
                            >
                                <div className="flex items-center font-semibold">
                                    <i className="fa-light fa-wallet -mt-1 mr-[0.38rem] text-lg" />
                                    {t('CONNECT_WALLET')}
                                </div>
                            </Button>
                        )}
                        <Button
                            dataCy="navbar-deploy"
                            isOutline={false}
                            onClick={() => {
                                dispatch(resetStateDrawer());
                                dispatch(setDrawerOpen(true));
                            }}
                            disabled={
                                isDeployAndUpdateDisabled(nftRole) ||
                                isNaN(Number(selectedNft)) ||
                                selectedNft === ''
                            }
                        >
                            <div className="flex font-semibold">
                                <i className="fa-light fa-rocket-launch -mt-1 mr-[0.38rem] text-lg" />
                                {t('BUTTON_DEPLOY')}
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
