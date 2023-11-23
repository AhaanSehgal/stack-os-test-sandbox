import { useDispatch } from 'react-redux';
import { useSelector } from 'src/redux/hooks';
import { IoMdClose } from 'react-icons/io';
import { Separator } from '@radix-ui/react-separator';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import {
  fetchQuoteData,
  setTokenBalance,
  setTokenSelected,
  setTokenSelectStatus,
} from '@/redux/swap/actions';
import SwapTokenSelectInfo from './SwapTokenSelectInfo';
import SwapInput from '../SwapInput';

const SwapTokenSelect = () => {
  const { t } = useTranslation();

  const { address } = useAccount();
  const dispatch = useDispatch();
  const { swap } = useSelector((state) => state);
  const {
    tokenOptions,
    tokenSelected,
    stackAddress,
    fromTokenAmount,
    slippageAmount,
    networkSelected,
  } = swap;

  const [searchInput, setSearchInput] = useState('');
  const [searchList, setSearchList] = useState(tokenOptions);

  useEffect(() => {
    setSearchList(tokenOptions);
  }, [tokenOptions]);

  useEffect(() => {
    const newSearchList = tokenOptions?.filter(({ title }) =>
      title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchList(newSearchList);
  }, [searchInput]);

  function onChangeToken(value: number) {
    const newToken = tokenOptions.find((option) => option.id === value);
    dispatch(setTokenSelected(newToken));
    dispatch(setTokenBalance(null));
    dispatch(
      fetchQuoteData({
        swapParams: {
          fromTokenAddress:
            newToken.id === 1 ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : newToken.address,
          toTokenAddress: stackAddress,
          amount:
            fromTokenAmount &&
            (fromTokenAmount * 10 ** 18).toLocaleString('fullwide', { useGrouping: false }),
          fromAddress: address,
          slippage: slippageAmount,
          disableEstimate: true,
          allowPartialFill: false,
          chainId: newToken.chainId,
        },
        networkId: networkSelected.id,
        tokenAmount: fromTokenAmount,
        isStack: false,
        coin: newToken.coin,
      })
    );
  }

  return (
    <div
      data-cy="swap-token-select"
      className="h-[340px] w-full rounded-md border-[0.5px] border-solid border-stk-grey-500 bg-stk-blue-200 p-4 duration-500"
    >
      <div className="mb-6 flex flex-row justify-between">
        <p className="text-xl font-semibold text-[#F9FAFB]">{t('SWAP_TOKEN_SELECT_TITLE')}</p>
        <IoMdClose
          data-cy="swap-token-select-close"
          className="hover:cursor-pointer"
          color="#CFCFCF"
          size={20}
          onClick={() => dispatch(setTokenSelectStatus(false))}
        />
      </div>
      <SwapInput
        type="text"
        placeholder="Search for tokens"
        iconLeft
        value={searchInput}
        onChangeInput={(value) => setSearchInput(value)}
        fontSize={16}
      />
      <Separator className="my-4 h-px w-full bg-[#565A69]" />
      <div className="scrollbar h-48 overflow-y-scroll pr-1">
        {searchList?.map((item: any) => (
          <div
            data-cy={`swap-token-${item.title}`}
            className={`
                    ${
                      tokenSelected?.id === item.id
                        ? 'bg-stk-green font-semibold text-stk-blue-200'
                        : 'duration-300 hover:bg-[#2f3743]'
                    } group relative my-px flex cursor-pointer flex-row items-center justify-between rounded-md px-4 py-2 text-sm text-white
                  `}
            onClick={() => onChangeToken(item.id)}
            key={item.id}
          >
            <SwapTokenSelectInfo token={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapTokenSelect;
