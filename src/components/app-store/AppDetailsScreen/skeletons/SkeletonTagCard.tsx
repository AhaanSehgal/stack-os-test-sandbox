interface Props {
  gridView: boolean;
}

const SkeletonTagCard = ({ gridView }: Props) => (
  <div className="mb-9 divide-y-[0.095rem] divide-stk-blue-100 rounded-2xl bg-stk-blue-200">
    <div className={`${gridView ? 'flex-col' : 'flex-row items-center'} flex justify-between p-7`}>
      <div className="my-1 h-4 w-48 animate-pulse rounded-full bg-stk-blue-400" />
      <div
        className={`${
          gridView ? 'mt-7 mb-6' : ''
        } h-5 w-64 animate-pulse rounded-full bg-stk-blue-400`}
      />
    </div>

    <div className="flex flex-col px-7 py-4">
      <div className="overflow-x-auto">
        <div className="flex items-center justify-end">
          <div className="h-5 w-5 animate-pulse rounded-full bg-stk-blue-400" />
          <div className="ml-2 h-5 w-48 animate-pulse rounded-full bg-stk-blue-400" />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonTagCard;
