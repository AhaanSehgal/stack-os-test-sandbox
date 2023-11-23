import { useAccount } from 'wagmi';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from '@/redux/drawer/actions';
import { Button } from '../common';
// import { setGroupModalOpen } from '@/redux/deploy/actions';

import { GeneralActions } from '@/redux/general';
import { isDeployAndUpdateDisabled } from '@/utils/utils';
import { NftRole } from '@/redux/general/types';

interface Props {
    nftRole: NftRole;
}

const EmptyState = ({ nftRole }: Props) => {
    const { t } = useTranslation();
    const { isConnected } = useAccount();
    const dispatch = useDispatch();

    return (
        <div className="flex min-h-[calc(100vh_-_12rem)] w-full items-center justify-center">
            <Image
                className="z-0"
                src="/assets/home/empty-state.svg"
                alt="empty-state"
                width={279}
                height={303}
            />
            <div className={`${!isConnected ? 'mt-14' : ''} ml-16`}>
                {isDeployAndUpdateDisabled(nftRole) ? (
                    <h1 className="text-[1.75rem] font-semibold text-stk-white">
                        It seems you don't have any application!
                    </h1>
                ) : (
                    <>
                        <h1 className="text-[1.75rem] font-semibold text-stk-white">
                            {t(!isConnected ? 'DISCONNECTED_STATE_TITLE' : 'EMPTY_STATE_TITLE')}
                        </h1>
                        <p className="my-6 max-w-md text-xl font-light text-stk-white">
                            {isConnected && (
                                <span className="text-xl font-bold text-stk-green">
                                    {t('EMPTY_STATE_DESCRIPTION_SPAN')}
                                </span>
                            )}
                            {t(
                                !isConnected
                                    ? 'DISCONNECTED_STATE_DESCRIPTION'
                                    : 'EMPTY_STATE_DESCRIPTION'
                            )}
                        </p>
                    </>
                )}
                {isConnected ? (
                    <div className="flex">
                        {/* <Button
              dataCy="new-group-button"
              onClick={() => dispatch(setGroupModalOpen(true))}
              className="mr-3 bg-[#e4e4e4] px-6 text-base font-light text-stk-blue-500"
            >
              <i className="fa-light fa-layer-plus mr-2" />
              {t('BUTTON_NEW_GROUP')}
            </Button> */}

                        {/* {!isDeployAndUpdateDisabled(nftRole) && (
                            <Button
                                onClick={() => dispatch(setDrawerOpen(true))}
                                className="bg-[#e4e4e4] px-6 text-base font-light text-stk-blue-500"
                            >
                                <i className="fa-light fa-rocket-launch mr-2" />
                                {t('BUTTON_DEPLOY')}
                            </Button>
                        )} */}
                    </div>
                ) : (
                    <Button
                        className="bg-stk-grey-300 text-base"
                        onClick={() => dispatch(GeneralActions.setLoginModal(true))}
                    >
                        <i className="fa-regular fa-wallet mr-2" />
                        {t('CONNECT_WALLET')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
