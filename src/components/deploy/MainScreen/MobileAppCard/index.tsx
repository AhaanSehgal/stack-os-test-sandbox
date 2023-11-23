import { Separator } from '@radix-ui/react-separator';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { useTranslation } from 'react-i18next';
import { useSelector } from '@/redux/hooks';
import MobileAppHardware from './MobileAppHardware';

interface Props {
  appName: string;
  appLink?: string;
  status: string;
  cpuMin: number;
  cpuMax: number;
  memoryMin: number;
  memoryMax: number;
  storageMin?: number;
  storageMax?: number;
  bandwidthMin?: number;
  bandwidthMax?: number;
  price?: number;
}

const MobileAppCard = ({
  appName,
  appLink,
  status,
  cpuMin,
  cpuMax,
  memoryMin,
  memoryMax,
  storageMin,
  storageMax,
  bandwidthMin,
  bandwidthMax,
  price,
}: Props) => {
  const [isAppOpen, setIsAppOpen] = useState(true);
  const { deploy } = useSelector((state) => state);
  const { isItemsCollapsed } = deploy;
  const [appRef, appBounds] = useMeasure();
  const { t } = useTranslation();

  const animatedStyles = useSpring({
    height: isAppOpen ? appBounds.height + 16 : 0,
  });

  useEffect(() => {
    setIsAppOpen(isItemsCollapsed);
  }, [isItemsCollapsed]);

  return (
    <div className="w-full rounded-lg bg-stk-blue-300 p-4">
      <div className="relative flex items-center" onClick={() => setIsAppOpen(!isAppOpen)}>
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-md bg-stk-white duration-500">
          <i className="fa-solid fa-cloud-check text-sm text-stk-blue-400" />
        </div>
        <div className="ml-[0.85rem] flex flex-col items-start">
          <div className="flex items-center">
            <i
              className={`fa-solid fa-circle ${
                status === 'DEPLOYED' ? 'mr-2 text-xs  text-stk-green' : 'mr-2 text-xs text-red-500'
              }`}
            />
            <span className="mb-[0.1rem] text-base font-bold text-stk-white duration-500">
              {appName.substring(0, 8)}
              ...
            </span>
          </div>
          <div className="flex max-w-xs items-center">
            <i className="fa-regular fa-arrow-up-right-from-square mr-1 text-xs text-stk-grey-500" />
            <a
              target="blank"
              href={appLink && `https://${appLink}`}
              className="w-[10rem] truncate text-xs font-medium text-stk-grey-500 duration-500"
            >
              {appLink || 'No link available'}
            </a>
          </div>
        </div>
        <i
          className={`fa-regular fa-chevron-down absolute top-3 right-1 cursor-pointer text-xl text-stk-grey-200 duration-200 ${
            isAppOpen ? 'rotate-180' : ''
          }`}
          data-tip={t('DEPLOY_GROUP_OPTION1')}
          data-for="code"
          onClick={() => setIsAppOpen(!isAppOpen)}
        />
      </div>
      <animated.div style={{ overflow: 'hidden', ...animatedStyles }}>
        <div ref={appRef}>
          <Separator className="my-4 h-px w-full bg-stk-blue-100" />
          <div className="flex w-full justify-center">
            <MobileAppHardware
              cpuMax={cpuMax}
              cpuMin={cpuMin}
              memoryMax={memoryMax}
              memoryMin={memoryMin}
              storageMin={storageMin}
              storageMax={storageMax}
              bandwidthMax={bandwidthMax}
              bandwidthMin={bandwidthMin}
            />
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default MobileAppCard;
