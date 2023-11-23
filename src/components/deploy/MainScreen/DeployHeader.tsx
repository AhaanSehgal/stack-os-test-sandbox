// to reactivate group functionality, just need to uncomment or follow the commented code in: this file, SkeletonMainSection.tsx, SkeletonMobileMainSection.tsx, MobileDeployHeader.tsx
import { useTranslation } from 'react-i18next';
import { SearchInput } from '@/components/common';

const DeployHeader = ({ toggleView, isCardView, searchValue, searchOnChange }: any) => {
    const { t } = useTranslation();

    return (
        <div className="mb-9 flex w-full justify-between self-center">
            <div className="flex items-center">
                <SearchInput
                    onChange={searchOnChange}
                    value={searchValue}
                    className="w-[13.7rem] bg-stk-grey-400 placeholder:text-stk-grey-500"
                    placeholder={t('DEPLOY_HEADER_INPUT')}
                />
                {/* <div className="flex items-center">
          <FontAwesomeIcon
            icon={faArrowUpWideShort}
            className="mr-[0.6rem] ml-4 text-base text-stk-green"
          />
          <span className="text-base font-medium text-stk-white">{t('DEPLOY_HEADER_SORT')}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFilter} className="mr-[0.6rem] ml-6 text-base text-stk-green" />
          <span className="text-base font-medium text-stk-white">{t('DEPLOY_HEADER_FILTER')}</span>
        </div> */}
            </div>
            {/* <div className="ml-2 flex items-center"> */}
            {/* //TODO: Temporary removing list view */}
            {/* <button type="button" className="flex items-center" onClick={toggleView}>
          <i
            className={`fa-solid ${
              !isCardView ? 'fa-card-blank' : 'fa-list'
            } mr-[0.6rem] text-base text-stk-green`}
          />
          <span className="text-base font-medium text-stk-white">
            {!isCardView ? t('DEPLOY_HEADER_CARD') : t('DEPLOY_HEADER_LIST')}
          </span>
        </button> */}

            {/* <FontAwesomeIcon
          onClick={toggleCollapse}
          icon={faArrowsLeftRightToLine}
          className="ml-10 mr-8 rotate-90 cursor-pointer text-base text-stk-green"
        />
        <Button
          dataCy="new-group-button"
          onClick={() => {
            openNewGroupModal();
            dispatch(setIsEdit(false));
            dispatch(setGroupName(''));
            dispatch(setSelectedGroupApps([]));
          }}
          className="bg-[#e4e4e4] text-xs font-medium text-stk-blue-500 lg:text-base"
        >
          <FontAwesomeIcon icon={faLayerPlus} className="mr-2" />
          {t('DEPLOY_HEADER_NEW')}
        </Button> */}
            {/* </div> */}
        </div>
    );
};

export default DeployHeader;
