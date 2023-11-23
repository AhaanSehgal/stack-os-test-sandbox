import SkeletonAppCard from './SkeletonAppCard';

const SkeletonMainSection = () => (
  <div className="flex w-[43.8rem] animate-pulse flex-col lg:w-[52.75rem] xl:w-[72.6rem]">
    <div className="flex w-full flex-row items-center justify-between ">
      <div className="flex">
        <span className="h-9 w-[15.5rem] rounded-md bg-stk-blue-300" />
      </div>
      <div className="flex">
        <span className="ml-4 h-9 w-[9rem] rounded-md bg-stk-blue-300" />
      </div>
    </div>
    <div className="mt-6 grid w-[50rem] grid-cols-2 gap-y-8 lg:grid-cols-3 lg:gap-x-20 xl:w-[70rem] xl:grid-cols-4">
      {Array.from(Array(8).keys()).map((item) => (
        <div key={item} className="">
          <SkeletonAppCard />
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonMainSection;
