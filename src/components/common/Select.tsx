import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface Item {
  id: number;
  value: string | number;
  label: string | number;
}

interface Props {
  className?: string;
  options: Item[];
  changeFunction?: any;
  arrow?: boolean;
  dataCy?: string;
  label?: string;
  validation?: any;
  errors?: any;
  name?: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Select = ({
  className,
  options,
  changeFunction,
  arrow = true,
  dataCy,
  label,
  validation,
  errors,
  name,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  function handleChange(value: Item) {
    setSelectedOption(value);
    if (changeFunction) changeFunction(value);
  }

  const error = name && errors[name];

  return (
    <div data-cy={dataCy}>
      {label && (
        <span className="mb-2 truncate  text-sm font-medium text-stk-grey-400">
          {validation?.required && (
            <span className={`${error ? 'text-stk-red' : 'text-stk-green'} mr-1 duration-500`}>
              *
            </span>
          )}
          {label}
        </span>
      )}
      <Listbox value={selectedOption} onChange={(value) => handleChange(value)}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className={`${className} flex items-center`}>
              {selectedOption.label}
              {arrow && <i className="fa-solid fa-chevron-down ml-auto text-xs" />}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-stk-blue-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active || selectedOption.id === option.id ? '' : '',
                        'hover:bg-stk-blue-300 text-stk-white cursor-default select-none relative py-2 pl-3 pr-9 duration-300'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : '',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <i className="fa-solid fa-check text-stk-green" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};
export default Select;
