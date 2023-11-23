interface Props {
  id?: string;
  placeholder?: string;
  className?: string;
  width?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

const SearchInput = ({ id, placeholder, className, width, value, onChange }: Props) => {
  function handleChange(textValue: string) {
    if (onChange) onChange(textValue);
  }

  return (
    <div className={`relative flex rounded-md shadow-sm ${width || 'w-full'}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <i className="fa-regular fa-magnifying-glass text-stk-grey-600" />
      </div>
      <input
        data-cy={id}
        name="search"
        className={`${className} block w-full rounded-md border-gray-300 py-2 pl-10 text-base outline-none placeholder:text-stk-grey-400`}
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};

export default SearchInput;
