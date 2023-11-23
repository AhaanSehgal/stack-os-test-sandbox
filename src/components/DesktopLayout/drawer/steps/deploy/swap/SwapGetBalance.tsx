import { useDispatch } from 'react-redux';
import { useSelector } from 'src/redux/hooks';
import { useAccount, useBalance } from 'wagmi';
import SwapButton from './SwapButton';
import { setTokenBalance } from '@/redux/swap/actions';

const SwapGetBalance = () => {
  const { address } = useAccount();

  const dispatch = useDispatch();
  const { swap } = useSelector((state) => state);
  const { tokenSelected } = swap;

  useBalance({
    addressOrName: address,
    token: tokenSelected?.id === 1 ? null : tokenSelected?.address,
    chainId: tokenSelected?.chainId,
    onSuccess(data) {
      const balance = Number(data?.formatted);
      dispatch(setTokenBalance(balance));
    },
  });

  return <SwapButton disabled>Loading...</SwapButton>;
};

export default SwapGetBalance;
