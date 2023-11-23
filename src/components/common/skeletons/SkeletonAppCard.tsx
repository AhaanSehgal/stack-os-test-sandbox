const SkeletonAppCard = () => (
  <div className="group relative flex w-3/4 max-w-lg rounded-lg bg-stk-blue-300 px-10 pt-10 pb-9 shadow-xl duration-500 hover:shadow-2xl lg:w-[120%] 2xl:max-w-xl">
    <div className="w-full">
      <div className="mb-9 flex items-center justify-center">
        <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-md bg-stk-blue-400 2xl:h-10 2xl:w-10" />
        <span className="ml-2 mt-1 flex h-8 w-[9rem] items-center justify-center rounded-md bg-stk-blue-400 2xl:h-10 2xl:w-[10rem]" />
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto grid grid-cols-2 grid-rows-2 flex-wrap gap-2">
          <span className="h-20 w-20 rounded-full bg-stk-blue-400" />
          <span className="h-20 w-20 rounded-full bg-stk-blue-400" />
          <span className="h-20 w-20 rounded-full bg-stk-blue-400" />
          <span className="h-20 w-20 rounded-full bg-stk-blue-400" />
        </div>
        <span className="mt-5 h-8 w-[10rem] rounded-md bg-stk-blue-400" />
      </div>
    </div>
  </div>
);

export default SkeletonAppCard;
