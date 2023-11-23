/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/redux/hooks';
import { setFormValues } from '@/redux/drawer/actions';
import { FormValues } from '@/redux/drawer/types';
import { getHardwarePrice, debounce } from '@/helpers';
import { setSelectedAppConfig } from '@/redux/app-store/actions';

interface Props {
  register?: any;
  errors?: any;
  clearErrors?: any;
  data: {
    title: string;
    icon: 'cpu' | 'memory' | 'storage' | 'bandwidth';
    name: 'cpuStandard' | 'cpuIntensive' | 'gpuStandard' | 'bandwidth' | 'storage';
    measure: string;
  };
  required?: boolean;
}

const HardwareChart = ({
  data: { title, icon, name, measure },
  register,
  clearErrors,
  errors,
  required = true,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { appStore, drawer, general } = useSelector((state) => state);
  const { selectedAppConfig } = appStore;
  const { formValues, status, activeSideStep } = drawer;
  const { resourcesPrice, feesPrice } = general;

  const [value, setValue] = useState<number | undefined>(
    Number(formValues[name as keyof FormValues])
  );

  const [hardwarePrice, setHardwarePrice] = useState(0);
  const error = name && errors[name];

  const getHardwareIcon: any = {
    cpu: 'fa-microchip',
    memory: 'fa-floppy-disk',
    bandwidth: 'fa-wifi',
    storage: 'fa-box-archive',
  };

  useEffect(() => {
    let newHardwarePrice = 0;
    if (value) {
      newHardwarePrice = parseFloat(
        (value * getHardwarePrice(name, resourcesPrice, feesPrice))?.toFixed(3)
      );
    }

    setHardwarePrice(newHardwarePrice);
  }, [value]);

  useEffect(() => {
    setValue(Number(formValues[name as keyof FormValues]) || undefined);
  }, [formValues]);

  const handleUpdateForm = debounce((field: string, fieldValue: any) => {
    if (status === 'deploy-edit') {
      dispatch(setFormValues({ ...formValues, [field]: fieldValue }));
    } else if (status === 'deploy-app') {
      const updatedAppConfig = selectedAppConfig;
      if (updatedAppConfig) {
        updatedAppConfig[activeSideStep - 2] = {
          ...updatedAppConfig[activeSideStep - 2],
          [field]: fieldValue,
        };
        dispatch(setSelectedAppConfig(updatedAppConfig));
      }
      dispatch(setFormValues({ ...formValues, [field]: fieldValue }));
    }
  });

  return (
    <div
      className={`${error ? 'border-stk-red' : 'border-stk-blue-100'} ${
        status === 'deploy-edit' ? 'w-[11.15rem]' : 'w-[11.75rem]'
      } flex h-56 flex-col overflow-hidden rounded-md border-[0.5px] border-solid duration-500`}
    >
      <div
        className={`${error ? 'border-stk-red' : 'border-stk-blue-100'} ${
          required ? 'py-2' : 'py-3'
        } flex flex-1 flex-row items-center justify-center border-b-[0.5px] border-solid bg-stk-blue-100 duration-500`}
      >
        {required && (
          <span
            className={`${
              error ? 'text-stk-red' : 'text-stk-green'
            } mr-1 pt-[0.4rem] pb-[0.1rem]  duration-500`}
          >
            *
          </span>
        )}
        <i
          className={`fa-light ${getHardwareIcon[icon]} ${
            error ? 'text-stk-red' : 'text-stk-white'
          } mr-[6px] h-5 w-5`}
        />
        <span className={`${error ? 'text-stk-red' : 'text-stk-white'} text-base font-normal`}>
          {t(title)}
        </span>
      </div>
      <div className="flex h-full w-full flex-col items-center">
        <div className="mt-8 flex w-full flex-col items-center justify-center px-4">
          <input
            {...register(name, {
              min:
                name === 'cpuStandard' || name === 'cpuIntensive' || name === 'gpuStandard'
                  ? Number.MIN_VALUE
                  : 0,
            })}
            data-cy={`drawer-resources-${name}`}
            placeholder="00"
            type="number"
            className={`${
              error ? 'text-stk-red' : 'text-stk-white placeholder:text-stk-grey-500'
            } h-10 w-full rounded-md bg-transparent text-center text-5xl font-bold outline-none`}
            onChange={(e) => {
              let { value: text } = e.target;
              if (text.length > 7) {
                text = text.substring(0, text.length - 1);
              }
              if (text.length && clearErrors) clearErrors(name);
              dispatch(
                setFormValues({
                  ...formValues,
                  [name]: text ? Number(text) : text,
                })
              );
              setValue(Number(text) || undefined);
              handleUpdateForm([name], Number(text) || undefined);
            }}
            value={value}
          />
          <p className="mt-4 text-xl font-semibold text-stk-grey-500">{measure}</p>
        </div>

        <span className="mt-6 text-xs font-semibold text-stk-grey-500">
          {`$${hardwarePrice} USDT ${status === 'purchase-resources' ? '' : '/ Month'}`}
        </span>
      </div>
    </div>
  );
};

export default HardwareChart;
