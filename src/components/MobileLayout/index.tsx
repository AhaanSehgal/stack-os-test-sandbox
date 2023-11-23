import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useRouter } from 'next/router';
import { GeneralActions } from '@/redux/general';
import { useSelector } from '@/redux/hooks';
import MobileHeader from './MobileHeader';
import {
    resetStateDeploy,
    setDeployedApps,
    setLoading as setLoadingDeploy,
} from '@/redux/deploy/actions';
import useLoading from '@/hooks/useLoading';
import { resetStateGeneral, setConnectedAccount, setLoginModal } from '@/redux/general/actions';
import { LoadingSpinner } from '@/components/common';
import LoginModal from '../DesktopLayout/LoginModal';
import { resetState } from '@/redux/app-store/actions';
import { resetStateDrawer } from '@/redux/drawer/actions';
import { resetStateHardware } from '@/redux/hardware/actions';
import { resetStateSwap } from '@/redux/swap/actions';

type Props = {
    children: ReactNode;
};

const MobileLayout = ({ children }: Props) => {
    const dispatch = useDispatch();
    const { address, status: connectStatus } = useAccount();
    const { chain } = useNetwork();
    const { disconnect, status: disconnects } = useDisconnect();
    // const { callApi } = useStackosApi();
    const router = useRouter();
    const { general, drawer } = useSelector((state) => state);
    const { isLoginModalOpen, connectedAccount } = general;
    const { status } = drawer;
    const { loading } = useLoading();
    // const getResourcesPrice = useStackosResourcesPrice();
    // const getUserResources = useStackosGetDeposits();

    // async function getDeployedApps() {
    //   dispatch(setLoadingDeploy(true));
    //   const response = await callApi({
    //     relPath: `deployments/${chain?.id}/${address?.toLowerCase()}`,
    //   });

    //   if (response.success === true) {
    //     let totalLocalMemory = 0;
    //     let totalLocalCpu = 0;
    //     let totalLocalStorage = 0;
    //     // let totalLocalBandWidth = 0;

    //     dispatch(
    //       setDeployedApps(
    //         response.data.map((app: App, appIdx: number) => {
    //           const appResourcesLimits = { ...app.resourceLimits };
    //           Object.keys(appResourcesLimits).forEach((key) => {
    //             appResourcesLimits[key] = parseFloat(appResourcesLimits[key]);
    //           });

    //           const appResourcesRequests = { ...app.resourceRequests };
    //           Object.keys(appResourcesRequests).forEach((key) => {
    //             appResourcesRequests[key] = parseFloat(appResourcesRequests[key]);
    //           });

    //           if (app.status === 'DEPLOYED') {
    //             if (appResourcesRequests.memory) {
    //               totalLocalMemory += appResourcesRequests.memory * (app.replicaCount || 1);
    //             }
    //             if (appResourcesRequests.cpu) {
    //               totalLocalCpu += appResourcesRequests.cpu * (app.replicaCount || 1);
    //             }
    //             if (app?.storageSize) {
    //               totalLocalStorage +=
    //                 parseFloat(app?.storageSize?.toString()) * (app.replicaCount || 1);
    //             }
    //           }

    //           return {
    //             ...app,
    //             label: app?.appName?.replace(/-.*/, ''),
    //             value: appIdx + 1,
    //             resourceLimits: appResourcesLimits,
    //             resourceRequests: appResourcesRequests,
    //             groupId: app.groupId ? app.groupId : '',
    //             storageSize: app?.storageSize ? parseFloat(app?.storageSize.toString()) : 0,
    //           };
    //         })
    //       )
    //     );

    //     dispatch(
    //       setResourcesUsage({
    //         cpu: totalLocalCpu,
    //         memory: totalLocalMemory,
    //         storage: totalLocalStorage,
    //       })
    //     );
    //   } else {
    //     dispatch(setDeployedApps(null));
    //   }
    //   dispatch(setLoadingDeploy(false));
    // }

    useEffect(() => {
        if (!address || (address && connectedAccount && address !== connectedAccount)) {
            window.sessionStorage.clear();
            disconnect();
            console.log('address not connected in mobile');
            dispatch(resetState());
            dispatch(resetStateGeneral());
            dispatch(resetStateDrawer());
            dispatch(resetStateHardware());
            dispatch(resetStateSwap());
            dispatch(resetStateDeploy());
        }

        if (address) dispatch(setConnectedAccount(address));
    }, [address]);

    useEffect(() => {
        if (
            disconnects !== 'success' &&
            connectStatus !== 'reconnecting' &&
            address &&
            !window.sessionStorage.getItem('stackosBaseUrl') &&
            router.pathname !== '/'
        ) {
            disconnect();
            dispatch(setLoginModal(true));
        }
    }, [router, chain?.id, connectStatus, window.sessionStorage.getItem('stackosBaseUrl')]);

    // useEffect(() => {
    //   if (window.sessionStorage.getItem('sessionKey') && address && chain?.id) {
    //     getDeployedApps();
    //   }
    // }, [router, window.sessionStorage.getItem('sessionKey')]);

    // useEffect(() => {
    //   if (status === 'deploy-success') getDeployedApps();
    // }, [status]);

    // useEffect(() => {
    //   if (window.sessionStorage.getItem('stringToBytes32')) {
    //     getResourcesPrice();
    //     getUserResources();
    //   }
    // }, [router.pathname, connectStatus, window.sessionStorage.getItem('stringToBytes32')]);

    return (
        <div className="z-0 m-0 flex h-full w-full flex-col overflow-hidden bg-stk-blue-400">
            <div className="mx-auto w-full">
                <LoginModal
                    showModal={isLoginModalOpen}
                    onCloseModal={() => dispatch(GeneralActions.setLoginModal(false))}
                />
                <MobileHeader />
                {loading ? (
                    <div className="flex h-[calc(100vh_-_3.5rem)] flex-col justify-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="mx-auto max-w-[23rem] px-5 duration-500 sm:max-w-[33.75rem] md:max-w-[45rem]">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileLayout;
