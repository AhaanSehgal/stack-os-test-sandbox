/* eslint-disable no-nested-ternary */
import { useSelector } from 'src/redux/hooks';
import { useTranslation } from 'react-i18next';
import { Separator } from '@radix-ui/react-separator';
import { useState, useEffect } from 'react';
import { Icon } from '@/components/common';
import Swap from './swap';
import { HardwareStackValues } from '../../helpers';
import { availablePlans } from './helpers';
import ResourceSummary from '../../ResourceSummary';

const Deploy = () => {
    const { t } = useTranslation();
    const { drawer, appStore, general } = useSelector((state) => state);
    // const { resourcesUsage, userResources, resourcesPrice, feesPrice } = general;
    const { selectedAppConfig, selectedApp, apps } = appStore;
    const { status, formValues } = drawer;

    return (
        <div data-cy="drawer-deploy" className="scrollbar flex h-full flex-col overflow-auto">
            <div
                className={`${
                    status === 'deploy-edit' || status === 'deploy-app' ? 'px-5' : 'px-6'
                } pt-10`}
            >
                <div className="mb-3 flex shrink-0 items-center text-xl font-bold text-stk-green">
                    {(status === 'deploy-form' ||
                        status === 'deploy-app' ||
                        status === 'purchase-resources') && (
                        <Icon
                            iconName="stack-inverted"
                            className="pr-1 leading-3"
                            layout="fixed"
                            width={20}
                            height={20}
                        />
                    )}
                    <span>
                        {status === 'deploy-app'
                            ? `${
                                  apps?.find((app) => app.appName === selectedApp)?.title ||
                                  selectedApp
                              } ${t('BUTTON_DEPLOY')}`
                            : t('DRAWER_STEP4_TITLE')}
                    </span>
                </div>
            </div>
            <div
                className={`${
                    status === 'deploy-form' ||
                    status === 'deploy-app' ||
                    status === 'purchase-resources'
                        ? 'mb-[4.5rem]'
                        : ''
                } ${
                    status === 'deploy-edit' || status === 'deploy-app' ? 'px-5' : 'px-6'
                } scrollbar flex h-0 flex-1 flex-col items-start justify-start overflow-y-scroll text-stk-white`}
            >
                <span className="mb-9 flex text-sm text-stk-white">
                    {t('DRAWER_STEP4_SUBTITLE')}
                </span>
                {status === 'purchase-resources' ? (
                    <>
                        <div className="w-full">
                            <Swap />
                        </div>
                        <Separator className="my-6 h-[0.5px] w-full bg-stk-white opacity-20" />
                    </>
                ) : (
                    <>
                        {/* <span className="font-semibold text-base text-white">Resources summary</span> */}
                        {/* <div className="text-right text-sm text-stk-white w-full">
              {hardwareStackValues.map((item) => (
                <div
                  key={item.id}
                  className="my-2 py-3 flex w-full flex-row items-center justify-between text-base text-stk-white border-stk-white/20 border-b-[0.5px]"
                >
                  <div className="flex flex-row justify-start">
                    {item.icon && <i className={`fa-regular w-4 h-4 ${item.icon} mr-1`} />}
                    {item.field && (
                      <span className="mx-1 text-sm">
                        {`${getHardwareValue(item.field)}/${getRemainingResources(item.field)}`}
                      </span>
                    )}
                    <span className="text-sm">{item.content}</span>
                  </div>
                  {getSummaryText(item)}
                </div>
              ))}
            </div>
            {replicas && replicas > 1 && (
              <div className="border-[0.5px] rounded border-stk-white/20 p-4 my-6 gap-2 flex flex-row justify-start items-center">
                <BiInfoCircle className="text-5xl duration-500" color="#CFCFCF" />
                <div className="text-stk-white text-sm">
                  Hardware usage varies proportionally to the number of replicas you chose to
                  deploy.
                  <span className="font-bold"> Replica Count </span>
                  is currently set to
                  <span className="font-bold">{` ${replicas}.`}</span>
                </div>
              </div>
            )} */}
                        <ResourceSummary />
                    </>
                )}
                {/* <div className="flex w-full flex-row gap-3">
          <Disclosure>
            {({ open, close }) => (
              <div className="bg-stk-blue-100 h-fit w-28 rounded-md duration-500">
                <Disclosure.Button
                  className={`flex w-full justify-end ${
                    open ? 'items-end' : 'items-start'
                  } items-center py-3 px-2 text-white duration-500 hover:text-stk-green`}
                >
                  <p className="text-sm font-semibold text-stk-white">{selectedPlan.title}</p>
                  <i
                    className={`fa-solid fa-chevron-down ${
                      open ? 'rotate-180' : ''
                    } ml-1 h-5 w-5 text-stk-white duration-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  style={{ transition: 'ease-in-out', transitionDuration: '500ms' }}
                  className="duration-500"
                >
                  <div className="text-sm font-bold text-stk-white">
                    {availablePlans.map((plan) => (
                      <span
                        key={plan.id}
                        className="flex w-full cursor-pointer flex-row items-center justify-center py-2 text-stk-grey-200 duration-300 last:rounded-b-md hover:bg-stk-grey-500"
                        onClick={() => {
                          setSelectedPlan(plan);
                          close();
                        }}
                      >
                        {plan.title}
                      </span>
                    ))}
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div className="bg-stk-blue-100 h-fit w-72 rounded-md p-3 duration-500">
                <Disclosure.Button className="flex h-5 w-full items-center justify-end text-white duration-500 hover:text-stk-green">
                  <div className="my-5 flex w-full flex-row items-center justify-end text-sm font-semibold text-stk-white">
                    <span>{`$ ${(Number(selectedPlanUSDTValue) * replicas)?.toFixed(2)} =`}</span>
                    <Icon
                      iconName="stack-inverted"
                      className="px-1 leading-3"
                      layout="fixed"
                      width={18}
                      height={18}
                    />
                    <span>{(Number(selectedPlanSTACKValue) * replicas)?.toFixed(2)}</span>
                  </div>
                  <i
                    className={`fa-solid fa-chevron-down ${
                      open ? 'rotate-180' : ''
                    } ml-2 h-5 w-5 text-stk-white duration-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  style={{ transition: 'ease-in-out', transitionDuration: '500ms' }}
                  className="mt-4 duration-500"
                >
                  <div className="text-right text-sm font-bold text-stk-white">
                    {hardwareStackValues.map((item) => (
                      <div
                        key={item.id}
                        className="my-2 flex w-full flex-row items-center justify-end text-stk-white"
                      >
                        {item.icon && <i className={`fa-regular ${item.icon} mr-1`} />}
                        {item.field && (
                          <span className="mr-1 text-sm font-bold">
                            {getHardwareValue(item.field)}
                          </span>
                        )}
                        <span className="text-sm font-bold">{`${item.content} = $`}</span>
                        <span className="text-sm font-bold">
                          {` ${getStackValue(item.field, 'priceUSDT')} (`}
                        </span>
                        <Icon
                          iconName="stack-inverted"
                          className="pr-1 leading-3"
                          layout="fixed"
                          width={12}
                          height={12}
                        />
                        <span className="text-sm font-bold">
                          {`${getStackValue(item.field, 'priceSTACK')} )`}
                        </span>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div> */}
                {/* <div className="my-3 ml-auto flex w-[15rem] flex-row items-center justify-end">
          <span className="whitespace-nowrap text-base font-medium text-stk-green">
            Available Stack
          </span>
          <Icon
            iconName="stackos-icon"
            width={16}
            height={16}
            className="ml-2 leading-3"
            layout="fixed"
          />
          <BalanceInfo className="mx-2 overflow-hidden text-ellipsis text-stk-green" />
        </div> */}
            </div>
        </div>
    );
};

export default Deploy;
