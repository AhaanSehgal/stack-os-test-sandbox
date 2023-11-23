import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useAccount } from 'wagmi';
import { useSelector } from '@/redux/hooks';
import Button from '../../common/Button';
import { appDetailsTabs } from '../helpers';
import TabRegionDescription from './TabRegionDescription';
import TabRegionTags from './TabRegionTags';
import { setDrawerOpen, setDrawerStatus } from '@/redux/drawer/actions';
import { setSelectedApp } from '@/redux/app-store/actions';

const AppDetailsScreen = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const router = useRouter();
    const { isConnected } = useAccount();

    const { tab: tabQuery, appName, page } = router.query;
    const currentTab = tabQuery || 'description';

    const { appStore } = useSelector((state) => state);
    const { searchApp } = appStore;
    const previousPage = localStorage.getItem('appStoreSearchPreviousPage');

    function handleChangeTab(newTab: string) {
        router.push({
            pathname: `/app-store/search/${appName}`,
            query: { tab: newTab, page: page || 1 },
        });
    }

    function goBack() {
        const searchQuery = localStorage.getItem('appStoreSearchQuery');

        if (previousPage === 'search') {
            if (searchQuery)
                router.push({
                    pathname: `/app-store/search`,
                    query: {
                        query: searchQuery,
                    },
                });
            else {
                router.push({
                    pathname: `/app-store/search`,
                });
            }
        } else {
            router.push({
                pathname: `/app-store`,
            });
        }
    }

    return (
        <div className="flex flex-col">
            <div className="mb-6 flex">
                <a className="cursor-pointer" onClick={() => goBack()}>
                    <i className="fa-regular fa-chevron-left mr-[0.6rem] text-stk-white" />
                    <span className="text-lg font-semibold text-stk-white">
                        {t(
                            previousPage === 'search'
                                ? 'APP_STORE_BACK_TO_RESULTS'
                                : 'APP_STORE_BACK_TO_STORE'
                        )}
                    </span>
                </a>
            </div>
            <div className="mx-8 flex h-[7rem] overflow-hidden rounded-lg">
                <div className="relative h-[7rem] min-w-[10.6rem] duration-300">
                    {searchApp?.coverImage && (
                        <Image
                            src={searchApp?.coverImage || ''}
                            alt="metamask-logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    )}
                </div>

                <div className="flex w-full justify-between">
                    <div className="flex w-full flex-col text-ellipsis px-7">
                        <h1 className="text-2xl font-bold text-stk-white">{searchApp?.title}</h1>
                        <span className="mt-1 flex h-[2.8rem] w-full overflow-hidden text-ellipsis text-base text-[#6B7280]">
                            {searchApp?.description}
                        </span>
                        {/* <div className={`${searchApp?.price ? 'visible' : 'invisible'} mt-auto flex items-end`}>
              <Image
                alt="stackos-black-icon"
                src="/stackos-icon-black.svg"
                width={20}
                height={20}
              />
              <span className="ml-2 font-light leading-5 text-stk-white">{`${searchApp?.price} STACK/Month`}</span>
            </div> */}
                    </div>
                </div>

                <div className="my-auto block">
                    {isConnected && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(setDrawerOpen(true));
                                dispatch(setDrawerStatus('deploy-app'));
                                dispatch(setSelectedApp(searchApp?.appName));
                            }}
                            className="flex items-center duration-300 hover:bg-stk-white"
                        >
                            <i className="fa-regular fa-check mr-2" />
                            <span className="font-medium text-stk-blue-200">
                                {t('BUTTON_DEPLOY')}
                            </span>
                        </Button>
                    )}
                </div>
            </div>
            <div className="mt-16">
                <div className="border-b border-stk-blue-100">
                    <nav className="-mb-px flex space-x-4 px-16" aria-label="Tabs">
                        {appDetailsTabs.map((tab: string) => (
                            <div
                                data-cy={`tab-${tab}`}
                                key={tab}
                                className={`${
                                    tab === currentTab
                                        ? 'border-stk-green font-medium text-stk-green hover:border-stk-white hover:text-stk-white'
                                        : 'border-transparent font-normal text-stk-grey-400 hover:border-stk-grey-400 hover:text-stk-grey-200'
                                } cursor-pointer whitespace-nowrap border-b-4 px-3 pb-1 text-lg duration-300`}
                                aria-current={tab === currentTab ? 'page' : undefined}
                                onClick={() => handleChangeTab(tab)}
                            >
                                {t(tab.toUpperCase())}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {currentTab === 'description' ? <TabRegionDescription /> : <TabRegionTags />}
        </div>
    );
};

export default AppDetailsScreen;
