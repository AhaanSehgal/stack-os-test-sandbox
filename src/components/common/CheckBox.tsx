import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox';
import { errorMessages } from '../hardware/helpers';

interface Props {
    label: string;
    onClick: any;
    value?: any;
    disabled?: boolean;
    noMarginTop?: boolean;
    name?: string;
    errors?: any;
    register?: any;
    validation?: any;
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
const CheckboxInput = ({
    label,
    onClick,
    value,
    disabled = false,
    noMarginTop = false,
    name,
    errors,
    register,
    validation = undefined,
}: Props) => {
    const registerProps = name ? { ...register(name, validation) } : {};

    const error = name && errors && access(errors, name);
    if (error && !error.message) error.message = errorMessages[error.type as keyof Errors];

    return (
        <div
            className={`${disabled ? 'opacity-40' : 'opacity-100'} ${
                noMarginTop ? '' : 'mt-5'
            } flex items-center gap-x-2`}
        >
            <Checkbox
                {...registerProps}
                checked={value}
                onClick={onClick}
                className="h-[1.4rem] w-[1.4rem] overflow-hidden rounded-[3px] border-2 border-[#BDBDBD]"
                disabled={disabled}
                name={name}
            >
                <CheckboxIndicator className="flex w-full">
                    <i className="fa-solid fa-check rounded-md text-[20px] text-[#BDBDBD] " />
                </CheckboxIndicator>
            </Checkbox>
            {label && (
                <span className="truncate text-sm font-medium text-stk-grey-400">{label}</span>
            )}
        </div>
    );
};

export default CheckboxInput;
