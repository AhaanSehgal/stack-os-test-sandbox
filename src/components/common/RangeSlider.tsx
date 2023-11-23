import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import '@radix-ui/colors/blackA.css';
import { Controller } from 'react-hook-form';

interface Props {
  name: string;
  register: any;
  validation?: any;
  control: any;
  value?: number;
  defaultValue?: number;
  max?: number;
  step?: number;
  onChange?: any;
  disabled?: boolean;
}

const RangeSlider = ({
  name,
  register,
  validation,
  control,
  value = 0,
  defaultValue = 1,
  max = 20,
  step = 1,
  onChange,
  disabled = false,
}: Props) => {
  const registerProps = name ? { ...register(name, validation) } : {};

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="border-stk-blue-100 bg-stk-blue-100 rounded-md flex items-center gap-2 overflow-hidden">
            <div className="bg-stk-green h-8 w-10 flex items-center justify-center text-black font-semibold">
              {field.value}
            </div>
            <Slider.Root
              // {...field}
              className="w-full h-2 relative flex items-center bg-[white] rounded-full mr-2"
              // value={[value]}
              value={[field.value]}
              // defaultValue={[defaultValue]}
              max={max}
              step={step}
              onValueChange={(val: number[]) => {
                field?.onChange?.(val[0]);
                onChange?.(val[0]);
              }}
              disabled={disabled}
            >
              <Slider.Track className="bg-[#2d2e6e] relative rounded-full h-1">
                <Slider.Range className="absolute bg-[#2d2e6e] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-stk-green rounded-xl focus:shadow-2xl" />
            </Slider.Root>
          </div>
        );
      }}
    />
  );
};

export default RangeSlider;
