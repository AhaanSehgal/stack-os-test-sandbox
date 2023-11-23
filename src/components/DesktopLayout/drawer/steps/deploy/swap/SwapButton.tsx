import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

const SwapButton = ({ children, disabled, className = '' }: Props) => (
  <button
    type="button"
    className={`${className} w-full rounded-md border px-10 py-3 text-sm font-medium duration-300 ${
      disabled
        ? 'border-[#6B7280] bg-transparent text-[#6B7280]'
        : 'border-stk-green bg-stk-green text-stk-blue-200 hover:bg-[#99e448]'
    }`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default SwapButton;
