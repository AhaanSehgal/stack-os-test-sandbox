import { useState } from 'react';
import AppHardware from './AppHardware';
import AppOptions from '../AppOptions';
import LogsModal from '../LogsModal';

interface Props {
    appName: string;
    appID: string;
    appLink?: string;
    status: string;
    // cpuMin: number;
    // cpuMax: number;
    // memoryMin: number;
    // memoryMax: number;
    // storageMin?: number;
    // storageMax?: number;
    // bandwidthMin?: number;
    // bandwidthMax?: number;
    isNoDeployment: boolean;
}

const AppCard = ({
    appName,
    appLink,
    status,
    // cpuMin,
    // cpuMax,
    // memoryMin,
    // memoryMax,
    // bandwidthMin,
    // bandwidthMax,
    // storageMin,
    // storageMax,
    appID,
    isNoDeployment,
}: Props) => {
    const [isLogsOpen, setIsLogsOpen] = useState(false);
    return (
        <div
            className={`${
                isNoDeployment
                    ? 'bord opacity-40 bg-stk-blue-500 border-[1px] border-yellow-600'
                    : ''
            } group relative flex max-w-lg rounded-lg bg-stk-blue-300 px-2 pt-10 pb-9 shadow-xl duration-500 hover:shadow-2xl xl:max-w-xl`}
        >
            <LogsModal
                showModal={isLogsOpen}
                onCloseModal={() => setIsLogsOpen(false)}
                appLink={appLink}
                appName={appName}
                status={status}
            />
            <AppOptions appID={appID} />
            {/* <div className="w-full">
        <div className="mb-9 flex items-center">
          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-md bg-stk-white duration-500 xl:h-10 xl:w-10">
            <FontAwesomeIcon icon={faCloudCheck} className="text-sm text-stk-blue-400" />
          </div>
          <div className="ml-[0.85rem] flex flex-col items-start">
            <span className="mb-[0.1rem] text-base font-bold text-stk-white duration-500 xl:text-lg">
              {appName}
            </span>
            <div className="flex max-w-xs">
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="mr-1 text-xs text-stk-grey-200"
              />
              <a
                target="blank"
                href={appLink && `https://${appLink}`}
                className="w-[10rem] truncate text-xs font-medium text-stk-grey-200 duration-500 xl:w-[12rem]"
              >
                {appLink || 'No link available'}
              </a>
            </div>
          </div>
        </div>
        <AppInfo status={status} />
      </div>
      <Separator className="mx-4 w-[0.031rem] bg-stk-white opacity-0 duration-300 xl:mx-8 xl:h-[13.5rem] xl:opacity-100" /> */}
            <div className="flex w-full flex-col items-center duration-500">
                <div className="mb-9 flex w-4/5 items-center">
                    <div className="mt-1 flex  items-center justify-center rounded-md bg-stk-white p-2 duration-500">
                        <i className="fa-solid fa-cloud-check text-sm text-stk-blue-400" />
                    </div>
                    <div className="ml-[0.85rem] flex flex-col items-start">
                        <div className="flex items-center">
                            <i
                                className={`fa-solid fa-circle
                  ${
                      status === 'DEPLOYED'
                          ? 'mr-2 text-xs  text-stk-green'
                          : 'mr-2 text-xs text-red-500'
                  }
                `}
                            />
                            <span className="mr-3 mb-[0.1rem] text-base font-bold text-stk-white duration-500 xl:text-lg">
                                {appName.substring(0, 8)}
                                ...
                            </span>
                        </div>
                        <div className="flex max-w-xs">
                            <i className="fa-regular fa-arrow-up-right-from-square mr-1 text-xs text-stk-grey-200" />
                            <a
                                target="blank"
                                href={appLink && `https://${appLink}`}
                                className="w-[10rem] truncate text-xs font-medium text-stk-grey-200 duration-500"
                            >
                                {appLink || 'No link available'}
                            </a>
                        </div>
                    </div>
                </div>
                <AppHardware
                    // cpuMin={cpuMin}
                    // cpuMax={cpuMax}
                    // memoryMin={memoryMin}
                    // memoryMax={memoryMax}
                    // storageMin={storageMin}
                    // storageMax={storageMax}
                    // bandwidthMin={bandwidthMin}
                    // bandwidthMax={bandwidthMax}
                    cpuMin={0}
                    cpuMax={0}
                    memoryMin={0}
                    memoryMax={0}
                    storageMin={0}
                    storageMax={0}
                    bandwidthMin={0}
                    bandwidthMax={0}
                />
                {/* {price && ( */}
                {/* <div className="mt-4 flex w-4/5 items-center justify-center bg-stk-blue-100 py-[0.35rem] px-3 xl:mt-5 xl:flex-row xl:py-[0.55rem]">
          <Image src="/assets/stack-inverted.svg" width={16} height={16} alt="StackOS logo" />
          <span className="ml-2 mt-1 text-[0.625rem] font-light text-stk-white xl:mt-0 xl:text-[0.675rem]">
            {`${price || 0} STACK/Month`}
          </span>
        </div> */}
                {/* )} */}
            </div>
        </div>
    );
};

export default AppCard;
