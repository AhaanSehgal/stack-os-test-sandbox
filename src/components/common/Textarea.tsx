interface Props {
  name?: string;
  label?: string;
  type?: string;
  register?: any;
  errors?: any;
  clearErrors?: any;
  validation?: any;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  dataCy?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

const Textarea = ({
  name,
  label,
  type = 'text',
  register,
  clearErrors,
  errors,
  validation = undefined,
  value = undefined,
  defaultValue,
  placeholder = '',
  className = '',
  disabled = false,
  required = false,
  dataCy,
  onChange,
}: Props) => {
  const registerProps = name ? { ...register(name, validation) } : {};
  const error = name && errors[name];

  return (
    <div className={`${disabled ? 'opacity-40' : 'opacity-100'}  flex flex-col`}>
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
      <textarea
        {...registerProps}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        type={type}
        data-cy={dataCy}
        className={`${className} ${
          error ? 'border-stk-red' : 'border-stk-grey-500'
        } text-white w-full rounded-md border bg-transparent px-[0.9rem] py-2 outline-none placeholder:text-stk-grey-600`}
        disabled={disabled}
        required={required}
        onChange={(e) => {
          if (e.target.value.length && clearErrors) clearErrors(name);
          onChange?.(e.target.value);
        }}
      />
      {error?.message && (
        <span className="-mb-5 mt-1 text-xs font-light text-[#d64a4a]">{error.message}</span>
      )}
    </div>
  );
};

export default Textarea;
