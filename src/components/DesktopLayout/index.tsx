import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNetwork, useDisconnect, useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { GeneralActions } from '@/redux/general';
import { useSelector } from '@/redux/hooks';
import LoadingSpinner from '../common/LoadingSpinner';
import LoginModal from './LoginModal';
import Drawer from './drawer';
import Header from './header';
import SideMenu from './SideMenu';
import { Modal } from '@/components/common';
import useLoading from '@/hooks/useLoading';
import { resetStateGeneral, setConnectedAccount, setLoginModal } from '@/redux/general/actions';
import { resetStateDeploy } from '@/redux/deploy/actions';
import appsConfig from '@/utils/appsConfig';
import { resetState, setApps } from '@/redux/app-store/actions';
import { AppStoreApp } from '@/redux/app-store/types';
import { resetStateDrawer } from '@/redux/drawer/actions';
import { resetStateHardware } from '@/redux/hardware/actions';
import { resetStateSwap } from '@/redux/swap/actions';
import ShellModal from './ShellModal';
import Swap from './drawer/steps/deploy/swap';

type Props = {
    children: ReactNode;
};

const DesktopLayout = ({ children }: Props) => {
    const dispatch = useDispatch();
    const { loading } = useLoading();
    const router = useRouter();

    const { general, drawer } = useSelector((state) => state);

    const {
        isLoginModalOpen,
        isShellModalOpen,
        isSwapModalOpen,
        connectedAccount,
        selectedNft,
        appManager,
    } = general;
    const { clickOnConnectWallate } = drawer;

    const { address, status: connectStatus } = useAccount();
    const { chain } = useNetwork();
    const { disconnect, status: disconnects } = useDisconnect();

    useEffect(() => {
        if (
            (clickOnConnectWallate && !address) ||
            (address && connectedAccount && address !== connectedAccount)
        ) {
            console.log('refresh on clickk on conenct wallet');
            window.sessionStorage.clear();
            disconnect();
            dispatch(resetState());
            dispatch(resetStateGeneral());
            dispatch(resetStateHardware());
            dispatch(resetStateSwap());
            dispatch(resetStateDeploy());
        } else if (!address || (address && connectedAccount && address !== connectedAccount)) {
            console.log('refresh on address not connected');
            window.sessionStorage.clear();
            disconnect();
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
        const oldChainInd = sessionStorage.getItem('currentNetworkId');

        if (
            clickOnConnectWallate &&
            !isLoginModalOpen &&
            oldChainInd &&
            oldChainInd !== String(chain?.id)
        ) {
            console.log('click connect wallet and chain id not match');
            dispatch(resetState());
            dispatch(resetStateGeneral());
            dispatch(resetStateHardware());
            dispatch(resetStateSwap());
            dispatch(resetStateDeploy());
        } else if (!isLoginModalOpen && oldChainInd && oldChainInd !== String(chain?.id)) {
            console.log('is login open and chain not match');
            dispatch(resetState());
            dispatch(resetStateGeneral());
            dispatch(resetStateDrawer());
            dispatch(resetStateHardware());
            dispatch(resetStateSwap());
            dispatch(resetStateDeploy());
        }
    }, [chain?.id]);

    return (
        <div className="z-0 m-0 flex h-full min-h-screen w-full flex-col bg-stk-blue-400">
            <div className="grid grid-cols-[3.125rem_auto] grid-rows-[4.31rem_auto]">
                {isSwapModalOpen && (
                    <Modal
                        closeButton
                        showModal={isSwapModalOpen}
                        bgColor="#191F2D"
                        onCloseModal={() => dispatch(GeneralActions.setSwapModalOpen(false))}
                        clickOutsideClose={false}
                    >
                        <div className="flex flex-col h-full w-full">
                            <span className="text-stk-white text-lg mb-4">Buy STACK</span>
                            <Swap />
                        </div>
                    </Modal>
                )}

                {isShellModalOpen && (
                    <ShellModal
                        showModal={isShellModalOpen}
                        onCloseModal={() => dispatch(GeneralActions.setShellModalOpen(false))}
                    />
                )}
                {isLoginModalOpen && (
                    <LoginModal
                        showModal={isLoginModalOpen}
                        onCloseModal={() => dispatch(GeneralActions.setLoginModal(false))}
                    />
                )}

                <SideMenu selectedNft={selectedNft} />
                <Header />

                <Drawer />
                <div className="col-start-2 row-start-2 my-9 flex w-full justify-center duration-500">
                    {loading ? (
                        <div className="-my-9 flex h-[calc(100vh_-_4.31rem)] flex-col justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="mx-auto flex max-w-[23rem] flex-col px-5 duration-500 sm:min-w-[23rem] sm:max-w-[33.75rem] md:min-w-[33.75rem] md:max-w-[40rem] md:px-0 lg:min-w-[40rem] lg:max-w-[55rem] xl:min-w-[55rem] xl:max-w-[71.25rem] 2xl:min-w-[71.25rem] 2xl:max-w-[82rem]">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DesktopLayout;
