import { useTranslation } from 'react-i18next';
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SearchInput, Button } from '@/components/common';

const SearchBar = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [queryText, setQueryText] = useState('');

    const handleSearch = useCallback(() => {
        const routerQuery = { ...router.query };
        if (queryText) routerQuery.query = queryText || undefined;

        router.push({
            pathname: '/app-store/search',
            query: routerQuery,
        });
    }, [queryText]);

    useEffect(() => {
        setQueryText(String(router.query.query || ''));
    }, [router]);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
            }}
            className="flex w-full space-x-4"
        >
            <SearchInput
                id="search-input"
                value={queryText}
                onChange={(value) => setQueryText(value)}
                className="bg-[#F9FAFB]"
                width="w-full"
                placeholder={t('SEARCH_INPUT_PLACEHOLDER')}
            />
            <Button
                dataCy="search-button"
                onClick={handleSearch}
                className="bg-white py-0 px-5 duration-300 hover:bg-stk-grey-200"
            >
                <span className="text-lg font-medium text-stk-blue-200">{t('SEARCH')}</span>
            </Button>
        </form>
    );
};

export default SearchBar;
