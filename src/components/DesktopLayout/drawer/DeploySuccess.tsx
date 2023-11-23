import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, CopyField } from '@/components/common';
import { setDrawerOpen } from '@/redux/drawer/actions';
import { useSelector } from '@/redux/hooks';

const DeploySuccess = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { drawer } = useSelector((state) => state);
    const { drawerSuccessValues } = drawer;

    return (
        <div data-cy="drawer-success" className="flex h-full flex-col items-center justify-center">
            <Image src="/assets/drawer/deployed.png" alt="deployed" width={194} height={291} />
            <h3 className="my-8 text-3xl font-semibold text-stk-green">
                {drawerSuccessValues.updated
                    ? drawerSuccessValues.deployed
                        ? t('DRAWER_DEPLOYED')
                        : t('DRAWER_UPDATED')
                    : drawerSuccessValues.deployed
                    ? t('DRAWER_DEPLOYED')
                    : t('DRAWER_CREATED')}
            </h3>

            <div className="flex flex-col self-start ml-12 mb-10 gap-y-5">
                {/* <span className="text-stk-white text-sm font-semibold w-[22rem] truncate">
          {`${t('DRAWER_SUCCESS_MESSAGE_TYPE')}: `}
          <span className="font-normal">{drawerSuccessValues?.type}</span>
        </span> */}
                {/* <div className="flex cursor-pointer w-full">
          <div className="flex text-sm items-end font-semibold max-w-[21.8rem] duration-500">
            <span className="text-stk-white mr-1">{`${t('DRAWER_SUCCESS_DEPLOY_MESSAGE')}:`}</span>
            <CopyField
              text={drawerSuccessValues?.deployMessage || 'Success'}
              bodyClassName="flex items-end font-normal truncate"
              iconClassName="text-base font-light"
            />
          </div>
        </div> */}
                {drawerSuccessValues?.host && (
                    <div className="flex cursor-pointer w-full">
                        <div className="flex text-sm items-end font-semibold max-w-[21.8rem] duration-500">
                            <span className="text-stk-white mr-1">{`${t(
                                'DRAWER_SUCCESS_MESSAGE_HOST'
                            )}:`}</span>
                            <CopyField
                                text={drawerSuccessValues.host}
                                bodyClassName="flex items-end font-normal truncate"
                                iconClassName="text-base font-light"
                            />
                        </div>
                    </div>
                )}

                {/* <div className="flex cursor-pointer w-full">
          <div className="flex text-sm items-end font-semibold max-w-[21.8rem] duration-500">
            <span className="text-stk-white mr-1">
              {`${t('DRAWER_SUCCESS_MESSAGE_POINTS_TO')}:`}
            </span>
            <CopyField
              text={drawerSuccessValues?.pointsTo}
              bodyClassName="flex items-end font-normal truncate"
              iconClassName="text-base font-light"
            />
          </div>
        </div> */}
                {drawerSuccessValues?.externalDNS && (
                    <div className="flex cursor-pointer w-full">
                        <div className="flex text-sm items-end font-semibold max-w-[21.8rem] duration-500">
                            <span className="text-stk-white mr-1 whitespace-nowrap">
                                {`${t('DRAWER_SUCCESS_MESSAGE_EXTERNAL_DNS')}:`}
                            </span>
                            <CopyField
                                text={drawerSuccessValues?.externalDNS}
                                bodyClassName="flex items-end font-normal truncate"
                                iconClassName="text-base font-light"
                            />
                        </div>
                    </div>
                )}

                {/* <div className="flex cursor-pointer w-full">
          <div className="flex text-sm items-end font-semibold max-w-[21.8rem] duration-500">
            <span className="text-stk-white mr-1 whitespace-nowrap">
              {`${t('DRAWER_SUCCESS_MESSAGE_INTERNAL_DNS')}:`}
            </span>
            <CopyField
              text={drawerSuccessValues?.internalDNS}
              bodyClassName="flex items-end font-normal truncate"
              iconClassName="text-base font-light"
            />
          </div>
        </div> */}
            </div>

            <Button
                dataCy="drawer-button-deployed"
                className="w-[80%] font-medium"
                onClick={() => dispatch(setDrawerOpen(false))}
            >
                {t('DRAWER_SUCCESS')}
            </Button>
        </div>
    );
};

export default DeploySuccess;
