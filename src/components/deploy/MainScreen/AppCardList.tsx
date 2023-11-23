import { useState } from 'react';
import AppInfo from './AppInfo';
import AppOptions from './AppOptions';
import LogsModal from './LogsModal';

interface Props {
    appID: string;
    appName: string;
    appLink: string;
    status: string;
    price?: number;
}

const AppCardList = ({ appID, appName, appLink, status, price }: Props) => {
    const [isLogsOpen, setIsLogsOpen] = useState(false);

    return (
        <div className="group relative flex w-full items-center justify-start py-[1.16rem]">
            <LogsModal
                showModal={isLogsOpen}
                onCloseModal={() => setIsLogsOpen(false)}
                appLink={appLink}
                appName={appName}
                status={status}
            />
            <AppOptions appID={appID} />
            <div className="mr-auto flex flex-col items-start">
                <span className="mb-[0.1rem] w-[3rem] truncate text-base font-bold text-stk-white duration-500 lg:w-[6rem] xl:w-[10rem] 2xl:w-[12rem] 2xl:text-lg">
                    {appName}
                </span>
                <a
                    target="blank"
                    href={appLink && `https://${appLink}`}
                    className="flex max-w-xs items-center"
                >
                    <i className="fa-regular fa-arrow-up-right-from-square mr-1 text-xs text-stk-grey-200" />
                    <span className="w-[3rem] truncate text-xs font-medium text-stk-grey-200 duration-500 lg:w-[12em] xl:w-[15rem]">
                        {appLink || 'No link available'}
                    </span>
                </a>
            </div>
            <div className="flex w-96 items-center">
                <AppInfo isHorizontal status={status} />
            </div>
        </div>
    );
};

export default AppCardList;
