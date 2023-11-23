import { Progress, ProgressIndicator } from '@radix-ui/react-progress';
import { useTranslation } from 'react-i18next';
import { Separator } from '@radix-ui/react-separator';
import { hardwareList } from './helpers';
import { useSelector } from '@/redux/hooks';
import SkeletonMobileConsumptionOverview from './skeletons/SkeletonMobileConsumptionOverview';
import { Resources } from '@/redux/general/types';
import SkeletonAllocationHistory from './skeletons/SkeletonAllocationHistory';

const MobileResourcesOverview = () => {
  const { t } = useTranslation();
  const { general, deploy } = useSelector((state) => state);
  const { loading } = deploy;

  const { isMobile, resourcesUsage, userResources } = general;

  const constants = {
    cpu: 'MCI',
    bandwidth: 'MB',
    memory: 'MB',
    storage: 'GB',
  };

  return (
    <div className="flex h-[calc(100vh_-_3.5rem)] w-full flex-col justify-start md:mt-6 md:h-full">
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        isMobile ? (
          <SkeletonMobileConsumptionOverview />
        ) : (
          <SkeletonAllocationHistory />
        )
      ) : (
        <>
          <>
            <span className="ml-4 mt-7 text-xl font-semibold leading-10 text-white">
              {t('MOBILE_HARDWARE_PAGE_TITLE')}
            </span>
            <div className="hidden flex-row items-center justify-between md:flex">
              <h2 className="text-2xl font-semibold text-stk-white">
                {t('HARDWARE_RESOURCES_OVERVIEW_TITLE')}
              </h2>
            </div>
            <div className="mt-4 rounded-xl">
              <div className="grid grid-cols-2 gap-x-5">
                {hardwareList.map((item) => {
                  const usage = Number(resourcesUsage[item.id as keyof Resources] || 0);
                  const limit = Number(userResources[item.id as keyof Resources] || 0);

                  return (
                    <div
                      key={item.id}
                      className={`${
                        isMobile && ''
                      } flex flex-[0_0_50%] flex-col justify-start p-6 text-stk-grey-200 duration-300 md:flex-1 md:text-stk-grey-400`}
                    >
                      <span className="text-xs font-semibold md:text-lg md:font-normal lg:text-2xl">
                        {t(item.label)}
                      </span>
                      <span className="whitespace-nowrap text-[0.625rem] font-semibold md:text-sm md:font-normal lg:text-base">
                        {`${usage}/${limit} ${constants[item.id as keyof Resources]}`}
                      </span>
                      <Progress
                        value={(usage * 100) / limit || 0}
                        className="relative mt-4 h-[0.375rem] overflow-hidden rounded-full bg-stk-blue-100 duration-500 md:h-3 md:w-[85%]"
                      >
                        <ProgressIndicator
                          style={{
                            transform: `translateX(-${limit ? 100 - (usage * 100) / limit : 100}%)`,
                          }}
                          className="h-full w-full bg-stk-green duration-500"
                        />
                      </Progress>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
          <Separator className="my-6 ml-5 mt-10 h-[0.5px] w-[88%] bg-stk-white opacity-20" />
          <div className="ml-5 mt-8">
            <h2 className="mb-5 text-lg font-semibold text-white">
              {t('MOBILE_HARDWARE_PAGE_SUBTITLE')}
            </h2>
            <span className="text-sm font-light text-white">{t('MOBILE_HARDWARE_PAGE_TEXT')}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileResourcesOverview;
