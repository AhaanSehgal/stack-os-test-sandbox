import { useSelector } from '@/redux/hooks';
import { displayBalanceEndTime, showBalanceVal } from '@/utils/utils';
import { XCT_SIZE } from '@/utils/constants';
import { GeneralState } from '@/redux/general/types';

interface Props {
    className?: string;
}

const BalanceInfo = ({ className = '' }: Props) => {
    const general: GeneralState = useSelector((state: any) => state.general);
    const { balanceEndTime, balancesForSubscription } = general;
    const { subscriptionBalance } = balancesForSubscription;

    return (
        <div className={className}>
            <div>
                <span className="text-stk-white">Subscription Balance: </span>
                <span className="text-stk-green">
                    {subscriptionBalance ? showBalanceVal(subscriptionBalance) : ''}
                </span>
            </div>
            <div>
                <span className="text-stk-white">Balance End Time: </span>
                <span className="text-stk-green">{displayBalanceEndTime(balanceEndTime)}</span>
            </div>
        </div>
    );
};

export default BalanceInfo;
