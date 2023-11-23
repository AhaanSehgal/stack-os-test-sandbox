/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import * as Toggle from '@radix-ui/react-toggle-group';
import React, { useEffect, useState } from 'react';

interface Item {
  id: number;
  title: string;
  value: number | null;
}

interface Props {
  defaultValue?: number;
  data: Item[];
  // eslint-disable-next-line no-unused-vars
  onChange?: (item: Item) => void;
}

const ToggleGroup = ({ data, onChange, defaultValue }: Props) => {
  const [selected, setSelected] = useState(data[0]);
  const [customValue, setCustomValue] = useState<number | null>(null);

  useEffect(() => {
    if (defaultValue) {
      const itemInData = data.find((item) => item.value === defaultValue);
      if (itemInData) {
        setSelected(itemInData);
      } else {
        setSelected({ id: 5, title: 'custom', value: defaultValue });
        setCustomValue(defaultValue);
      }
    }
  }, []);

  useEffect(() => {
    if (selected.title === 'custom') {
      if (onChange) onChange({ ...selected, value: customValue });
    }
  }, [selected, customValue]);

  function handleOnChange(item: Item) {
    setSelected(item);
    if (onChange) {
      if (item.title !== 'custom') onChange(item);
    }
  }

  return (
    <Toggle.Root
      className="flex h-[2.938rem] w-full overflow-hidden rounded-md bg-[#2D3948]"
      type="single"
    >
      {data.map((item) => (
        <Toggle.Item
          data-cy={`swap-slippage-${item.value}`}
          className={`${
            selected.title === item.title ? '' : 'hover:bg-[#354252]'
          }  m-[0.19rem] flex flex-1 items-center justify-center rounded-md text-[#CFCFCF] duration-300 focus:bg-stk-green focus:font-semibold focus:text-stk-blue-200`}
          title={item.title}
          value={String(item.value)}
          onClick={() => handleOnChange(item)}
          key={item.id}
        >
          {item.title === 'custom' ? (
            <input
              value={customValue || undefined}
              type="number"
              className={`${selected.title === item.title && 'border-[0.05rem] border-stk-green'} ${
                selected.title && customValue
                  ? 'font-semibold'
                  : 'border-[#d94141] focus:border-stk-green'
              } flex h-full w-[4.81rem] overflow-hidden text-ellipsis rounded-md bg-inherit px-2 text-center placeholder-[#CFCFCF] outline-none focus:border-[0.05rem]`}
              placeholder="Custom"
              onChange={(event) =>
                setCustomValue(event.target.value ? Number(event.target.value) : null)
              }
            />
          ) : (
            <span
              className={`${
                selected.title === item.title
                  ? 'bg-stk-green font-semibold text-stk-blue-200'
                  : 'bg-[#2D3948] hover:bg-[#354252] '
              } flex h-full w-full items-center justify-center rounded-md duration-300`}
            >
              {item.title}
            </span>
          )}
        </Toggle.Item>
      ))}
    </Toggle.Root>
  );
};

export default ToggleGroup;
