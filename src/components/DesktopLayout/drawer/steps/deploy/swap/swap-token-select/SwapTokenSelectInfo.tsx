import { useSelector } from 'src/redux/hooks';
import { useAccount, useBalance } from 'wagmi';
import { useState } from 'react';
import { Icon } from '@/components/common';

interface Props {
    token: any;
}

const SwapTokenSelectInfo = ({ token }: Props) => {
    const { swap } = useSelector((state) => state);
    const { tokenSelected } = swap;
    const [tokenBalance, setTokenBalance] = useState(0);

    const { address } = useAccount();

    useBalance({
        addressOrName: address,
        token: token?.id === 1 ? null : token?.address,
        chainId: token?.chainId,
        onSuccess(data) {
            setTokenBalance(Number(data?.formatted));
        },
    });

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <Icon className="mr-3 flex items-center" iconName={token.icon} />
                <div className="flex flex-col justify-start">
                    <span className="font-semibold">{token.title}</span>
                    <span
                        className={`${
                            tokenSelected?.id === token.id && 'text-[#2D3948]'
                        } text-[#888D9B]`}
                    >
                        {token.subtitle}
                    </span>
                </div>
            </div>
            <span>{tokenBalance?.toFixed(4)}</span>
        </>
    );
};

export default SwapTokenSelectInfo;
