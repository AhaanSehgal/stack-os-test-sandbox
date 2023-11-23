/* eslint-disable no-unused-vars */
import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Icon from './Icon';

interface Props {
    dataCy?: string;
    selected?: number;
    dropdownOptions: any;
    className?: string;
    topOpenMargin?: number;
    children?: ReactNode;
    header?: string;
    arrow?: boolean;
    onChangeSelection: (value: any) => void;
}

const Dropdown = ({
    dataCy,
    selected,
    children,
    dropdownOptions,
    className,
    header,
    arrow,
    topOpenMargin,
    onChangeSelection,
}: Props) => (
    <Menu as="div" className="relative flex text-left">
        <div className={`${className} cursor-pointer`}>
            <Menu.Button
                data-cy={dataCy}
                className="flex w-full flex-row items-center outline-none"
            >
                {children}
                {arrow && (
                    <i className="fa-solid fa-chevron-down ml-auto text-xs text-stk-grey-200" />
                )}
            </Menu.Button>
        </div>

        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                style={{ top: topOpenMargin || 0 }}
                className="absolute right-0 z-50 w-[15.5rem] origin-top-right overflow-hidden rounded-md bg-[#1F2937] shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                {header && (
                    <div className="px-4 py-3">
                        <p className="text-base font-extralight text-[#F9FAFB]">{header}</p>
                    </div>
                )}
                <div className="py-1">
                    {dropdownOptions?.map((item: any, itemIdx: number) => (
                        <Menu.Item key={item.id} data-cy={`network-option-${itemIdx + 1}`}>
                            {({ active }) => (
                                <div
                                    className={`
                    ${
                        active || selected === item.id ? 'bg-[#374151]' : ''
                    } group relative flex cursor-pointer items-center px-4 py-2 text-sm text-white duration-300 hover:bg-stk-blue-400`}
                                    onClick={() => onChangeSelection(item)}
                                >
                                    {item.icon && (
                                        <Icon
                                            className="mr-3 flex items-center"
                                            iconName={item.icon}
                                        />
                                    )}
                                    <div className="flex flex-col justify-start">
                                        <span className="font-normal duration-300 group-hover:font-semibold">
                                            {item.title}
                                        </span>
                                        {item.subtitle && (
                                            <span className="font-extralight text-[#F9FAFB]">
                                                {item.subtitle}
                                            </span>
                                        )}
                                    </div>
                                    {selected === item.id && (
                                        <i
                                            className="fa-solid fa-check absolute inset-y-3 right-0 mr-3 h-5 w-5 items-center text-[#AAFF00]"
                                            aria-hidden
                                        />
                                    )}
                                </div>
                            )}
                        </Menu.Item>
                    ))}
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
);

export default Dropdown;
