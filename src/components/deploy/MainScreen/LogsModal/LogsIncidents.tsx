import { Separator } from '@radix-ui/react-separator';
import { useTranslation } from 'react-i18next';
import { appLogs } from '../../helpers';

const LogsIncidents = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-10 max-h-[10.25rem]">
      <span className="text-xs leading-5 text-stk-white">{t('DEPLOY_LOGS_MODAL_INCIDENTS')}</span>
      {appLogs.map((item) => (
        <div key={item.day}>
          <div className="flex flex-col py-4">
            <span className="text-lg font-semibold leading-5 text-white">
              {`${t('JULY')} ${item.day}`}
            </span>
            <span className="mt-2 text-sm font-normal leading-5 text-[#cfcfcf]">
              {item.incidents}
            </span>
          </div>
          <Separator className="h-px w-full bg-[#2d374b]" />
        </div>
      ))}
    </div>
  );
};

export default LogsIncidents;
