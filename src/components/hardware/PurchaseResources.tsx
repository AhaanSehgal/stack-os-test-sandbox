/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { BN } from 'bn.js';
import { useSelector } from '@/redux/hooks';
import SkeletonConsumptionOverview from './skeletons/SkeletonConsumptionOverview';
import SkeletonMobileConsumptionOverview from './skeletons/SkeletonMobileConsumptionOverview';
import showToast from '@/utils/showToast';
import { addresses } from '@/utils/appCryptoConfig';
import { getUsdcRequired, getBlockTimestamp } from '@/utils/utils';
import { GeneralState } from '@/redux/general/types';
import { DeployState } from '@/redux/deploy/types';
import { callContractWrite } from '@decloudlabs/stk-v2/lib/utils/utils';

const PurchaseResources = () => {
    const { address } = useAccount();

    //   const { general, deploy } = useSelector((state: any) => state);
    const general: GeneralState = useSelector((state: any) => state.general);
    const deploy: DeployState = useSelector((state: any) => state.deploy);

    const { loading } = deploy;
    const { isMobile, selectedNft, subscriptionParam, appCrypto } = general;
    const { createTime } = subscriptionParam;

    const [usdcFloat, setUsdcFloat] = useState('');
    const [subscriptionUsdcFloatRequired, setSubscriptionUsdcFloatRequired] = useState('');

    const [balanceOf, setBalanceOf] = useState();
    const [subscriptionTotalBalance, setSubscriptionTotalBalance] = useState();

    const [mintingXCT, setMintingXCT] = useState(false);
    const [addingBalance, setAddingBalance] = useState(false);

    const balanceCalculation = async () => {
        if (!appCrypto) return;
        const requestList = [
            appCrypto.contractService.SubscriptionBalance.totalPrevBalance(selectedNft),
            appCrypto.contractService.XCT.balanceOf(address),
        ];

        let [subscriptionBalance, xctBalance] = await Promise.all(requestList);

        console.log(
            'subscriptionBalacne: ',
            new BN(subscriptionBalance.toString()).toString(),
            new BN((10 ** 16).toString()).toString(),
            new BN(subscriptionBalance.toString()).div(new BN((10 ** 16).toString())).toString()
        );

        subscriptionBalance = new BN(subscriptionBalance.toString()).div(
            new BN((10 ** 16).toString())
        );

        subscriptionBalance = subscriptionBalance.toNumber();
        subscriptionBalance /= 100;
        setSubscriptionTotalBalance(subscriptionBalance);

        xctBalance = new BN(xctBalance.toString()).div(new BN((10 ** 16).toString()));
        xctBalance = xctBalance.toNumber();
        xctBalance /= 100;
        setBalanceOf(xctBalance);

        // console.log('subscriptionBal: ', subscriptionBalance, xctBalance);
    };

    useEffect(() => {
        (async () => {
            if (!selectedNft) return;

            try {
                await balanceCalculation();
            } catch (error: any) {
                console.error('Error while calculating balance: ', error);

                showToast(error, error.message);
            }
        })();
    }, [selectedNft]);

    const mintXct = async () => {
        if (!appCrypto) return;
        setMintingXCT(true);

        try {
            const deadline = getBlockTimestamp().toString();
            const usdcFixedToSixDecimals = Number(usdcFloat).toFixed(6);
            const usdcRequired = new BN(Number(usdcFixedToSixDecimals) * 10 ** 6);
            const xctRequired = usdcRequired.mul(new BN(10 ** 12)).toString();

            const ETHNetStr = await appCrypto.contractService.XCTMinter.estimateETHForXCT(
                process.env.NEXT_PUBLIC_ROUTER_V2,
                process.env.NEXT_PUBLIC_WETH_ADDRESS,
                xctRequired
            );
            console.log('ETHNetStr:', ETHNetStr);

            let ETHRequired = new BN(ETHNetStr.toString());

            const extraAmount = ETHRequired.div(new BN(10));
            ETHRequired = ETHRequired.add(extraAmount);

            const buyXCTResp = await callContractWrite(
                appCrypto.contractService.XCTMinter.easyBuyXCT(
                    process.env.NEXT_PUBLIC_ROUTER_V2,
                    process.env.NEXT_PUBLIC_WETH_ADDRESS,
                    getUsdcRequired(new BN(xctRequired)).toString(),
                    deadline,
                    { value: ETHRequired.toString() }
                )
            );
            if (!buyXCTResp.success) throw buyXCTResp.data;

            setUsdcFloat('');
            await balanceCalculation();
            setMintingXCT(false);
        } catch (error: any) {
            console.error('Error while minting XCT: ', error);
            setMintingXCT(false);
            showToast('error', error?.message);
        }
    };

    const addSubscription = async () => {
        if (!appCrypto) return;
        setAddingBalance(true);

        try {
            const usdcFixedToSixDecimals = Number(subscriptionUsdcFloatRequired).toFixed(6);
            const usdcRequired = new BN(Number(usdcFixedToSixDecimals) * 10 ** 6);
            const xctRequired = usdcRequired.mul(new BN(10 ** 12));

            const approveXCTResp = await callContractWrite(
                appCrypto.contractService.XCT.approve(
                    addresses.SubscriptionBalance,
                    xctRequired.toString()
                )
            );
            if (!approveXCTResp.success) throw approveXCTResp.data;

            const addBalResp = await callContractWrite(
                appCrypto.contractService.SubscriptionBalance.addBalance(
                    address,
                    selectedNft,
                    xctRequired.toString()
                )
            );
            if (!addBalResp.success) throw addBalResp.data;

            setSubscriptionUsdcFloatRequired('');

            await balanceCalculation();

            setAddingBalance(false);
        } catch (error: any) {
            console.error('Error while adding subscription: ', error);
            setAddingBalance(false);
            showToast('error', error?.message);
        }
    };

    return (
        <div className="mt-14 flex h-[calc(100vh_-_3.5rem)] w-full flex-col justify-start md:h-full">
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? (
                isMobile ? (
                    <SkeletonMobileConsumptionOverview />
                ) : (
                    <SkeletonConsumptionOverview />
                )
            ) : (
                <>
                    <div className="mt-7 w-full rounded-xl bg-gradient-to-r from-stk-green to-[#252F36] px-24 py-11">
                        <h3 className="text-4xl font-bold text-stk-blue-500">Purchase XCT</h3>
                        <div className="flex flex-col my-8">
                            <input
                                className="p-2 w-[23rem]"
                                type="number"
                                name="usdcFloat"
                                placeholder="Enter USD"
                                onChange={(e: any) => setUsdcFloat(e.target.value)}
                                value={usdcFloat}
                                disabled={mintingXCT}
                            />

                            <button
                                className={`${
                                    mintingXCT ? 'animate-pulse' : ''
                                } w-[23rem] bg-stk-white my-8 p-2`}
                                type="button"
                                onClick={mintXct}
                                disabled={mintingXCT || !usdcFloat}
                            >
                                {mintingXCT ? 'Minting XCT...' : 'Mint XCT'}
                            </button>
                            <p className="text-stk-blue-500 font-bold">
                                Wallet Balance : ${balanceOf}{' '}
                            </p>
                        </div>
                    </div>

                    {Number(createTime) > 0 && (
                        <div className="mt-7 w-full rounded-xl bg-gradient-to-r from-stk-green to-[#252F36] px-24 py-11">
                            <h3 className="text-4xl font-bold text-stk-blue-500">
                                Add Subscription
                            </h3>
                            <div className="flex flex-col my-8">
                                <input
                                    className="p-2 w-[23rem]"
                                    type="number"
                                    name="subscriptionUsdcFloatRequired"
                                    placeholder="Enter USD"
                                    onChange={(e: any) =>
                                        setSubscriptionUsdcFloatRequired(e.target.value)
                                    }
                                    value={subscriptionUsdcFloatRequired}
                                    disabled={addingBalance}
                                />

                                <button
                                    className={`${
                                        addingBalance ? 'animate-pulse' : ''
                                    } w-[23rem] bg-stk-white my-8 p-2`}
                                    type="button"
                                    onClick={addSubscription}
                                    disabled={addingBalance || !subscriptionUsdcFloatRequired}
                                >
                                    {addingBalance ? 'Adding Balance...' : 'Add Balance'}
                                </button>

                                <p className="text-stk-blue-500 font-bold">
                                    Total Subscription Balance : ${subscriptionTotalBalance}
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PurchaseResources;
