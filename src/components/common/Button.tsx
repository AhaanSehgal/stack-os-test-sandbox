import React, { ReactNode } from 'react';

type Props = {
  dataCy?: string;
  className?: string;
  children: ReactNode;
  isOutline?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button = React.forwardRef(
  (
    {
      dataCy,
      className = '',
      children,
      isOutline = false,
      onClick = () => null,
      disabled = false,
    }: Props,
    ref
  ) => (
    <button
      data-cy={dataCy}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        isOutline
          ? 'border border-stk-green bg-transparent text-stk-green'
          : 'bg-stk-green text-stk-blue-500 outline-none'
      } ${
        disabled ? 'opacity-30' : 'hover:bg-stk-white'
      }  rounded-md px-4 py-2 text-sm duration-300`}
    >
      {children}
    </button>
  )
);

export default Button;
