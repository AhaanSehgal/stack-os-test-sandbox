import AppInfo from './AppInfo';

interface Props {
  appName: string;
  appLink: string;
  status: string;
}

const MobileAppCardList = ({ appName, appLink, status }: Props) => (
  <div className="flex w-full py-4">
    <div className="mr-[1.35rem] flex w-full flex-col gap-y-[0.375rem]">
      <span className="text-sm font-medium text-white">
        {appName.substring(0, 8)}
        ...
      </span>
      <div className="flex max-w-xs">
        <i className="fa-regular fa-arrow-up-right-from-square mr-1 text-xs text-stk-grey-200" />

        <a
          target="blank"
          href={appLink && `https://${appLink}`}
          className="w-[5.438rem] truncate text-xs font-medium text-[#EBEBEB]"
        >
          {appLink || 'No link available'}
        </a>
      </div>
    </div>
    <AppInfo isHorizontal status={status} />
  </div>
);

export default MobileAppCardList;
