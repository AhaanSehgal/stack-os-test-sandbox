const SkeletonMobileAppCard = () => (
  <div className="group relative mt-6 flex max-h-[4.6rem] w-[20.5rem] rounded-lg bg-stk-blue-300 px-4 pt-4 pb-9 shadow-xl duration-500 hover:shadow-2xl">
    <div className="w-full">
      <div className="flex">
        <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-md bg-stk-blue-400" />
        <div>
          <span className="ml-4 mt-1 flex h-6 w-[7rem] items-center justify-center rounded-md bg-stk-blue-400" />
          <span className="ml-4 mt-1 flex h-4 w-[10.906rem] items-center justify-center rounded-md bg-stk-blue-400" />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonMobileAppCard;
