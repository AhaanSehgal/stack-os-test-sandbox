interface Props {
  status: string;
  isHorizontal?: boolean;
}

function formatString(string: string) {
  return string.toLowerCase();
}

const AppInfo = ({ status, isHorizontal }: Props) => (
  <div className={`${isHorizontal ? 'flex gap-4 xl:gap-7' : 'w-full'}`}>
    {/* <div
      className={`${
        isHorizontal ? 'hidden gap-4 sm:flex xl:gap-7' : 'hidden grid-cols-2 space-x-3 sm:grid'
      }`}
    >
      <div className="flex flex-col">
        <span className="whitespace-nowrap text-xs font-normal text-stk-grey-500">% Uptime</span>
        <span
          className={`font-normal capitalize text-stk-white ${
            isHorizontal ? 'mt-1 text-xl' : 'text-2xl'
          }`}
        >
          100%
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-normal text-stk-grey-500">Delay</span>
        <span
          className={`font-normal capitalize text-stk-white ${
            isHorizontal ? 'mt-1 text-xl' : 'text-2xl'
          }`}
        >
          100ms
        </span>
      </div>
    </div> */}
    <div className={`${isHorizontal ? 'flex gap-4 xl:gap-7' : 'grid grid-cols-2 space-x-3'}`}>
      {/* <div className="hidden flex-col sm:flex">
        <span className="text-xs font-normal text-stk-grey-500">Running time</span>
        <span
          className={`font-normal capitalize text-stk-white ${
            isHorizontal ? 'mt-1 text-xl' : 'text-2xl'
          }`}
        >
          02h15m
        </span>
      </div> */}
      <div className="flex flex-col">
        <span className="text-xs font-normal text-stk-grey-500">Status</span>
        <span
          className={`font-normal capitalize text-stk-white ${
            isHorizontal ? 'mt-1 text-xl' : 'text-2xl'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  </div>
);

export default AppInfo;
