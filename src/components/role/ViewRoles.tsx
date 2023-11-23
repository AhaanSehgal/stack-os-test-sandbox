/* eslint-disable array-callback-return */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Pagination from '../app-store/Pagination';
import Button from '../common/Button';
import SearchInput from '../common/SearchInput';
import SkeletonViewRoles from './skeletons/SkeletonViewRoles';
import ViewRoleCard from './ViewRoleCard';
import { AddressRole } from '@/utils/types';

interface Props {
    addresses: AddressRole;
    loading: boolean;
    revokeRole: any;
    isRoleRevoking: boolean;
}

const ViewRoles = ({ addresses, loading, revokeRole, isRoleRevoking }: Props) => {
    const router = useRouter();
    const { t } = useTranslation();

    const { page } = router.query;

    const [currentPage, setCurrentPage] = useState<number>(Number(page || 1));
    const [queryText, setQueryText] = useState<string>('');
    const [filteredAddresses, setFilteredAddresses] = useState(addresses);
    const [gridView, setGridView] = useState(false);

    useEffect(() => {
        setCurrentPage(Number(page || 1));
        setQueryText('');
        setFilteredAddresses(addresses);
    }, [router.query, addresses]);

    function handleChangeRolesPage(newPage: number) {
        if (!loading) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    function handleSearchRoles() {
        if (!loading) {
            const res: AddressRole = {};

            Object.entries(addresses).map(([address, roles]) => {
                if (address.includes(queryText)) {
                    res[address] = roles;
                }
            });

            setFilteredAddresses(res);
        }
    }

    return Object.keys(addresses).length || loading ? (
        <div data-cy="tags" className="mx-8 mt-7">
            <div className="flex w-full items-center">
                <SearchInput
                    value={queryText}
                    onChange={(text) => setQueryText(text)}
                    width="w-[16.3rem]"
                    placeholder="Search for address"
                />
                <Button
                    dataCy="search-button"
                    onClick={() => handleSearchRoles()}
                    className="mr-4 ml-2 bg-white py-[0.4rem] px-5 duration-300 hover:bg-stk-grey-200"
                >
                    <span className="text-lg font-medium text-stk-blue-200">{t('SEARCH')}</span>
                </Button>
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
                              <SkeletonViewRoles gridView={gridView} />
                          </li>
                      ))
                    : Object.entries(filteredAddresses).map(([address, roles]) => (
                          <li key={address}>
                              <ViewRoleCard
                                  gridView={gridView}
                                  address={address}
                                  roles={Object.keys(roles)}
                                  revokeRole={revokeRole}
                                  isRoleRevoking={isRoleRevoking}
                              />
                          </li>
                      ))}
            </ul>

            {Object.keys(filteredAddresses).length > 10 && (
                <Pagination
                    currentPage={currentPage}
                    totalPage={Math.ceil(Object.keys(filteredAddresses).length / 10)}
                    onChangePage={(newPage) => handleChangeRolesPage(newPage)}
                />
            )}
        </div>
    ) : (
        <div className="mx-8 mt-8 flex flex-col rounded-2xl bg-stk-blue-200 p-7">
            <div className="my-10 flex w-full flex-col">
                <i className="fa-solid fa-bookmark text-2xl text-stk-grey-500" />
                <span className="mt-3 w-full text-center text-stk-grey-500">No roles found</span>
            </div>
        </div>
    );
};

export default ViewRoles;
