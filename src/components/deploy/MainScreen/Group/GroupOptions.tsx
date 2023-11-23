import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

interface Props {
  collapseFunction: () => void;
  isGroupOpen: boolean;
  editGroupTrigger: () => void;
}

const GroupOptions = ({ isGroupOpen, collapseFunction, editGroupTrigger }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="z-50 ml-auto flex text-stk-grey-500 opacity-0 duration-200 group-hover:opacity-100 child:ml-[0.625rem] child:outline-none">
      <i
        data-tip={t('DEPLOY_GROUP_OPTION2')}
        data-for="code"
        className="fa-regular fa-pen-to-square cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          editGroupTrigger();
        }}
      />
      <ReactTooltip
        id="code"
        place="top"
        effect="solid"
        backgroundColor="#DFDFDF"
        textColor="#1F2937"
        className="text-xs font-medium"
      />
      <i
        className={`fa-regular fa-chevron-down cursor-pointer duration-200 ${
          isGroupOpen ? 'rotate-180' : ''
        }`}
        data-tip={t('DEPLOY_GROUP_OPTION1')}
        data-for="code"
        onClick={collapseFunction}
      />
      <ReactTooltip
        id="code"
        place="top"
        effect="solid"
        backgroundColor="#DFDFDF"
        textColor="#1F2937"
        className="text-xs font-medium"
      />
    </div>
  );
};

export default GroupOptions;
