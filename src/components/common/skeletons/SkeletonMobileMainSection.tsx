import SkeletonMobileAppCard from './SkeletonMobileAppCard';

const SkeletonMobileMainSection = () => (
  <div className="mt-7 flex w-[63.25rem] animate-pulse flex-col">
    <div className="flex w-full items-center justify-center ">
      <div className="flex">
        <span className="h-10 w-[10rem] rounded-md bg-stk-blue-300" />
        <span className="ml-8 h-10 w-[2.625rem]" />
        {/* To reactivate group function the line above should be replaced by: */}
        {/* <span className="ml-8 h-10 w-[2.625rem] rounded-md bg-stk-blue-300" /> */}
        <span className="ml-1 h-10 w-[2.625rem] rounded-md bg-stk-blue-300" />
        <span className="ml-1 h-10 w-[2.625rem] rounded-md bg-stk-blue-300" />
      </div>
    </div>
    <div>
      {Array.from(Array(4).keys()).map((item) => (
        <div key={item} className="flex flex-col items-center justify-center">
          <SkeletonMobileAppCard />
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonMobileMainSection;
