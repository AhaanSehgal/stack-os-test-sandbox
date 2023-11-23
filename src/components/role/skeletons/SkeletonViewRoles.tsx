interface Props {
  gridView: boolean;
}

const SkeletonViewRoles = ({ gridView }: Props) => (
  <div className="mb-9 divide-y-[0.095rem] divide-stk-blue-100 rounded-2xl bg-stk-blue-200">
    <div className={`${gridView ? 'flex-col' : 'flex-row items-center'} flex justify-between p-7`}>
      <div className="my-1 h-4 w-48 animate-pulse rounded-full bg-stk-blue-400" />
      <div className="flex gap-3">
        <div
          className={`${
            gridView ? 'mt-3' : ''
          } h-5 w-10 animate-pulse rounded-full bg-stk-blue-400`}
        />
        <div
          className={`${
            gridView ? 'mt-3' : ''
          } h-5 w-20 animate-pulse rounded-full bg-stk-blue-400`}
        />
      </div>
    </div>
  </div>
);

export default SkeletonViewRoles;
