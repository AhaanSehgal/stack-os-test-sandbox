import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ReactTooltip from 'react-tooltip';

interface Props {
  cpuMin: number;
  cpuMax: number;
  memoryMin: number;
  memoryMax: number;
  storageMin?: number;
  storageMax?: number;
  bandwidthMin?: number;
  bandwidthMax?: number;
}

const AppHardware = ({
  cpuMin,
  cpuMax,
  memoryMin,
  memoryMax,
  storageMin,
  storageMax,
  bandwidthMin,
  bandwidthMax,
}: Props) => (
  <div className="w-4/5">
    <div className="mb-4 flex w-full xl:mb-7">
      <div
        className="mr-4"
        data-tip={`${cpuMax && cpuMin ? ((100 * cpuMin) / cpuMax).toFixed(2) : 0}%`}
        data-for="cpu"
      >
        <CircularProgressbarWithChildren
          strokeWidth={12}
          value={cpuMin && cpuMax ? (100 * cpuMin) / cpuMax : 0}
          styles={buildStyles({ strokeLinecap: 'butt', pathColor: '#aaff00' })}
        >
          <i className="fa-light fa-microchip text-xl text-stk-green" />
        </CircularProgressbarWithChildren>
        <ReactTooltip
          id="cpu"
          place="top"
          effect="solid"
          backgroundColor="#DFDFDF"
          textColor="#1F2937"
          className="text-xs font-medium"
        />
      </div>

      <div
        data-tip={
          storageMax
            ? `${storageMax && storageMin ? ((100 * storageMin) / storageMax).toFixed(2) : 0}%`
            : 'Inactive'
        }
        data-for="storage"
      >
        <CircularProgressbarWithChildren
          strokeWidth={12}
          value={storageMax && storageMin ? (100 * storageMin) / storageMax : 0}
          styles={buildStyles({
            strokeLinecap: 'butt',
            pathColor: storageMax ? '#aaff00' : '#898989',
            trailColor: storageMax ? '#D9D9D9' : '#2D3948',
          })}
        >
          <i
            className={`fa-light fa-box-archive ${
              storageMax ? 'text-stk-green' : 'text-stk-blue-100'
            } text-xl`}
          />
        </CircularProgressbarWithChildren>
        <ReactTooltip
          id="storage"
          place="top"
          effect="solid"
          backgroundColor="#DFDFDF"
          textColor="#1F2937"
          className="text-xs font-medium"
        />
      </div>
    </div>

    <div className="flex">
      <div
        className="mr-4"
        data-tip={`${memoryMax && memoryMin ? ((100 * memoryMin) / memoryMax).toFixed(2) : 0}%`}
        data-for="memory"
      >
        <CircularProgressbarWithChildren
          strokeWidth={12}
          value={memoryMin && memoryMax ? (100 * memoryMin) / memoryMax : 0}
          styles={buildStyles({ strokeLinecap: 'butt', pathColor: '#aaff00' })}
        >
          <i className="fa-light fa-sd-card text-xl text-stk-green" />
        </CircularProgressbarWithChildren>
        <ReactTooltip
          id="memory"
          place="top"
          effect="solid"
          backgroundColor="#DFDFDF"
          textColor="#1F2937"
          className="text-xs font-medium"
        />
      </div>
      <div
        data-tip={`${
          bandwidthMax && bandwidthMin ? ((100 * bandwidthMin) / bandwidthMax).toFixed(2) : 0
        }%`}
        data-for="bandwidth"
      >
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
        <ReactTooltip
          id="bandwidth"
          place="top"
          effect="solid"
          backgroundColor="#DFDFDF"
          textColor="#1F2937"
          className="text-xs font-medium"
        />
      </div>
    </div>
  </div>
);

export default AppHardware;
