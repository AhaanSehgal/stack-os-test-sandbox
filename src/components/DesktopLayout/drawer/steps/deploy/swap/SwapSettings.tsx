import { useDispatch } from 'react-redux';
import { useSelector } from 'src/redux/hooks';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiInfoCircle } from 'react-icons/bi';
import { setSettingsStatus, setSlippageAmount } from '@/redux/swap/actions';
import SwapButton from './SwapButton';
import ToggleGroup from './ToggleGroup';

const slippageValues = [
  { id: 1, title: '0.1%', value: 0.1 },
  { id: 2, title: '0.5%', value: 0.5 },
  { id: 3, title: '1%', value: 1 },
  { id: 4, title: '3%', value: 3 },
  { id: 5, title: 'custom', value: null },
];

const SwapSettings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { swap } = useSelector((state) => state);
  const { slippageAmount } = swap;

  const [newSlippage, setNewSlippage] = useState<number | null>(slippageAmount);

  function onClickConfirm() {
    if (newSlippage) {
      dispatch(setSlippageAmount(newSlippage));
      dispatch(setSettingsStatus(false));
    }
  }

  return (
    <div
      data-cy="swap-settings"
      className="h-[340px] w-full rounded-md border-[0.5px] border-solid border-stk-grey-500 bg-stk-blue-200 p-4 duration-500"
    >
      <div className="mb-6 flex flex-row justify-between">
        <span className="text-xl font-semibold text-[#F9FAFB]">{t('SWAP_SETTINGS_TITLE')}</span>
        <IoMdClose
          data-cy="swap-settings-close"
          className="text-[#CFCFCF] duration-500 hover:cursor-pointer hover:text-[#e15b5b]"
          size={20}
          onClick={() => dispatch(setSettingsStatus(false))}
        />
      </div>
      <p className="mb-3 text-lg text-white">{t('SWAP_SETTINGS_SUBTITLE')}</p>
      <ToggleGroup
        defaultValue={newSlippage as number}
        onChange={(value) => setNewSlippage(value.value)}
        data={slippageValues}
      />
      <div className="mt-[1.93rem] flex">
        <BiInfoCircle size={16} className="mr-2 text-xl duration-500" color="#CFCFCF" />
        <span className="w-[17.5rem] text-[0.75rem] text-[#CFCFCF]">{t('SWAP_SETTINGS_INFO')}</span>
      </div>
      <div className="mt-9 flex w-full flex-row items-center justify-center">
        <div
          data-cy="settings-button"
          className="w-full child:w-full"
          onClick={() => onClickConfirm()}
        >
          <SwapButton disabled={slippageAmount === newSlippage || !newSlippage}>
            {t('SWAP_SETTINGS_FOOTER')}
          </SwapButton>
        </div>
      </div>
    </div>
  );
};

export default SwapSettings;
