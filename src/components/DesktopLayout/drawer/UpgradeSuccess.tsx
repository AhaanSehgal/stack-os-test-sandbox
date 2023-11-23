/* eslint-disable no-nested-ternary */
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Icon } from '@/components/common';
import { setDrawerOpen } from '@/redux/drawer/actions';

const UpgradeSuccess = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                <i className="fa-solid fa-cloud-check h-5 w-5 pr-2 text-stk-green" />
                <span>{t('UPGRADE_SUCCESS_TITLE')}</span>
            </div>
            <div className="mt-3 flex flex-col items-start justify-start px-3 pl-6 text-stk-white">
                <p className="mb-4 text-sm">{t('UPGRADE_SUCCESS_SUBTITLE')}</p>
            </div>
            <div className="mt-20 flex h-full w-full flex-col items-center justify-start">
                <Icon className="flex items-center" iconName="stackos-big" width={65} height={65} />
                <span className="mt-3 text-xl text-stk-white">
                    {t('UPGRADE_SUCCESS_AVAILABLE')}
                </span>
            </div>
            <div className="fixed bottom-0 flex h-[4.4rem] w-full items-center justify-center bg-stk-blue-200 px-6 shadow-[0px_0px_13px_rgba(255,255,255,0.1)]">
                <nav aria-label="Progress" className="flex w-full flex-row justify-end">
                    <div className="flex flex-col items-center justify-center px-4">
                        <Button
                            className="font-semibold"
                            onClick={() => dispatch(setDrawerOpen(false))}
                        >
                            {t('CLOSE')}
                        </Button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default UpgradeSuccess;
