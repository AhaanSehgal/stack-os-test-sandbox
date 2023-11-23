interface Props {
  max: string;
  used: string;
  icon: string;
}

const Resource = ({ max, used, icon }: Props) => (
  <div>
    <i className={`fa-light ${icon} text-stk-green`} />
    <span className="ml-1 text-base font-light text-stk-grey-400">{`${used}/${max}`}</span>
  </div>
);

export default Resource;
