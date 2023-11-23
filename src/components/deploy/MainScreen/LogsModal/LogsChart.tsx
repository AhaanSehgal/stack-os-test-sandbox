/* eslint-disable react/jsx-one-expression-per-line */
import { Separator } from '@radix-ui/react-separator';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import { Select } from '@/components/common';
import { appLogs } from '../../helpers';

const LogsChart = () => {
    const { t } = useTranslation();

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const getChartColor: any = {
        on: 'bg-stk-green',
        off: 'bg-[#e4761b]',
        '': 'bg-stk-blue-100',
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <span className="text-sm leading-5 text-stk-white">
                    {t('DEPLOY_LOGS_MODAL_CHART_TITLE')}
                </span>
                <Select
                    className="w-[10rem] rounded-md border-[1px] border-stk-blue-100 py-1 px-4 text-stk-white"
                    options={[{ id: 1, label: 'July 2022', value: 1 }]}
                />
            </div>
            <div>
                <div className="mt-[0.85rem] flex justify-between">
                    {appLogs.map((item) => (
                        <div key={item.day}>
                            <div
                                data-for={`code${item.day}`}
                                data-tip
                                className={`h-[3.25rem] w-[1.13rem] ${getChartColor[item.wasOn]}`}
                            />
                            {item.wasOn && (
                                <ReactTooltip
                                    id={`code${item.day}`}
                                    place="top"
                                    effect="solid"
                                    backgroundColor="#DFDFDF"
                                    textColor="#1F2937"
                                    className="text-xs font-medium"
                                >
                                    {item.wasOn === 'on' && (
                                        <div className="flex flex-col py-2">
                                            <span className="text-base font-semibold leading-5 text-stk-blue-500">
                                                {`${t('JULY')} ${item.day}`}
                                            </span>
                                            <span className="mt-4 text-sm font-normal leading-5 text-stk-grey-500">
                                                {t('DEPLOY_LOGS_MODAL_TOOLTIP_UP')}
                                            </span>
                                        </div>
                                    )}
                                    {item.wasOn === 'off' && (
                                        <div className="py-2">
                                            <span className="text-base font-semibold leading-5 text-stk-blue-500">
                                                {`${t('JULY')} ${item.day}`}
                                            </span>
                                            <div className="my-4 flex items-center">
                                                <i className="fa-regular fa-circle-info mr-2" />
                                                <span className="mr-6 text-sm font-semibold leading-5 text-stk-blue-500">
                                                    {t('DEPLOY_LOGS_MODAL_TOOLTIP_DOWN')}
                                                </span>
                                                <span>
                                                    <span className="font-semibold">1</span>
                                                    {t('HRS')}
                                                    <span className="ml-2 font-semibold">30</span>
                                                    {t('MINS')}
                                                </span>
                                            </div>
                                            <span className="text-sm font-normal leading-5 text-stk-grey-500">
                                                {t('DEPLOY_LOGS_MODAL_TOOLTIP_UP')}
                                            </span>
                                        </div>
                                    )}
                                </ReactTooltip>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex w-full items-center justify-between">
                    <span className="text-[0.625rem] text-[#cfcfcf]">{`${t('JULY')} 1`}</span>
                    <Separator className="h-px w-[39.688rem] bg-[#2D374B]" />
                    <span className="text-[0.625rem] text-[#cfcfcf]">{`${t('JULY')} 30`}</span>
                </div>
            </div>
        </div>
    );
};

export default LogsChart;
