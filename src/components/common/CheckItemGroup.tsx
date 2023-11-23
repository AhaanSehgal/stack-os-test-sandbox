import React from 'react';
import { useTranslation } from 'react-i18next';

interface Item {
  id: number;
  value: string;
  label: string;
  selected?: boolean;
}

interface Props {
  className?: string;
  options: Item[];
  // eslint-disable-next-line no-unused-vars
  changeFunction?: (options: Item[]) => void;
  closeButton?: boolean;
  dataCy?: string;
}

const CheckItemGroup = ({ className, options, changeFunction, closeButton, dataCy }: Props) => {
  const { t } = useTranslation();

  function handleChange(id: number) {
    const newOptions = [...options];
    const index = newOptions.findIndex((option) => option.id === id);
    newOptions[index].selected = !newOptions[index].selected;

    changeFunction?.(newOptions);
  }

  return (
    <ul id={dataCy} data-cy={dataCy} className="flex w-full gap-x-2">
      {options.map((item) => (
        <a key={item.id} className="cursor-pointer" onClick={() => handleChange(item.id)}>
          <li
            className={`${className} ${
              item.selected
                ? 'text-stk-black bg-stk-green hover:bg-[#84c700]'
                : 'bg-stk-blue-100 text-stk-white hover:bg-stk-blue-200'
            } group flex items-center rounded-md px-3 py-1 text-sm font-medium duration-300`}
          >
            {t(item.label)}
            {closeButton && (
              <i className="fa-solid fa-xmark ml-1 duration-300 group-hover:text-stk-red" />
            )}
          </li>
        </a>
      ))}
    </ul>
  );
};

export default CheckItemGroup;
