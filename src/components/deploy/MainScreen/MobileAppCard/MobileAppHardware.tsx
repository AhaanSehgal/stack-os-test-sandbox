import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useTranslation } from 'react-i18next';

interface Props {
  cpuMin: number;
  cpuMax: number;
  memoryMin?: number;
  memoryMax?: number;
  storageMin?: number;
  storageMax?: number;
  bandwidthMin?: number;
  bandwidthMax?: number;
}

const MobileAppHardware = ({
  cpuMin,
  cpuMax,
  memoryMin,
  memoryMax,
  storageMin,
  storageMax,
  bandwidthMin,
  bandwidthMax,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col justify-between gap-y-6 sm:w-3/4">
      <div className="flex w-full justify-between sm:justify-center">
        <div className="flex w-[9rem] items-center sm:w-[13rem]">
          <div className="w-[3.25rem] sm:w-[4.25rem]">
            <CircularProgressbarWithChildren
              strokeWidth={12}
              value={(100 * cpuMin) / cpuMax}
              styles={buildStyles({ strokeLinecap: 'butt', pathColor: '#aaff00' })}
            >
              <i className="fa-thin fa-microchip text-stk-green" />
            </CircularProgressbarWithChildren>
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-[0.625rem] text-stk-grey-500 sm:text-base">
              {t('ALLOCATION_CPU')}
            </span>
            <span className="text-sm text-stk-white sm:text-lg">{`${cpuMin}/${cpuMax}`}</span>
          </div>
        </div>

        <div className="flex w-[9rem] items-center sm:w-[13rem]">
          <div className="w-[3.25rem] sm:w-[4.25rem]">
            <CircularProgressbarWithChildren
              strokeWidth={12}
              value={(100 * memoryMin) / memoryMax}
              styles={buildStyles({ strokeLinecap: 'butt', pathColor: '#aaff00' })}
            >
              <i className="fa-thin fa-wifi text-stk-green" />
            </CircularProgressbarWithChildren>
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-[0.625rem] text-stk-grey-500 sm:text-base">
              {t('ALLOCATION_MEMORY')}
            </span>
            <span className="text-sm text-stk-white sm:text-lg">{`${memoryMin}/${memoryMax}`}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between sm:justify-center">
        {/* <div className="flex w-[9rem] items-center sm:w-[13rem]">
          <div className="w-[3.25rem] sm:w-[4.25rem]">
            <CircularProgressbarWithChildren
              strokeWidth={12}
              value={(100 * cpuMin) / cpuMax}
              styles={buildStyles({ strokeLinecap: 'butt', pathColor: '#aaff00' })}
            >
              <i className="fa-thin fa-floppy-disk text-stk-green" />
            </CircularProgressbarWithChildren>
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-[0.625rem] text-stk-grey-500 sm:text-base">
              {t('ALLOCATION_MEMORY')}
            </span>
            <span className="text-sm text-stk-white sm:text-lg">{`${memoryMin}/${memoryMax}`}</span>
          </div>
        </div> */}

        <div className="flex w-[9rem] items-center sm:w-[13rem]">
          <div className="w-[3.25rem] sm:w-[4.25rem]">
            <CircularProgressbarWithChildren
              strokeWidth={12}
              value={storageMax && storageMin ? (100 * storageMin) / storageMax : 0}
              styles={buildStyles({ strokeLinecap: 'butt', pathColor: '#aaff00' })}
            >
              <i className="fa-thin fa-microchip text-stk-green" />
            </CircularProgressbarWithChildren>
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-[0.625rem] text-stk-grey-500 sm:text-base">
              {t('ALLOCATION_STORAGE')}
            </span>
            <span className="text-sm text-stk-white sm:text-lg">{`${storageMin}/${storageMax}`}</span>
          </div>
        </div>

        <div className="flex w-[9rem] items-center sm:w-[13rem]">
          <div className="w-[3.25rem] sm:w-[4.25rem]">
            <CircularProgressbarWithChildren
              strokeWidth={12}
              value={bandwidthMin && bandwidthMax ? (100 * bandwidthMin) / bandwidthMax : 0}
              styles={buildStyles({
                strokeLinecap: 'butt',
                pathColor: '#aaff00',
                // trailColor: bandwidthMax ? '#D9D9D9' : '#2D3948',
              })}
            >
              <i
                className={`fa-light fa-wifi ${
                  bandwidthMax ? 'text-stk-green' : 'text-stk-blue-100'
                } text-xl`}
              />
            </CircularProgressbarWithChildren>
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-[0.625rem] text-stk-grey-500 sm:text-base">
              {t('ALLOCATION_BANDWIDTH')}
            </span>
            <span className="text-sm text-stk-white sm:text-lg">{`${bandwidthMin}/${bandwidthMax}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppHardware;
