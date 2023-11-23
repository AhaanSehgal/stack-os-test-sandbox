import Image from 'next/image';
import React from 'react';

export interface ListItem {
  id: string;
  chainId?: number;
  title: string;
  description: string;
  img: string;
}

interface Props {
  className?: string;
  header: string;
  data: any;
  // eslint-disable-next-line no-unused-vars
  onSelectItem?: (params: any) => any;
}

const StackedListSelect = ({ className, data, header, onSelectItem }: Props) => (
  <div className={`${className} overflow-hidden rounded-xl bg-stk-blue-300 shadow`}>
    <span
      data-cy="stacked-list-header"
      className="flex px-[1.5rem] py-[0.75rem] font-medium text-stk-grey-200"
    >
      {header}
    </span>
    <ul>
      {data.map((item: ListItem) => (
        <li data-cy={item.title} key={item.id}>
          <div
            className="block w-full cursor-pointer border-t-[1px] border-stk-blue-100 hover:bg-stk-blue-100"
            onClick={() => onSelectItem?.(item)}
          >
            <div className="flex items-center justify-center p-4 duration-500 md:px-6">
              <div className="flex min-w-0 flex-1 items-center">
                {item.img && (
                  <div className="relative mr-3 h-[3.7rem] w-[3.7rem] overflow-hidden rounded-full">
                    <Image src={item.img} alt={item.img} layout="fill" />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 pr-3">
                  <div>
                    <p className="font-medium text-stk-white">{item.title}</p>
                    <p className="flex items-center text-sm text-stk-grey-200">
                      <span className="truncate">{item.description}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default StackedListSelect;
