import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import SearchInput from '../../../common/SearchInput';
import { useSelector } from '@/redux/hooks';
import { Button, Dropdown } from '@/components/common';
import { AppStoreActions } from '@/redux/app-store';
import { sortOptions } from '../../helpers';
import TagCard from './TagCard';
import SkeletonTagCard from '../skeletons/SkeletonTagCard';
import Pagination from '../../Pagination';

const TabRegionTags = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const { appStore } = useSelector((state) => state);

    const { searchApp, loading } = appStore;
    const { appName, page, ordering, name } = router.query;

    const [order, setOrder] = useState(String(ordering || ''));
    const [currentPage, setCurrentPage] = useState<number>(Number(page || 1));
    const [queryText, setQueryText] = useState<string>((name as string) || '');
    const [gridView, setGridView] = useState(false);

    function requestTagsToAPI(newPage?: string | number, newOrdering?: string, newName?: string) {
        const query = {} as any;

        query.tab = 'tags';

        if (newPage) query.page = newPage;
        if (newOrdering) query.ordering = newOrdering;
        if (newName) query.name = newName;

        router.push({
            pathname: `/app-store/search/${appName}`,
            query,
        });
    }

    function handleSortTags(type: string) {
        if (!loading) {
            requestTagsToAPI(currentPage, type, queryText);

            dispatch(
                AppStoreActions.getAppTags(
                    searchApp?.necessaryApps?.[0]?.officialImage,
                    searchApp?.necessaryApps?.[0].image?.repository,
                    currentPage,
                    type,
                    queryText
                )
            );

            setOrder(type);
        }
    }

    function handleChangeTagsPage(newPage: number) {
        if (!loading) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            requestTagsToAPI(newPage, order, queryText);

            dispatch(
                AppStoreActions.getAppTags(
                    searchApp?.necessaryApps?.[0]?.officialImage,
                    searchApp?.necessaryApps?.[0].image?.repository,
                    newPage,
                    order,
                    queryText
                )
            );
        }
    }

    function handleSearchTags() {
        if (!loading) {
            requestTagsToAPI(currentPage, order, queryText);

            dispatch(
                AppStoreActions.getAppTags(
                    searchApp?.necessaryApps?.[0]?.officialImage,
                    searchApp?.necessaryApps?.[0].image?.repository,
                    currentPage,
                    order,
                    queryText
                )
            );
        }
    }

    useEffect(() => {
        setOrder((ordering as 'last_updated' | '-last_updated') || undefined);
        setCurrentPage(Number(page || 1));
        setQueryText((name as string) || '');
    }, [router.query]);

    useEffect(() => {
        if (searchApp && !searchApp?.tags) {
            dispatch(
                AppStoreActions.getAppTags(
                    searchApp?.necessaryApps?.[0]?.officialImage,
                    searchApp?.necessaryApps?.[0].image?.repository,
                    currentPage || 1,
                    order || '',
                    (name as string) || ''
                )
            );
        }
    }, [searchApp]);

    return searchApp?.tags?.results || loading ? (
        <div data-cy="tags" className="mx-8 mt-7">
            <div className="flex w-full items-center">
                <SearchInput
                    value={queryText}
                    onChange={(text) => setQueryText(text)}
                    width="w-[16.3rem]"
                    placeholder="Search for tags"
                />
                <Button
                    dataCy="search-button"
                    onClick={() => handleSearchTags()}
                    className="mr-4 ml-2 bg-white py-[0.4rem] px-5 duration-300 hover:bg-stk-grey-200"
                >
                    <span className="text-lg font-medium text-stk-blue-200">{t('SEARCH')}</span>
                </Button>
                <Dropdown
                    dropdownOptions={sortOptions}
                    onChangeSelection={(option) => handleSortTags(option.type)}
                    selected={sortOptions.find((sort) => sort.type === order)?.id}
                    topOpenMargin={34}
                >
                    <div className="flex cursor-pointer select-none items-center">
                        <i className="fa-regular fa-arrow-up-wide-short mr-[0.6rem] text-stk-green" />
                        <span className="text-base font-medium text-stk-white">{t('SORT')}</span>
                    </div>
                </Dropdown>
                <span
                    onClick={() => setGridView((state) => !state)}
                    className="invisible ml-4 cursor-pointer select-none text-stk-green md:visible"
                >
                    {t(gridView ? 'FILTER_LIST_VIEW' : 'FILTER_GRID_VIEW')}
                </span>
            </div>
            <ul
                className={`${
                    gridView ? 'grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                } mt-6 grid`}
            >
                {loading
                    ? Array.from(Array(10).keys()).map((loadItem) => (
                          <li key={loadItem}>
                              <SkeletonTagCard gridView={gridView} />
                          </li>
                      ))
                    : searchApp?.tags?.results?.map((tag) => (
                          <li key={tag.id}>
                              <TagCard
                                  gridView={gridView}
                                  tag={tag}
                                  price={Number(searchApp?.price || 0)}
                              />
                          </li>
                      ))}
            </ul>

            {searchApp?.tags?.results.length && searchApp.tags.count > 10 && (
                <Pagination
                    currentPage={currentPage}
                    totalPage={Math.ceil(searchApp.tags.count / 10)}
                    onChangePage={(newPage) => handleChangeTagsPage(newPage)}
                />
            )}
        </div>
    ) : (
        <div className="mx-8 mt-8 flex flex-col rounded-2xl bg-stk-blue-200 p-7">
            <div className="my-10 flex w-full flex-col">
                <i className="fa-solid fa-tag text-2xl text-stk-grey-500" />
                <span className="mt-3 w-full text-center text-stk-grey-500">
                    {t('APP_STORE_EMPTY_APP_TAGS')}
                </span>
            </div>
        </div>
    );
};

export default TabRegionTags;
