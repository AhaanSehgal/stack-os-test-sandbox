import { Controller } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import Textarea from './Textarea';

interface Props {
    label: string;
    //   checked: boolean;
    onChange?: any;
    onChangeTextArea?: any;
    register: any;
    errors: any;
    clearErrors: any;
    //   name: string;
    switchName: string;
    textAreaName: string;
    placeholder: string;
    control: any;
    disabled?: boolean;
}

const ConditionalInput = ({
    label,
    //   checked,
    onChange,
    onChangeTextArea,
    register,
    errors,
    clearErrors,
    switchName,
    textAreaName,
    placeholder,
    control,
    disabled = false,
}: Props) => (
    <Controller
        name={switchName}
        control={control}
        render={({ field }) => {
            const checked = field.value;
            return (
                <div>
                    <div
                        className={`${
                            disabled ? 'opacity-40' : 'opacity-100'
                        } mt-[1.3rem] flex flex-row gap-2`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Switch
                                checked={field.value}
                                onChange={(value: any) => {
                                    field.onChange?.(value);
                                }}
                                // onChange={onChange}
                                className={`${
                                    checked ? 'bg-stk-green' : 'bg-stk-white'
                                } relative inline-flex h-[17px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                disabled={disabled}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`${checked ? 'translate-x-5' : 'translate-x-0'}
                                    pointer-events-none inline-block h-[13px] w-[13px] rounded-full bg-stk-blue-500 shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                        <span>{label}</span>
                    </div>
                    <div className="w-full">
                        <Textarea
                            className={`${!checked ? 'hidden' : 'mt-[0.8rem]'}`}
                            register={register}
                            errors={errors}
                            clearErrors={clearErrors}
                            name={textAreaName}
                            placeholder={placeholder}
                            onChange={onChangeTextArea}
                            disabled={disabled}
                        />
                    </div>
                </div>
            );
        }}
    />
);

export default ConditionalInput;
