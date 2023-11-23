import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { categories as categoriesFilters, sortOptions } from '../helpers';
import * as dataHelpers from '../utils';
import { FiltersModal, Dropdown, CheckItemGroup } from '@/components/common';
import { AppStoreApp } from '@/redux/app-store/types';
import { AppStoreActions } from '@/redux/app-store';
import SearchBar from '../SearchBar';
import CardVertical from '../CardVertical';
import CardHorizontal from './CardHorizontal';
import Pagination from '../Pagination';
import { useSelector } from '@/redux/hooks';

interface Category {
    id: number;
    value: string;
    label: string;
    selected?: boolean;
}

const SearchScreen = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { appStore } = useSelector((state) => state);
    const { apps } = appStore;

    const { query, page } = router.query;

    const [filteredApps, setFilteredApps] = useState<AppStoreApp[]>();

    const [currentAppPage, setCurrentAppPage] = useState<number>(Number(page || 1));

    const [order, setOrder] = useState<string | null>(null);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [gridView, setGridView] = useState(false);
    const [categories, setCategories] = useState<Category[]>(categoriesFilters);

    function handleSortTags(type: string) {
        if (filteredApps) setFilteredApps(dataHelpers.sort(filteredApps, type));
        setOrder(type);
    }

    function handleOpenApp(app: AppStoreApp) {
        dispatch(AppStoreActions.setSearchApp(app));

        router.push({
            pathname: `/app-store/search/${app?.appName}`,
        });

        localStorage.setItem('appStoreSearchQuery', (query as string) || '');
        localStorage.setItem('appStoreSearchPreviousPage', 'search');
    }

    function handleFilter(options?: Category[]) {
        const routerQuery: any = {};
        const categoriesQueryString: string[] = [];

        if (options) {
            options.forEach((option) => {
                if (option.selected) routerQuery[option.value] = option.label;
            });
        } else {
            categories.forEach(
                (category) => category.selected && categoriesQueryString.push(category.value)
            );

            if (query) routerQuery.query = query;
            if (categoriesQueryString.length) routerQuery.category = categoriesQueryString;
        }

        router.push({
            pathname: '/app-store/search',
            query: routerQuery,
        });
    }

    useEffect(() => {
        if (apps) {
            setFilteredApps(dataHelpers.filter(apps, router.query));
        }

        setCategories(
            categoriesFilters.map((category) => {
                if (category.value) {
                    if (
                        typeof router.query.category === 'object' &&
                        router.query.category.includes(category.value)
                    ) {
                        return { ...category, selected: true };
                        // eslint-disable-next-line no-else-return
                    } else if (category.value === router.query.category) {
                        return { ...category, selected: true };
                    }
                }
                return { ...category, selected: false };
            })
        );
    }, [router, apps]);

    return (
        <div className="flex flex-col duration-500">
            <FiltersModal
                showModal={isFilterOpen}
                onCloseModal={() => setFilterOpen(false)}
                onSaveFilters={() => {
                    setFilterOpen(false);
                    handleFilter();
                }}
                title="Search Filters"
                description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo."
            >
                <div className="flex flex-col">
                    <span className="mt-5 mb-3 font-medium text-stk-white">
                        {t('APP_STORE_FILTER_TITLE_1')}
                    </span>
                    <CheckItemGroup
                        options={categories}
                        changeFunction={(options: Category[]) => {
                            setCategories(options);
                        }}
                    />
                </div>
            </FiltersModal>

            <div className="mb-6 ">
                <Link href="/app-store" passHref>
                    <a className="items-center">
                        <i className="fa-regular fa-chevron-left mr-[0.6rem] text-stk-white" />
                        <span className="text-lg font-semibold text-stk-white">
                            {t('APP_STORE_BACK_TO_STORE')}
                        </span>
                    </a>
                </Link>
            </div>

            <SearchBar />

            <div className="mx-0 mt-10 flex justify-between duration-500 xl:mx-[5rem] 2xl:mx-[7.6rem]">
                <div className="flex flex-col">
                    <span className="text-stk-white">
                        {query
                            ? `"${query}" (${filteredApps?.length} ${t('RESULTS')})`
                            : `${filteredApps?.length} ${t('RESULTS')}`}
                    </span>
                    {Object.keys(router.query).length !== 0 && (
                        <div className="mt-1 flex items-center justify-center">
                            <span className="mr-2 whitespace-nowrap font-light text-stk-grey-400">
                                Filtering by:
                            </span>
                            <CheckItemGroup
                                closeButton
                                className="flex rounded-md bg-stk-grey-500 px-3 py-1 text-xs font-normal text-stk-white duration-300 hover:bg-stk-grey-600"
                                options={dataHelpers.formatRouterQuery(router.query)}
                                changeFunction={(options) => {
                                    handleFilter(options);
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-start">
                    <Dropdown
                        dropdownOptions={sortOptions.slice(0, 2)}
                        onChangeSelection={(option) => handleSortTags(option.type)}
                        selected={sortOptions.find((sort) => sort.type === order)?.id}
                    >
                        <div className="flex cursor-pointer select-none items-center">
                            <i className="fa-solid fa-arrow-up-wide-short mr-[0.6rem] text-stk-green" />
                            <span className="text-base font-medium text-stk-white">
                                {t('SORT')}
                            </span>
                        </div>
                    </Dropdown>
                    <div
                        onClick={() => setFilterOpen(true)}
                        className="flex cursor-pointer select-none items-center"
                    >
                        <i className="fa-solid fa-filter mr-[0.6rem] ml-4 text-stk-green" />
                        <span className="font-medium text-stk-white">{t('FILTER')}</span>
                    </div>
                    <span
                        onClick={() => setGridView((state) => !state)}
                        className="ml-4 cursor-pointer select-none text-stk-green"
                    >
                        {t(gridView ? 'FILTER_LIST_VIEW' : 'FILTER_GRID_VIEW')}
                    </span>
                </div>
            </div>
            {filteredApps?.length ? (
                <>
                    <ul
                        className={`mx-0 mt-9 grid xl:mx-[6rem] 2xl:mx-[9.5rem] ${
                            gridView ? 'grid-cols-3 gap-5' : 'grid-cols-1 gap-y-8'
                        } duration-500`}
                    >
                        {filteredApps
                            ?.slice(
                                currentAppPage > 1 ? 9 * (currentAppPage - 1) : 0,
                                9 * currentAppPage
                            )
                            .map((app, index) => (
                                <li
                                    data-cy={`search-card-${index}`}
                                    key={`search-${app.appName}`}
                                    className="mx-auto"
                                >
                                    <a
                                        className="cursor-pointer"
                                        onClick={() => handleOpenApp(app)}
                                    >
                                        {gridView ? (
                                            <CardVertical app={app} />
                                        ) : (
                                            <CardHorizontal app={app} />
                                        )}
                                    </a>
                                </li>
                            ))}
                    </ul>
                    {filteredApps?.length >= 10 && (
                        <div className="mt-14">
                            <Pagination
                                currentPage={currentAppPage}
                                totalPage={Math.ceil(Number(filteredApps?.length) / 9)}
                                onChangePage={(newPage) => {
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                    setCurrentAppPage(newPage);
                                }}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="mt-[11.4rem] flex flex-col items-center justify-center">
                    <div className="ml-10">
                        <Image
                            alt="empty-state-top"
                            src="/assets/app-store/search-empty-state.svg"
                            width={132}
                            height={125}
                        />
                    </div>
                    <span className="mt-11 max-w-[24rem] text-center text-2xl font-medium text-stk-grey-400">
                        {`${t('APP_STORE_EMPTY_SEARCH_1')} `}
                        <span className="font-bold">{`“${query}”`}</span>
                    </span>
                    <span className="mt-4 text-xl text-stk-grey-400">
                        {t('APP_STORE_EMPTY_SEARCH_2')}
                    </span>
                </div>
            )}
        </div>
    );
};

export default SearchScreen;
