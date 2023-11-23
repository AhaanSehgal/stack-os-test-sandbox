/* eslint-disable react/jsx-no-bind */
/* eslint-disable global-require */
import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DesktopLayout, LoadingSpinner, MobileLayout } from '@/components/common';
import EmptyState from '@/components/deploy/EmptyState';
import NewGroupModal from '@/components/deploy/NewGroupModal';
import { setDeployedApps, setGroupModalOpen } from '@/redux/deploy/actions';
import { useSelector } from '@/redux/hooks';
import MainScreen from '@/components/deploy/MainScreen/index';
import MobileEmptyState from '@/components/deploy/MobileEmptyState';
import MobileDisconnectedState from '@/components/deploy/MobileDisconnectedState';
import { App, GeneralState } from '@/redux/general/types';
import showToast from '@/utils/showToast';
import { formatAppParams } from '@decloudlabs/stk-v2/lib/utils/utils';
import { getAppList } from '@/utils/contractCallConfig';
import STKAppManager from '@decloudlabs/stk-v2/lib/services/STKAppManager';
import { ContractApp, SubscriptionParam } from '@decloudlabs/stk-v2/lib/types/types';
import { setAppManager, setFileAppManager, setSubscriptionParam } from '@/redux/general/actions';
import { APICallReturn } from '@/utils/types';
import { DeployState } from '@/redux/deploy/types';
import { UIAppManager } from '@/utils/UIAppManager';
import { FileAppManager } from '@/utils/FileAppManager';

export interface GroupType {
    id: number;
    name: string;
    appsIds: Array<number>;
}

