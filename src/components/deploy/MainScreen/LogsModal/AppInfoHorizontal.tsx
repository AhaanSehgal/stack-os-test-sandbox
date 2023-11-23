import { useTranslation } from 'react-i18next';

interface Props {
  status: string;
}

function formatString(string: string) {
  return string.toLowerCase();
}

const AppInfoHorizontal = ({ status }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="flex child:mr-6">
        <div className="flex flex-col">
          <span className="text-xs font-normal text-stk-grey-500">{`% ${t('UPTIME')}`}</span>
          <span className="text-2xl font-normal text-stk-white">100%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-normal text-stk-grey-500">{t('DELAY')}</span>
          <span className="text-2xl font-normal text-stk-white">100ms</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-normal text-stk-grey-500">{t('RUNNING_TIME')}</span>
          <span className="text-2xl font-normal text-stk-white">02h15m</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-normal text-stk-grey-500">{t('STATUS')}</span>
          <span className="text-2xl font-normal capitalize text-stk-white">
            {formatString(status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppInfoHorizontal;
