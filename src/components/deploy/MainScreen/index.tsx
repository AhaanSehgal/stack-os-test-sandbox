import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/redux/hooks';
import useWindowSize from '@/hooks/useWindowSize';
import { setGroupModalOpen, setIsItemsCollapsed } from '@/redux/deploy/actions';
import AppCard from './AppCard';
import DeployHeader from './DeployHeader';
import SkeletonMainSection from '../../common/skeletons/SkeletonMainSection';
import MobileAppCard from './MobileAppCard';
import AppCardList from './AppCardList';
import MobileDeployHeader from './MobileDeployHeader';
import MobileAppCardList from './MobileAppCardList';
import SkeletonMobileMainSection from '../../common/skeletons/SkeletonMobileMainSection';
import showToast from '@/utils/showToast';
import { BANDWIDTH, CPU, MEMMORY, STORAGE } from '@/utils/constants';
// import { App } from '@/redux/general/types';
import { AppPayload, ContractApp } from '@decloudlabs/stk-v2/lib/types/types';

interface Props {
    userGroups: any;
}

interface Hardware {
    cpuValue: number;
    memmoryValue: number;
    storageValue: number;
    bandwidthValue: number;
}

const MainScreen = ({ userGroups }: Props) => {
    const dispatch = useDispatch();
    const { address } = useAccount();
    const windowSize = useWindowSize();
    const { t } = useTranslation();
    const { general, deploy } = useSelector((state) => state);
    const { loading, deployedApps, isItemsCollapsed } = deploy;
    const { isMobile, selectedNft, appCrypto } = general;
    const [isCardView, setIsCardView] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [lonelyApps, setLonelyApps] = useState<ContractApp[] | null>(null);
    const [filteredApps, setFilteredApps] = useState<ContractApp[] | null>(null);
    const [visibleApps, setVisibleApps] = useState<ContractApp[] | null>(null);
    const [filteredGroups, setFilteredGroups] = useState(userGroups);
    // const [hardware, setHardware] = useState<Hardware>({});
    const [cacheData, setCacheData] = useState<AppPayload[]>([]);

    useEffect(() => {
        const allVisibleApps = deployedApps?.filter(
            (app: ContractApp) => !app.appName?.includes('webtty')
        );

        if (allVisibleApps) {
            setVisibleApps(allVisibleApps);
            setFilteredApps(allVisibleApps);
            setLonelyApps(allVisibleApps);
        }
    }, [deployedApps]);

    useEffect(() => {
        if (filteredApps) setLonelyApps([...filteredApps]);
    }, [filteredApps]);

    useEffect(() => {
        if (visibleApps && searchValue) {
            setFilteredApps(
                visibleApps.filter((app: ContractApp) =>
                    app?.appName?.toLowerCase().includes(searchValue.toString().toLowerCase())
                )
            );
        } else setFilteredApps(visibleApps);

        if (visibleApps && searchValue) {
            setFilteredGroups(
                userGroups.forEach((group: any) => {
                    const matchGroupApp = visibleApps.find(
                        (app: any) =>
                            group.appsIds.includes(app.id) &&
                            app.appName.toLowerCase().includes(searchValue.toString().toLowerCase())
                    );
                    if (matchGroupApp) return group;
                })
            );
        } else setFilteredGroups(userGroups);
    }, [searchValue, userGroups]);

    useEffect(() => {
        (async () => {
            const resourceCount: any[] = [];
            // eslint-disable-next-line no-unused-expressions
            selectedNft &&
                deployedApps &&
                deployedApps.forEach((obj: any) => {
                    resourceCount.push(obj.resourceCount);
                });

            const resourceLength = 5;
            const sum = new Array(resourceLength).fill(0);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < resourceLength; i++) {
                // eslint-disable-next-line no-plusplus
                for (let j = 0; j < resourceCount.length; j++) {
                    if (resourceCount[j].length < i + 1) {
                        continue;
                    }
                    sum[i] += resourceCount[j][i];
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

            // const hardware = {
            //     cpuValue: cpu,
            //     memmoryValue: memmory,
            //     storageValue: storage,
            //     bandwidthValue: bandwidth,
            // };
            // setHardware(hardware);
        })();
    }, [selectedNft, deployedApps]);

    useEffect(() => {
        if (!appCrypto) return;
        (async () => {
            try {
                const appList = deployedApps || [];
                const appPayloadList: AppPayload[] = [];

                for (let i = 0; i < appList.length; i++) {
                    const contractApp = appList[i];
                    const cacheData = await appCrypto.appBrowserCache.getAppPayload(
                        appCrypto.contractService.selectedAccount,
                        selectedNft,
                        contractApp.appID
                    );
                    // if (cacheData.success == false) throw cacheData.data;
                    // console.log('cacheData: ', cacheData);

                    if (cacheData.success == true) appPayloadList.push(cacheData.data.appPayload);
                }

                setCacheData(appPayloadList);
            } catch (error: any) {
                console.error('Error while getting apps data from cache: ', error);
                showToast('error', error.message);
            }
        })();
    }, [deployedApps, selectedNft]);

    return (
        <div className="mb-10 flex min-h-[calc(100vh_-_6rem)] flex-col items-center sm:w-[33.75rem] md:min-h-screen md:w-[40rem] md:px-0 lg:w-[55rem] xl:w-[71.25rem]">
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? (
                isMobile ? (
                    <SkeletonMobileMainSection />
                ) : (
                    <SkeletonMainSection />
                )
            ) : (
                <>
                    {isMobile ? (
                        <MobileDeployHeader
                            searchValue={searchValue}
                            searchOnChange={setSearchValue}
                            toggleCollapse={() => dispatch(setIsItemsCollapsed(!isItemsCollapsed))}
                            toggleView={() => setIsCardView(!isCardView)}
                        />
                    ) : (
                        <DeployHeader
                            toggleCollapse={() => dispatch(setIsItemsCollapsed(!isItemsCollapsed))}
                            searchValue={searchValue}
                            searchOnChange={setSearchValue}
                            openNewGroupModal={() => dispatch(setGroupModalOpen(true))}
                            toggleView={() => setIsCardView(!isCardView)}
                            isCardView={isCardView}
                        />
                    )}
                    {windowSize?.width && windowSize.width < 768 ? (
                        <>
                            {/* <div className="child:my-2">
                {deployedApps?.length &&
                  deployedApps?.map((group: GroupType) => (
                    <div key={group.id}>
                      <MobileGroup
                        collapseTrigger={isItemsCollapsed}
                        isCardView={isCardView}
                        key={group.id}
                        groupName={group.name}
                        userApps={visibleApps}
                        appsIds={group.appsIds}
                      />
                    </div>
                  ))}
              </div> */}
                            {lonelyApps?.length && (
                                <div
                                    className={`${
                                        isCardView
                                            ? 'w-full space-y-4'
                                            : 'w-full divide-y divide-stk-blue-100'
                                    }`}
                                >
                                    {lonelyApps.map((app: any) => (
                                        <div key={app.id}>
                                            {isCardView ? (
                                                <MobileAppCard
                                                    appLink={app.hostUrl}
                                                    appName={app.appName}
                                                    status="DEPLOYED"
                                                    cpuMin={0}
                                                    cpuMax={0}
                                                    memoryMin={0}
                                                    memoryMax={0}
                                                    storageMin={0}
                                                    storageMax={0}
                                                    bandwidthMin={0}
                                                    bandwidthMax={0}
                                                    // cpuMin={
                                                    //     app.resourceCount[0] * CPU.CPU_STANDARD +
                                                    //     app.resourceCount[1] * CPU.CPU_INTENSIVE +
                                                    //     app.resourceCount[2] * CPU.GPU_STANDARD
                                                    // }
                                                    // cpuMax={hardware?.cpuValue}
                                                    // memoryMin={
                                                    //     app.resourceCount[0] *
                                                    //         MEMMORY.CPU_STANDARD +
                                                    //     app.resourceCount[1] *
                                                    //         MEMMORY.CPU_INTENSIVE +
                                                    //     app.resourceCount[2] * MEMMORY.GPU_STANDARD
                                                    // }
                                                    // memoryMax={hardware?.memmoryValue}
                                                    // storageMin={app.resourceCount[4] * STORAGE}
                                                    // storageMax={hardware?.storageValue}
                                                    // bandwidthMin={app.resourceCount[3] * BANDWIDTH}
                                                    // bandwidthMax={hardware?.bandwidthValue}
                                                    price={app.price}
                                                />
                                            ) : (
                                                <MobileAppCardList
                                                    appLink={app.hostUrl}
                                                    appName={app.appName}
                                                    status={app.status}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex w-full flex-col items-center">
                            {/* {filteredGroups?.map((group: GroupType) => (
                <div key={group.id}>
                  <Group
                    id={group.id}
                    collapseTrigger={isItemsCollapsed}
                    isCardView={isCardView}
                    key={group.id}
                    userApps={visibleApps}
                    groupName={group.name}
                    appsIds={group.appsIds}
                  />
                </div>
              ))} */}

                            {lonelyApps?.length ? (
                                <div
                                    className={`${
                                        isCardView
                                            ? 'grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4'
                                            : 'w-full divide-y divide-stk-blue-100'
                                    }`}
                                >
                                    {lonelyApps.map((app: ContractApp, index) => (
                                        <div key={app.appName} className="flex w-full">
                                            {isCardView ? (
                                                <AppCard
                                                    // applicationData={applicationData}
                                                    // setApplicationData={setApplicationData}
                                                    appLink={`${app.appName}-n${app.nftID}-marvel.stackos.io`}
                                                    appID={app.appID}
                                                    appName={app.appName}
                                                    status="DEPLOYED"
                                                    // cpuMin={
                                                    //     // app.resourceCount[0] * CPU.CPU_STANDARD +
                                                    //     // app.resourceCount[1] * CPU.CPU_INTENSIVE +
                                                    //     // app.resourceCount[2] * CPU.GPU_STANDARD
                                                    //     3
                                                    // }
                                                    // cpuMax={hardware?.cpuValue}
                                                    // memoryMin={
                                                    //     app.resourceCount[0] *
                                                    //         MEMMORY.CPU_STANDARD +
                                                    //     app.resourceCount[1] *
                                                    //         MEMMORY.CPU_INTENSIVE +
                                                    //     app.resourceCount[2] * MEMMORY.GPU_STANDARD
                                                    // }
                                                    // memoryMax={hardware?.memmoryValue}
                                                    // storageMin={app.resourceCount[4] * STORAGE}
                                                    // storageMax={hardware?.storageValue}
                                                    // bandwidthMin={app.resourceCount[3] * BANDWIDTH}
                                                    // bandwidthMax={hardware?.bandwidthValue}
                                                    isNoDeployment={
                                                        // !!(
                                                        //     cacheData &&
                                                        //     cacheData[app?.appName]?.resourceCount
                                                        // )
                                                        false
                                                    }
                                                    // price={Number(app.price || 0)}
                                                />
                                            ) : (
                                                <AppCardList
                                                    // appLink={app.hostUrl || ''}
                                                    appLink={''}
                                                    appID={app.appID}
                                                    appName={app.appName}
                                                    status="DEPLOYED"
                                                    // price={Number(app.price || 0)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-[11.4rem] flex flex-col items-center justify-center">
                                    <div className="ml-10">
                                        <Image
                                            alt="empty-state-top"
                                            src="/assets/app-store/search-empty-state.svg"
                                            width={100}
                                            height={80}
                                        />
                                    </div>
                                    <span className="mt-6 max-w-[24rem] text-center text-xl font-medium text-stk-grey-400">
                                        {`${t('APP_STORE_EMPTY_SEARCH_1')} `}
                                        <span className="font-bold">{`“${searchValue}”`}</span>
                                    </span>
                                    <span className="mt-2 text-lg font-extralight text-stk-grey-400">
                                        {t('APP_STORE_EMPTY_SEARCH_2')}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MainScreen;
