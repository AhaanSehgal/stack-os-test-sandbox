interface Props {
  width?: number;
}

const SkeletonBalanceToAdd = ({ width = 5 }: Props) => (
  // eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname
  <span className={`block ml-2 h-3 w-${width} rounded-md bg-stk-blue-400 animate-pulse`} />
);

export default SkeletonBalanceToAdd;
