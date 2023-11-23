const SkeletonConsumptionOverview = () => (
  <>
    <div className="-mt-14 flex animate-pulse flex-row items-center justify-between">
      <span className="h-10 w-[18rem] rounded-md bg-stk-blue-300" />
    </div>
    <div className="mt-7 rounded-xl bg-stk-blue-300">
      <div className="flex animate-pulse flex-row divide-x divide-stk-blue-400">
        {Array.from(Array(4).keys()).map((item) => (
          <div key={item} className="flex flex-1 flex-col justify-start p-6">
            <span className="h-11 w-[12.6rem] rounded-md bg-stk-blue-400" />
            <span className="mt-5 h-3 w-[12.6rem] rounded-md bg-stk-blue-400" />
          </div>
        ))}
      </div>
    </div>
    <span className="mt-12 h-10 w-[18rem] rounded-md bg-stk-blue-300" />
    <div className="mt-7 rounded-xl bg-stk-blue-300">
      <div className="flex  animate-pulse flex-row divide-x divide-stk-blue-400">
        <div className="flex flex-1 flex-col justify-start p-6">
          <span className="ml-24 h-11 w-[16rem] rounded-md bg-stk-blue-400" />
          <span className="mt-12 ml-24 h-24 w-[15rem] rounded-md bg-stk-blue-400" />
          <span className="mt-5 mb-7 ml-24 h-10 w-[21rem] rounded-md bg-stk-blue-400" />
        </div>
      </div>
    </div>
  </>
);

export default SkeletonConsumptionOverview;
