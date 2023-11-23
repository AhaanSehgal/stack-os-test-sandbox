const SkeletonSubnetSelection = () => (
  <div className="w-full duration-500 flex flex-col">
    {Array.from(Array(7).keys()).map((item) => (
      <div key={item} className="w-full flex items-center bg-stk-blue-100 rounded-md p-3 my-1">
        <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-md bg-stk-blue-400 animate-pulse" />
        <span className="flex h-4 w-[7rem] items-center justify-center rounded-md bg-stk-blue-400 animate-pulse" />
        <span className="flex ml-1 h-3 w-3 items-center justify-center rounded-md bg-stk-blue-400 animate-pulse" />
      </div>
    ))}
  </div>
);

export default SkeletonSubnetSelection;
