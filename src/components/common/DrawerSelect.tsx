import React from 'react';
import ReactSelect from 'react-select';

const customStyles = {
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  container: (provided: any) => ({
    ...provided,
    borderColor: 'red',
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: 'transparent',
    padding: '4px 0',
    borderRadius: '6px',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    Color: '#fff',
    padding: '0 5px 0 0',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#2D374A',
    maxHeight: '10rem',
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    maxHeight: '10rem',
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: '10rem',
    overflowY: 'auto',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#2D374A',
    borderRadius: '6px',
    color: '#d9d9d9',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#d9d9d9',
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    color: '#9BA3AF',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: '#9BA3AF',
    backgroundColor: state.isFocused ? '#3f444f' : '#2D374A',
    ':hover': {
      backgroundColor: '#3D404f',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9BA3AF',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#fff',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    color: '#fff',
    padding: '0 0 0 8px',
  }),
};

interface Props {
  options: any;
  value?: any;
  label?: string;
  register?: any;
  errors?: any;
  clearErrors?: any;
  validation?: any;
  name?: string;
  onChange?: any;
  defaultValue?: any;
  menuPlacement?: string;
  placeholder?: string;
  disabled?: boolean;
}

const DrawerSelect = ({
  options,
  value,
  label,
  register,
  clearErrors,
  validation = undefined,
  errors,
  name,
  onChange,
  defaultValue,
  menuPlacement = 'bottom',
  placeholder = 'Select',
  disabled = false,
}: Props) => {
  const registerProps = name ? { ...register(name, validation) } : {};
  const error = name && errors[name];

  return (
    <div className={`${disabled ? 'opacity-40' : 'opacity-100'} flex flex-col`}>
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
      <ReactSelect
        menuPlacement={menuPlacement}
        defaultValue={defaultValue}
        {...registerProps}
        name={name}
        className="scrollbar"
        onChange={(option: any) => {
          onChange(
            option.value !== undefined ? { label: option.label, value: option.value } : option.label
          );
          if (clearErrors) clearErrors(name);
        }}
        value={value}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </div>
  );
};

export default DrawerSelect;
