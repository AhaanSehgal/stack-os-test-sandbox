/* eslint-disable no-unused-vars */
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { Icon } from '@/components/common';

interface Token {
    id: number;
    title: string;
    icon: string;
    subtitle?: string;
}

interface Props {
    onClickOption?: () => void;
    onChangeInput?: (value: any) => void;
    value?: any;
    price?: number | null;
    disabled?: boolean;
    showPrice?: boolean;
    optionSelected?: Token;
    type: string;
    placeholder?: string;
    iconLeft?: boolean;
    fontSize?: number;
}

const SwapInput = ({
    value,
    price,
    disabled,
    showPrice,
    optionSelected,
    type = 'number',
    placeholder = '0.00',
    iconLeft,
    onClickOption = () => null,
    onChangeInput = () => null,
    fontSize = 24,
}: Props) => (
    <div data-cy="input" className="relative shadow-sm">
        {iconLeft && (
            <div className="absolute inset-y-0 left-0 flex items-start pl-2 pt-[10px] text-[#6B7280]">
                <BiSearch className="flex place-self-start text-xl" />
            </div>
        )}
        <div className={`child:bg-[#374151] ${iconLeft ? 'child:pl-8' : 'child:pl-3'}`}>
            <input
                data-cy={`swap-input-${disabled ? 'stack' : 'token'}`}
                type="string"
                name="price"
                id="price"
                min="0"
                step="any"
                style={{ fontSize: `${fontSize}px` }}
                className={`block h-full w-full pr-12 text-2xl font-normal text-white outline-0 ${
                    showPrice ? 'rounded-t-md pt-2' : 'rounded-md py-2'
                }`}
                placeholder={placeholder}
                aria-describedby="price-currency"
                value={value || ''}
                onKeyPress={(event) => {
                    if (
                        type === 'number' &&
                        ((value?.toString().includes('.') && event.key === '.') ||
                            (event.key !== '.' && !Number.isInteger(Number(event.key))))
                    ) {
                        event.preventDefault();
                    }
                }}
                onChange={(e) => onChangeInput(e.target.value)}
            />
            {showPrice && (
                <div className="flex h-full w-full flex-row items-center justify-start rounded-b-md pb-2">
                    <span className="text-base text-[#6B7280]">
                        {price ? `~ $${price.toFixed(4)}` : '-'}
                    </span>
                </div>
            )}
        </div>
        {showPrice && (
            <div className="absolute inset-y-0 right-0 flex items-start pr-3 pt-2">
                <span className="text-base text-[#6B7280]" id="price-currency">
                    {optionSelected?.id ? (
                        <div
                            data-cy="swap-home-token-selected"
                            className="flex flex-row items-center justify-center text-[#D1D5DB] hover:cursor-pointer"
                            onClick={() => onClickOption()}
                        >
                            <Icon className="mr-2 h-5 w-5" iconName={optionSelected.icon} />
                            <span className="pr-2 text-[#6B7280]">{optionSelected?.title}</span>
                            <BiChevronDown className="h-5 w-5" aria-hidden="true" />
                        </div>
                    ) : (
                        <div className="mr-2 flex flex-row items-center justify-center">
                            <Icon className="mr-2 h-5 w-5" iconName="stack-inverted" />
                            <span>STACK</span>
                        </div>
                    )}
                </span>
            </div>
        )}
    </div>
);

export default SwapInput;