const Deploy: NextPage = () => {
    const dispatch = useDispatch();
    // const { deploy, general } = useSelector((state: any) => state);
    const deploy: DeployState = useSelector((state: any) => state.deploy);
    const general: GeneralState = useSelector((state: any) => state.general);
    const { deployedApps, loading } = deploy;
    const { isMobile, selectedNft, nftRole, appManager, appCrypto } = general;

    const { isConnected } = useAccount();

    const [userGroups, setUserGroups] = useState<GroupType[]>([]);

    const getDeployedApps = () => {
        const { deployedApps, loading } = deploy;
        return deployedApps;
    };

    function addGroup(group: GroupType) {
        if (deployedApps) {
            setUserGroups((current) => [
                ...(current || []),
                { id: group.id, name: group.name, appsIds: group.appsIds },
            ]);
            deployedApps.forEach((app: any) => {
                if (group.appsIds.find((id) => id === app.id)) app.groupId = group.id;
            });
            dispatch(setGroupModalOpen(false));
        }
    }

    function editGroup(groupId: number, appsIds: number[]) {
        if (deployedApps) {
            const groupIdx = userGroups.findIndex((item) => item.id === groupId);
            const groupApps = deployedApps.filter((app: any) => appsIds.includes(app.id));
            groupApps.map((app: any) => {
                app.groupId = groupId;
                return app;
            });
            const newUserGroups = [...userGroups];
            newUserGroups[groupIdx].appsIds = appsIds;
            newUserGroups[groupIdx].name = deploy.groupName;
            setUserGroups(newUserGroups);
            dispatch(setGroupModalOpen(false));
        }
    }

    const setContractApp = async (newApp: ContractApp): Promise<APICallReturn<string>> => {
        let appList: ContractApp[] = getDeployedApps() || [];
        console.log('deployedApps: ', appList);
        let index = appList.findIndex((contApp) => contApp.appName === newApp.appName);
        if (index > 0) {
            appList[index] = newApp;
        }

        appList.push(newApp);

        dispatch(setDeployedApps(appList));
        return {
            success: true,
            data: '',
        };
    };

    const deleteContractApp = async (
        nftID: string,
        appID: string
    ): Promise<APICallReturn<string>> => {
        let appList = getDeployedApps() || [];

        console.log('deleteContractApp appID: ', appID, appList);
        appList = appList.filter((contApp) => contApp.appID !== appID);

        dispatch(setDeployedApps(appList));

        return {
            success: true,
            data: '',
        };
    };

    const setAppList = async (contractAppList: ContractApp[]): Promise<APICallReturn<string>> => {
        dispatch(setDeployedApps(contractAppList));
        return {
            success: true,
            data: '',
        };
    };

    const setSubParam = async (subParam: SubscriptionParam): Promise<APICallReturn<string>> => {
        dispatch(setSubscriptionParam(subParam));
        return {
            success: true,
            data: '',
        };
    };

    useEffect(() => {
        if (!selectedNft) return;
        if (!appCrypto) return;

        (async () => {
            try {
                const appListResp = await getAppList(appCrypto, selectedNft);
                console.log('appListResp: ', appListResp);
                if (appListResp.success == false) throw appListResp.data;
                const appList = appListResp.data;

                dispatch(setDeployedApps(appList));
            } catch (error: any) {
                console.error('Error while getting all apps: ', error);
                showToast('error', error?.message);
            }
        })();
    }, [selectedNft]);

    useEffect(() => {
        if (appCrypto == undefined) return;
        if (!appCrypto.appBrowserCache) return;

        if (!appCrypto.appIPFSStorage) return;
        if (!appCrypto.contractService) return;
        if (!appCrypto.appEncryptor) return;
        if (!appCrypto.appDecryptor) return;

        const stkAppManager = new UIAppManager(
            appCrypto.appBrowserCache,
            appCrypto.appIPFSStorage,
            appCrypto.contractService,
            appCrypto.appEncryptor,
            appCrypto.appDecryptor,
            window.sessionStorage,
            setAppList,
            async () => {
                return {
                    success: true,
                    data: '',
                };
            },
            setSubParam,
            async () => {
                return {
                    success: true,
                    data: '',
                };
            }
        );

        console.log('created stk app manager: ', stkAppManager);
        dispatch(setAppManager(stkAppManager));

        const fileAppManager = new FileAppManager(
            appCrypto.appBrowserCache,
            appCrypto.appIPFSStorage,
            appCrypto.contractService,
            appCrypto.appEncryptor,
            appCrypto.appDecryptor,
            window.sessionStorage,
            setAppList,
            async () => {
                return {
                    success: true,
                    data: '',
                };
            },
            setSubParam,
            async () => {
                return {
                    success: true,
                    data: '',
                };
            }
        );

        dispatch(setFileAppManager(fileAppManager));
    }, [appCrypto]);

    console.log('checking app manager : ', appManager);
    const appComponent = () => {
        return 1 == 1 ? (
            <DesktopLayout>
                {deployedApps && (
                    <NewGroupModal onEdit={editGroup} userGroups={userGroups} onSubmit={addGroup} />
                )}
                {loading ||
                (deployedApps &&
                    deployedApps?.filter((app: any) => !app.appName?.includes('webtty')).length &&
                    isConnected) ? (
                    <MainScreen userGroups={userGroups} />
                ) : (
                    <EmptyState nftRole={nftRole} />
                )}
            </DesktopLayout>
        ) : (
            <div className="flex h-screen w-screen items-center justify-center bg-stk-blue-500">
                <LoadingSpinner />
            </div>
        );
    };

    return (
        <div>
            <Head>
                <title>Deploy - StackOS</title>
                <meta name="description" content="StackOS Deploy" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isMobile ? (
                <MobileLayout>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {isConnected ? (
                        deployedApps ? (
                            <MainScreen userGroups={userGroups} />
                        ) : (
                            <MobileEmptyState />
                        )
                    ) : (
                        <MobileDisconnectedState />
                    )}
                </MobileLayout>
            ) : (
                appComponent()
            )}
        </div>
    );
};

export async function getStaticProps({ locale }: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default Deploy;
