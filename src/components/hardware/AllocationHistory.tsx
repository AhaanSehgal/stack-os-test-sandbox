import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiltersModal, Icon } from '@/components/common';
import { allocationHistory } from './helpers';
import SkeletonAllocationHistory from './skeletons/SkeletonAllocationHistory';

const AllocationHistory = () => {
    const { t } = useTranslation();
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="mt-28 flex h-full w-full flex-col justify-start">
            {loading ? (
                <SkeletonAllocationHistory />
            ) : (
                <>
                    <FiltersModal
                        showModal={isFilterOpen}
                        onCloseModal={() => setFilterOpen(false)}
                        title="Search Filters"
                        description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo."
                    >
                        <div className="flex">
                            <span className="mt-5 font-medium text-stk-white">Categories</span>
                        </div>
                    </FiltersModal>
                    <div className="grid grid-cols-12">
                        <h2 className="col-span-10 text-2xl font-semibold text-stk-white">
                            {t('HARDWARE_ALLOCATION_TITLE')}
                        </h2>
                        <div className="col-span-2 flex flex-row">
                            <div className="flex cursor-pointer select-none flex-row items-center">
                                <i className="fa-solid fa-arrow-up-wide-short mr-[0.6rem] ml-4 text-stk-green" />
                                <span className="text-base font-medium text-stk-white">
                                    {t('SORT')}
                                </span>
                            </div>
                            <div
                                onClick={() => setFilterOpen(true)}
                                className="flex cursor-pointer select-none flex-row items-center"
                            >
                                <i className="fa-solid fa-filter mr-[0.6rem] ml-4 text-stk-green" />
                                <span className="font-medium text-stk-white">{t('FILTER')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-11 divide-y divide-stk-blue-100">
                        <div className="grid w-full grid-cols-12 items-center justify-between px-8 pb-2 text-base font-semibold text-stk-grey-400">
                            <span className="col-span-6">
                                {t('HARDWARE_ALLOCATION_GRID_HEADER_1')}
                            </span>
                            <span className="col-span-4">
                                {t('HARDWARE_ALLOCATION_GRID_HEADER_2')}
                            </span>
                            <span className="col-span-2">
                                {t('HARDWARE_ALLOCATION_GRID_HEADER_3')}
                            </span>
                        </div>
                        {allocationHistory.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 px-8 py-6">
                                <div className="col-span-6 flex flex-row items-center gap-7">
                                    <div className="flex h-12 w-12 flex-col justify-center rounded-full bg-stk-grey-400">
                                        <div className="flex flex-row justify-center">
                                            <i
                                                className={`fa-solid ${item.icon} text-lg text-stk-blue-400`}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-semibold text-stk-white">
                                            {item.hardwareChange}
                                        </span>
                                        <span className="text-sm text-stk-grey-400">
                                            {item.change}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-4 flex flex-col justify-center">
                                    <div className="flex flex-row items-center justify-start gap-1">
                                        <Icon
                                            iconName="stackos-icon"
                                            width={16}
                                            height={16}
                                            layout="fixed"
                                        />
                                        <span className="text-lg font-semibold text-stk-white">
                                            {item.price}
                                        </span>
                                    </div>
                                    <span className="text-sm text-stk-white">STACK/Month</span>
                                </div>
                                <div className="col-span-2 flex flex-col justify-center">
                                    <span className="text-lg font-semibold text-stk-white">
                                        {item.dateChanged}
                                    </span>
                                    <span className="text-sm text-stk-grey-400">
                                        {item.hourChanged}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllocationHistory;
