import { useTranslation } from 'react-i18next';
// to reactivate groups function the line above should be replaced by:
// import { faArrowsToLine, faArrowUpWideShort, faList } from '@fortawesome/pro-solid-svg-icons';
import SearchInput from '@/components/common/SearchInput';

const MobileDeployHeader = ({ searchOnChange, searchValue, toggleCollapse, toggleView }: any) => {
    const { t } = useTranslation();

    return (
        <div className="mt-7 mb-4 flex w-full gap-x-2">
            <SearchInput
                onChange={searchOnChange}
                value={searchValue}
                className="w-[10rem] bg-stk-grey-400 placeholder:text-stk-grey-500"
                placeholder={t('DEPLOY_HEADER_INPUT_MOBILE')}
            />
            {/* <FontAwesomeIcon
        icon={faArrowUpWideShort}
        className="rounded-md bg-stk-blue-300 p-3 text-stk-green"
      /> */}

            {/* //TODO: Temporary removing list view */}
            {/* <i
        className="fa-solid fa-list rounded-md bg-stk-blue-300 p-3 text-stk-green"
        onClick={toggleView}
      /> */}
            <i
                className="fa-solid fa-arrows-to-line rounded-md bg-stk-blue-300 p-3 text-stk-green"
                onClick={toggleCollapse}
            />
        </div>
    );
};

export default MobileDeployHeader;
