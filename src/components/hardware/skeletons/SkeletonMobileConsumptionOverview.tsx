const SkeletonMobileConsumptionOverview = () => (
  <div className="mt-7 rounded-xl bg-stk-blue-300">
    <div className="grid animate-pulse grid-cols-2 divide-x divide-stk-blue-400">
      {Array.from(Array(4).keys()).map((item) => (
        <div key={item} className="flex flex-1 flex-col justify-start p-6">
          <span className="h-5 w-[5rem] rounded-md bg-stk-blue-400" />
          <span className="mt-5 h-2 w-[6.5rem] rounded-md bg-stk-blue-400" />
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonMobileConsumptionOverview;
