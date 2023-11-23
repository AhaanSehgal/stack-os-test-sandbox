import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { setDrawerOpen, setDrawerStatus, setUpdateFormFlag } from '@/redux/drawer/actions';

const DeployHome = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
        <span>{t('DRAWER_NEW_DEPLOY_TITLE')}</span>
      </div>
      <div className="h-0 flex-1 overflow-y-auto">
        <div className="mt-14 flex flex-col items-start justify-start px-6">
          <span className="text-base text-stk-white">{t('DRAWER_NEW_DEPLOY_SUBTITLE')}</span>
          <div
            data-cy="drawer-deploy-option-1"
            className="my-5 flex h-36 w-full flex-row items-center justify-start rounded-md border border-solid border-stk-green duration-300 hover:cursor-pointer hover:shadow-[0px_0px_11px_2px_rgb(170,255,0,0.2)]"
            onClick={() => {
              dispatch(setUpdateFormFlag(true));
              dispatch(setDrawerStatus('deploy-form'));
            }}
          >
            <div className="mx-5">
              <Image
                alt="hand wrench"
                src="/assets/drawer/hand-wrench.svg"
                width={85}
                height={52}
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-lg font-semibold text-stk-grey-300">
                {t('DRAWER_NEW_DEPLOY_OPTION1')}
              </span>
              <span className="max-w-[13rem] text-sm text-stk-grey-300">
                {t('DRAWER_NEW_DEPLOY_OPTION1_TEXT')}
              </span>
            </div>
          </div>
          <div
            data-cy="drawer-deploy-option-1"
            className="my-5 flex h-36 w-full flex-row items-center justify-start rounded-md border border-solid border-stk-green duration-300 hover:cursor-pointer hover:shadow-[0px_0px_11px_2px_rgb(170,255,0,0.2)]"
            onClick={() => {
              dispatch(setUpdateFormFlag(true));
              dispatch(setDrawerStatus('upload-form'));
            }}
          >
            <div className="mx-5">
              <Image alt="hand wrench" src="/assets/drawer/files.svg" width={80} height={80} />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-lg font-semibold text-stk-grey-300">File Upload</span>
              <span className="max-w-[13rem] text-sm text-stk-grey-300">
                You are going to upload static files
              </span>
            </div>
          </div>
          {/* <Link href="/app-store"> */}
          <a
            data-cy="drawer-deploy-option-2"
            // TODO: Disabling this option for now, later uncomment below line and remove current className
            // className="my-5 flex h-36 w-full flex-row items-center justify-start rounded-md border border-solid border-stk-green duration-300 hover:cursor-pointer hover:shadow-[0px_0px_11px_2px_rgb(170,255,0,0.2)]"
            className="my-5 flex h-36 w-full flex-row items-center justify-start rounded-md border border-solid border-stk-green duration-300 opacity-40"
            onClick={() => dispatch(setDrawerOpen(false))}
          >
            <div className="mx-5">
              <Image alt="monitor" src="/assets/drawer/monitor.svg" width={85} height={52} />
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <span className="text-lg font-semibold text-stk-grey-300">
                {t('DRAWER_NEW_DEPLOY_OPTION2')}
              </span>
              <span className="max-w-[16rem] text-sm text-stk-grey-300">
                {t('DRAWER_NEW_DEPLOY_OPTION2_TEXT')}
              </span>
            </div>
          </a>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default DeployHome;
