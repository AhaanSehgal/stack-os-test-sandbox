import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import MobileAppCard from './MobileAppCard';
import MobileAppCardList from './MobileAppCardList';

interface Props {
  groupName: string;
  appsIds: any;
  userApps: any;
  isCardView: boolean;
  collapseTrigger: boolean;
}

const MobileGroup = ({ groupName, appsIds, userApps, isCardView, collapseTrigger }: Props) => {
  const [isGroupOpen, setIsGroupOpen] = useState(true);
  const { t } = useTranslation();
  const groupApps = userApps?.filter((app: any) => appsIds.find((appId: any) => app.id === appId));

  const [gridRef, gridBounds] = useMeasure();
  const [listRef, listBounds] = useMeasure();

  const gridStyles = useSpring({
    height: isGroupOpen ? gridBounds.height : 0,
  });

  const listStyles = useSpring({
    height: isGroupOpen ? listBounds.height : 0,
  });

  useEffect(() => {
    setIsGroupOpen(!collapseTrigger);
  }, [collapseTrigger]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between rounded-t-lg bg-stk-blue-300 p-4">
        <span className="text-xl font-semibold text-white">{groupName}</span>
        <i
          className={`fa-regular fa-chevron-down cursor-pointer text-stk-grey-200 duration-200 ${
            isGroupOpen ? 'rotate-180' : ''
          }`}
          data-tip={t('DEPLOY_GROUP_OPTION1')}
          data-for="code"
          onClick={() => setIsGroupOpen(!isGroupOpen)}
        />
      </div>
      {isCardView && (
        <animated.div style={{ overflow: 'hidden', ...gridStyles }}>
          {appsIds.length && (
            <div ref={gridRef} className="flex  flex-col gap-y-7 rounded-b-lg bg-stk-blue-500 p-4">
              {groupApps.map(
                ({ hostUrl, label, status, cpuUse, cpuMax, memoryUse, memoryMax }: any) => (
                  <div key={hostUrl}>
                    <MobileAppCard
                      appLink={hostUrl}
                      appName={label}
                      status={status}
                      cpuMin={cpuUse}
                      cpuMax={cpuMax}
                      memoryMin={memoryUse}
                      memoryMax={memoryMax}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </animated.div>
      )}
      {!isCardView && (
        <animated.div style={{ overflow: 'hidden', ...listStyles }}>
          {appsIds.length && (
            <div
              ref={listRef}
              className="divide-y-[1px] divide-stk-blue-100 rounded-b-lg bg-stk-blue-500 p-4"
            >
              {groupApps.map(({ hostUrl, label, status }: any) => (
                <div key={hostUrl}>
                  <MobileAppCardList appLink={hostUrl} appName={label} status={status} />
                </div>
              ))}
            </div>
          )}
        </animated.div>
      )}
    </div>
  );
};

export default MobileGroup;
