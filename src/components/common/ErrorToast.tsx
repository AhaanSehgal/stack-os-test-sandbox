import React from 'react';

interface Props {
  errorMessage: string;
}

const ErrorToast = ({ errorMessage }: Props) => {
  const handleCopyText = () => {
    navigator.clipboard.writeText(errorMessage || '');
  };

  return (
    <span>
      {`${errorMessage.substring(0, 180)}...`}
      <i
        onClick={handleCopyText}
        className="fa-regular fa-copy cursor-pointer hover:text-stk-green h-5 w-5 pl-2 duration-500"
      />
    </span>
  );
};

export default ErrorToast;
