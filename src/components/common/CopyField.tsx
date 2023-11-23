import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

interface Props {
  text?: string;
  copyText?: string;
  bodyClassName?: string;
  textClassName?: string;
  iconClassName?: string;
}

const CopyField = ({ text, copyText, bodyClassName, textClassName, iconClassName }: Props) => {
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(copyText || text || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <>
      <div
        onClick={handleCopyText}
        data-tip=""
        data-for="clipboard"
        className={`${bodyClassName} ${
          isCopied ? 'text-stk-green' : 'text-stk-white'
        } duration-500`}
      >
        <span
          data-cy="header-address"
          className={`${textClassName} ${
            isCopied ? 'text-stk-green' : 'text-stk-white'
          } mr-2 w-full overflow-hidden text-ellipsis whitespace-nowrap duration-500`}
        >
          {text || ''}
        </span>
        <i
          className={`${iconClassName} fa-regular fa-copy ${
            isCopied ? 'text-stk-green' : 'text-stk-white'
          } duration-500`}
        />
      </div>
      <ReactTooltip
        id="clipboard"
        place="bottom"
        effect="solid"
        backgroundColor="#DFDFDF"
        textColor="#1F2937"
        className="w-40 text-center text-xs font-medium"
        getContent={() => (isCopied ? t('COPIED') : t('CLIPBOARD'))}
      />
    </>
  );
};

export default CopyField;
