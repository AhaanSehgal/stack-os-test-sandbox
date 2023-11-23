import { useTranslation } from 'react-i18next';
import Modal from '../../../common/Modal';
import AppInfoHorizontal from './AppInfoHorizontal';
import LogsChart from './LogsChart';
import LogsIncidents from './LogsIncidents';

interface Props {
    showModal: boolean;
    // eslint-disable-next-line no-unused-vars
    onCloseModal: (arg0: boolean) => void;
    appName: string;
    appLink?: string;
    status: string;
}

const LogsModal = ({ showModal, onCloseModal, appName, appLink, status }: Props) => {
    const { t } = useTranslation();

    return (
        <Modal showModal={showModal} onCloseModal={() => onCloseModal(false)}>
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold text-stk-white">
                    {t('DEPLOY_LOGS_MODAL_TITLE')}
                </h1>
                <i
                    onClick={() => onCloseModal(false)}
                    className="fa-regular fa-xmark cursor-pointer text-3xl text-stk-white"
                />
            </div>
            <div className=" scrollbar mt-10 overflow-hidden overflow-y-scroll pr-5">
                <div className="flex">
                    <div className="mb-9 mr-28 flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-stk-white">
                            <i className="fa-solid fa-cloud-check text-sm text-stk-blue-400" />
                        </div>
                        <div className="ml-[0.85rem] flex flex-col items-start">
                            <span className="mb-[0.1rem] text-base font-bold text-stk-white">
                                {appName}
                            </span>
                            <div className="flex max-w-xs">
                                <i className="fa-regular fa-arrow-up-right-from-square mr-1 text-xs text-stk-grey-200" />
                                <span className="w-[10rem] truncate text-xs font-medium text-stk-grey-200">
                                    {appLink || 'No link available'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <AppInfoHorizontal status={status} />
                </div>
                <LogsChart />
                <LogsIncidents />
            </div>
        </Modal>
    );
};

export default LogsModal;
