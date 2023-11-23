import ReactSelect from 'react-select';

const customStyles = {
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
    padding: '2px 5px',
    borderRadius: '6px',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    Color: '#fff',
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
    overflowY: 'scroll',
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
};

interface Item {
  value: number;
  label: string;
}

interface Props {
  options: Item[];
  isMulti?: boolean;
  value?: any;
  changeFunction?: any;
}

const MultiSelect = ({ options, isMulti = false, value, changeFunction }: Props) => (
  <ReactSelect
    className="scrollbar"
    onChange={changeFunction ? (e) => changeFunction(e) : undefined}
    value={value}
    isMulti={isMulti}
    options={options}
    styles={customStyles}
  />
);

export default MultiSelect;
