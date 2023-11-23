import { Trans } from 'react-i18next';
import { errorMessages } from '../hardware/helpers';

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
    dynamicRequired?: boolean;
    dataCy?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
}

interface Errors {
    pattern: string;
    maxLength: string;
    required: string;
}

function access(o: any, s: string) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

const Input = ({
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
    dynamicRequired = false,
    dataCy,
    onChange,
}: Props) => {
    const registerProps = name ? { ...register(name, validation) } : {};

    //   const error = name && errors[name];
    const error = name && errors && access(errors, name);
    if (error && !error.message) error.message = errorMessages[error.type as keyof Errors];

    return (
        <div className={`${disabled ? 'opacity-40' : 'opacity-100'}  flex flex-col`}>
            {label && (
                <span className="mb-2 truncate  text-sm font-medium text-stk-grey-400">
                    {(validation?.required || dynamicRequired) && (
                        <span
                            className={`${
                                error || (!value && dynamicRequired)
                                    ? 'text-stk-red'
                                    : 'text-stk-green'
                            } mr-1 duration-500`}
                        >
                            *
                        </span>
                    )}
                    {label}
                </span>
            )}
            <input
                {...registerProps}
                defaultValue={defaultValue}
                value={value}
                maxLength={validation?.maxLength ? validation.maxLength : 99}
                // maxLength={99}
                placeholder={placeholder}
                type={type}
                data-cy={dataCy}
                className={`${className} ${error ? 'border-stk-red' : 'border-stk-grey-500'} ${
                    disabled ? 'bg-stk-blue-400 text-stk-grey-300' : 'bg-transparent text-stk-white'
                } w-full rounded-md border px-[0.9rem] py-2 outline-none duration-500 placeholder:text-stk-grey-600`}
                disabled={disabled}
                required={required}
                onChange={(e) => {
                    if (e.target.value.length && clearErrors) clearErrors(name);
                    onChange?.(
                        validation?.lowerCase ? e.target.value.toLowerCase() : e.target.value
                    );
                }}
            />
            {(error?.message || (dynamicRequired && !value)) && (
                <span className="-mb-5 mt-1 text-xs font-light text-[#d64a4a]">
                    <Trans
                        i18nKey={error?.message || 'field required'}
                        values={validation?.maxLength ? { maxNum: validation.maxLength } : ''}
                    />
                </span>
            )}
        </div>
    );
};

export default Input;
