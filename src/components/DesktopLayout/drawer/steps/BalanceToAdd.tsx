/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import BN from 'bn.js';
import {
    setCurrentStep,
    setDeployEnabled,
    setFormValidationFunc,
    setSubBalanceEstimate,
} from '@/redux/drawer/actions';
import { setBalancesForSubscription, setCalcDripRateFlag } from '@/redux/general/actions';
import { DrawerState, FormValues } from '@/redux/drawer/types';
import { useSelector } from '@/redux/hooks';
import DrawerSelect from '@/components/common/DrawerSelect';
import { Button, Icon } from '@/components/common';
import { steps, timePeriodList } from '../helpers';
import { addresses } from '@/utils/appCryptoConfig';
import { GeneralActions } from '@/redux/general';
import showToast from '@/utils/showToast';
import SkeletonBalanceToAdd from '@/components/common/skeletons/SkeletonBalanceToAdd';
import {
    calculateLicenseFee,
    displayBalanceEndTime,
    getUsdcRequired,
    showBalanceVal,
    getBlockTimestamp,
} from '@/utils/utils';
import { DrawerActions } from '@/redux/drawer';
import ResourceSummary from '../ResourceSummary';
import { RESOURCE_CATEGORY, RESTYPE_NAME_TO_ID_MAP } from '@/utils/constants';
import {
    BalancesForSubscription,
    ContractApp,
    SubBalanceEstimate,
    SubscriptionParam,
} from '@decloudlabs/stk-v2/lib/types/types';
import { GeneralState } from '@/redux/general/types';
import { getContractParam, getSubscriptionParam } from '@/utils/utils';
import { getDripRatePerSec } from '@/utils/contractCallConfig';
import { DeployState } from '@/redux/deploy/types';

const DEFAULT_TIME_PERIOD = timePeriodList[1];

const BalanceToAdd = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { address } = useAccount();
    // const { drawer, general, deploy } = useSelector((state: {
    //     drawer: DrawerState;
    //     general: GeneralState;
    //     deploy: any;
    // }) => state.drawer);
    const drawer: DrawerState = useSelector((state: any) => state.drawer);
    const general: GeneralState = useSelector((state: any) => state.general);
    const deploy: DeployState = useSelector((state: any) => state.deploy);

    const {
        selectedNft,
        subscriptionParam,
        balancesForSubscription,
        balanceEndTime,
        calculateDripRateFlag,
        appCrypto,
    } = general;
    const { createTime: subscribeTime } = subscriptionParam;
    const { subscriptionBalance } = balancesForSubscription;
    const { status, stepIndex, subBalEstimate } = drawer;
    const { deployedApps } = deploy;

    const [purchaseXctLoading, setPurchaseXctLoading] = useState(false);
    const [estimateETHLoading, setEstimateETHLoading] = useState(false);
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [isFileApp, setIsFileApp] = useState(false);
    const [totalDripRate, setTotalDripRate] = useState('0');
    const [timePeriod, setTimePeriod] = useState(0);
    // const [subBalEstimate, setSubBalEstimate] = useState<SubBalanceEstimate | null>();
    // const [balForSubscription, setBalForSubscription] = useState<BalancesForSubscription | null>();

    const {
        register,
        clearErrors,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        setError,
        getValues,
    } = useFormContext();

    //   const onSubmit: SubmitHandler<FormValues> = (data) => {
    //     // if (currentStep.id < steps.length + 1)
    //     {
    //         // console.log("current step", stepIndex, steps[stepIndex - 1]);
    //     //   dispatch(setCurrentStep(  { id: stepIndex + 1, name: 'deploy', icon: 'stackos-icon', title: 'Balance To Add' }));
    //       dispatch(
    //         setFormValues({
    //           ...formValues,
    //           ...data,
    //         })
    //       );
    //       slideActions.goToNextSlide(stepName.BALANCE_TO_ADD);
    //     }
    //   };

    useEffect(() => {
        if (status === 'upload-form') {
            setIsFileApp(true);
            return;
        }
        if (status === 'deploy-edit') {
            const app = deployedApps?.find((app: ContractApp) => app.appID === getValues().appID);

            for (let i = 0; i < app?.resourceType.length; i++) {
                const resourceType = app?.resourceType[i];
                if (RESOURCE_CATEGORY.fileType.includes(resourceType)) {
                    setIsFileApp(true);
                    return;
                }
            }
        }
        setIsFileApp(false);
    }, [status]);

    useEffect(() => {
        console.log('calc drip rate flag: ', calculateDripRateFlag);
        if (calculateDripRateFlag == false) return;
        (async () => {
            console.log('calling calcDripRate');
            await calcDripRate();

            dispatch(setCalcDripRateFlag(false));
        })();
    }, [calculateDripRateFlag]);

    const calcDripRate = async () => {
        if (!appCrypto) return;
        if (!deployedApps) return;
        const formValues: FormValues = getValues();
        const dripRateManager = appCrypto.dripRateManager;
        const contractParam = getContractParam(selectedNft, formValues);
        const subscriptionParam = getSubscriptionParam(formValues, subscribeTime);

        // const appList = deployedApps.map((contApp) => {
        //     if (contApp.appName === contractParam.appName) {
        //         return contractParam;
        //     }
        //     return contApp;
        // });
        console.log('contractParam: ', contractParam);

        const appList = deployedApps;
        let appSetFlag = false;
        for (let i = 0; i < appList.length; i++) {
            const contApp = appList[i];
            if (contApp.appName === contractParam.appName) {
                appList[i] = contractParam;
                appSetFlag = true;
                break;
            }
        }

        if (!appSetFlag) {
            appList.push(contractParam);
        }

        console.log('entered calcDripRate: ', appList);

        const dripRateFactorResp = await dripRateManager.getDripRateFactors(
            selectedNft,
            subscriptionParam
        );
        if (dripRateFactorResp.success == false) {
            showToast('warning', dripRateFactorResp.data);
            return;
        }
        const dripRateFactor = dripRateFactorResp.data;
        console.log('got drip rate factor');

        const estimDripResp = await dripRateManager.estimateDripRate(
            appList,
            dripRateFactor,
            subscriptionParam
        );
        if (estimDripResp.success == false) {
            showToast('warning', estimDripResp.data);
            return;
        }
        const estimDripRate = estimDripResp.data;
        console.log('got estimate drip rate');

        let actualDripRate = '0';

        if (subscriptionParam.createTime > 0) {
            const dripRateResp = await getDripRatePerSec(appCrypto, selectedNft);
            if (dripRateResp.success == false) {
                showToast('warning', dripRateResp.data);
                return;
            }
            console.log('got actual drip rate');
            actualDripRate = dripRateResp.data;
        }

        // const totalDripRateVal = new BN(estimDripRate).add(new BN(actualDripRate));
        const totalDripRateVal = new BN(estimDripRate);

        console.log('estim vs actual: ', estimDripRate, actualDripRate);

        setTotalDripRate(totalDripRateVal.toString());

        // await estimateCreditPurchaseInternal(timePeriod, creditToAddParam);
    };

    const estimateCreditPurchaseInternal = async (timePeriodParam: {
        label: string;
        value: number;
    }) => {
        if (balancesForSubscription == null) return;
        if (!appCrypto) return;

        const timePeriod = timePeriodParam.value;

        const dripRateManager = appCrypto.dripRateManager;

        const uniswapRouter = process.env.NEXT_PUBLIC_ROUTER_V2 || '';
        const wethAddressPolygon = process.env.NEXT_PUBLIC_WETH_ADDRESS || '';

        const estimateETHResp = await dripRateManager.estimateETHRequired(
            timePeriod,
            balancesForSubscription,
            totalDripRate,
            uniswapRouter,
            wethAddressPolygon
        );
        if (estimateETHResp.success == false) {
            showToast('warning', estimateETHResp.data);
            return;
        }

        dispatch(setSubBalanceEstimate(estimateETHResp.data));
    };

    const estimateCreditPurchase = async (timePeriodParam: { label: string; value: number }) => {
        setEstimateETHLoading(true);

        try {
            await estimateCreditPurchaseInternal(timePeriodParam);
        } catch (error: any) {
            console.error('Error while estimating credit purchase: ', error);
            showToast('error', error.message);
        }

        setEstimateETHLoading(false);
    };

    const purchaseXCT = async () => {
        if (!appCrypto) return;
        if (subBalEstimate == null) return;

        setPurchaseXctLoading(true);
        setEstimateETHLoading(true);

        const dripRateManager = appCrypto.dripRateManager;

        const uniswapRouter = process.env.NEXT_PUBLIC_ROUTER_V2 || '';
        const wethAddressPolygon = process.env.NEXT_PUBLIC_WETH_ADDRESS || '';
        // const uniswapRouter = process.env.NEXT_PUBLIC_WETH_ADDRESS || '';

        const purchaseXCTResp = await dripRateManager.purchaseXCT(
            selectedNft,
            subBalEstimate,
            uniswapRouter,
            wethAddressPolygon
        );
        if (purchaseXCTResp.success == false) {
            showToast('warning', purchaseXCTResp.data);
            return;
        }
        const { subBalanceEstimate, balancesForSubscription } = purchaseXCTResp.data;
        console.log('sub bal check: ', subBalanceEstimate, balancesForSubscription);
        dispatch(setSubBalanceEstimate(subBalanceEstimate));
        dispatch(setBalancesForSubscription(balancesForSubscription));

        setPurchaseXctLoading(false);
        setEstimateETHLoading(false);
        setBalanceLoading(false);
    };

    // const addSubscriptionCredit = async () => {
    //     if (!creditToAdd || !creditToAdd.estimateETH) return;
    //     if (!new BN(creditToAdd.estimateETH).gt(new BN(0))) return;

    //     setPurchaseXctLoading(true);
    //     setEstimateETHLoading(true);

    //     try {
    //         const deadline = getBlockTimestamp().toString();
    //         await XCTMinter.contractInstance()
    //             .methods.easyBuyXCT(
    //                 process.env.NEXT_PUBLIC_ROUTER_V2,
    //                 process.env.NEXT_PUBLIC_WETH_ADDRESS,
    //                 getUsdcRequired(xctRequired),
    //                 deadline // deadline
    //             )
    //             .send({ value: creditToAdd.estimateETH, from: address });

    //         setBalanceLoading(true);
    //         await initBalance();
    //         setBalanceLoading(false);

    //         if (new BN(creditToAdd.balanceToAdd).gt(new BN(0))) {
    //             await XCT.approve(addresses.SubscriptionBalance, creditToAdd.balanceToAdd);
    //         }
    //         await SubscriptionBalance.contractInstance()
    //             .methods.addBalance(address, selectedNft, creditToAdd.balanceToAdd)
    //             .send({ from: address });

    //         dispatch(
    //             setCreditToAdd({
    //                 ...creditToAdd,
    //                 estimateETH: '0',
    //                 netBalanceToAdd: '0',
    //                 change: false,
    //             })
    //         );

    //         const contractValuesRes = await getContractValues(Number(selectedNft));

    //         dispatch(
    //             setContractValues({
    //                 ...contractValues,
    //                 ...contractValuesRes,
    //             })
    //         );
    //     } catch (error: any) {
    //         console.error('Error while adding subscription credit: ', error);
    //         showToast('warning', error?.message);
    //     }

    //     setPurchaseXctLoading(false);
    //     setEstimateETHLoading(false);
    //     setBalanceLoading(false);
    // };

    const initBalance = async () => {
        if (!appCrypto) return;
        const requestList = [];

        const subBalResp = await appCrypto.dripRateManager.getBalancesForSubscription(selectedNft);
        if (subBalResp.success == false) {
            showToast('warning', subBalResp.data);
            return;
        }
        const balancesForSubscription = subBalResp.data;

        dispatch(setBalancesForSubscription(balancesForSubscription));
        // dispatch(
        //     setBalanceValues({
        //         walletBalance: xctBal.toString(),
        //         subscriptionBalance: subBal.toString(),
        //     })
        // );
    };

    useEffect(() => {
        // if (
        //     !creditToAdd ||
        //     !creditToAdd.balanceToAdd ||
        //     !balanceValues ||
        //     !balanceValues.walletBalance
        // )
        //     return;

        const balanceToAdd = new BN(subBalEstimate.xctRequired);
        const walletBalance = new BN(balancesForSubscription.walletBalance);

        dispatch(setDeployEnabled(balanceToAdd.eq(new BN(0)) || walletBalance.gte(balanceToAdd)));
    }, [subBalEstimate, balancesForSubscription]);

    useEffect(() => {
        dispatch(setFormValidationFunc(() => true));
    }, [stepIndex]);

    //   useEffect(() => {
    //     // if (stepIndex >= 6) {
    //     //   handleSubmit(onSubmit, onError)();
    //     // }
    //     if(slideActions.isSlide(stepName.BALANCE_TO_ADD))
    //     {
    //         handleSubmit(onSubmit, onError)();
    //     }
    //   }, [stepIndex]);

    useEffect(() => {
        if (!selectedNft) return;
        if (status !== 'deploy-form') return;

        if (
            deployedApps &&
            deployedApps?.find((app: ContractApp) => app.appName === getValues('appName'))
        ) {
            dispatch(setCurrentStep(steps[0]));
        }
    }, [selectedNft, deployedApps]);

    // useEffect(() => {
    //     if (!selectedNft) return;
    //     (async () => {
    //         try {
    //             const requestList = [];
    //             let initBalCheck = false;
    //             let calcDripCheck = false;

    //             if (
    //                 !balanceValues ||
    //                 !balanceValues.walletBalance ||
    //                 !new BN(balanceValues.walletBalance).gt(new BN(0))
    //             ) {
    //                 initBalCheck = true;
    //                 requestList.push(initBalance());
    //             }

    //             if (!creditToAdd || !creditToAdd.dripRate || creditToAdd.change) {
    //                 calcDripCheck = true;
    //                 requestList.push(calcDripRate());
    //             }

    //             if (initBalCheck) {
    //                 setBalanceLoading(true);
    //             }
    //             if (calcDripCheck) {
    //                 setEstimateETHLoading(true);
    //             }

    //             if (requestList.length) await Promise.all(requestList);

    //             if (initBalCheck) {
    //                 setBalanceLoading(false);
    //             }
    //             if (calcDripCheck) {
    //                 setEstimateETHLoading(false);
    //             }
    //         } catch (error: any) {
    //             console.error('Error while initializing balance to add: ', error);

    //             setBalanceLoading(false);
    //             setEstimateETHLoading(false);

    //             showToast('error', error.message);
    //         }
    //     })();
    // }, [creditToAdd]);

    return (
        <div data-cy="drawer-balanceToAdd" className="scrollbar flex h-full flex-col overflow-auto">
            {/* <form
      data-cy="drawer-balanceToAdd"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="scrollbar flex h-full flex-col overflow-auto"
    > */}
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                {status !== 'deploy-edit' && (
                    <div className="bg-stk-green flex h-7 w-7 items-center justify-center rounded-full duration-300 mr-2">
                        <Icon
                            iconName="stack-regular-blue-100"
                            className="leading-3 duration-700"
                            layout="fixed"
                            width={10}
                            height={20}
                        />
                    </div>
                )}
                <span>{!selectedNft ? t('DRAWER_STEP5_TITLE1') : t('DRAWER_STEP5_TITLE2')}</span>
            </div>
            {!selectedNft && (
                <div
                    className={`${
                        status === 'deploy-form' ||
                        status === 'deploy-app' ||
                        status === 'upload-form'
                            ? 'mb-[4.5rem] mr-3'
                            : ''
                    } scrollbar h-0 flex-1 overflow-y-auto pb-5`}
                >
                    <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                        {(status === 'deploy-form' ||
                            status === 'deploy-app' ||
                            status === 'upload-form') && (
                            <p className="mt-3 text-sm">Add subscription balance to your NFT.</p>
                        )}
                        <p className="mt-8 text-sm font-bold text-stk-grey-500 duration-500 md:text-stk-grey-400">
                            <span
                                className="text-stk-green cursor-pointer"
                                onClick={() => {
                                    dispatch(GeneralActions.setLoginModal(true));
                                    dispatch(DrawerActions.setClickOnConnectWallate(true));
                                }}
                            >
                                {t('CONNECT_WALLET')}
                            </span>
                        </p>
                    </div>
                </div>
            )}
            {selectedNft && (
                <div
                    className={`${
                        status === 'deploy-form' ||
                        status === 'deploy-app' ||
                        status === 'upload-form'
                            ? 'mb-[4.5rem] mr-3'
                            : ''
                    } scrollbar h-0 flex-1 overflow-y-auto pb-5`}
                >
                    <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                        {(status === 'deploy-form' ||
                            status === 'deploy-app' ||
                            status === 'upload-form') && (
                            <p className="mt-3 text-sm">
                                Add subscription credit to your NFT (All apps are affected).
                            </p>
                        )}
                        <div className="mt-3 py-3 px-5 bg-stk-blue-100 rounded-xl w-full">
                            <div className="my-2 flex items-center">
                                <i className="fa-regular fa-coins w-4 h-4 mr-3 text-stk-grey-500" />
                                <span>Subscription Credit: </span>
                                {balanceLoading ? (
                                    <SkeletonBalanceToAdd />
                                ) : (
                                    <span className="text-stk-green ml-2">
                                        {subscriptionBalance
                                            ? showBalanceVal(subscriptionBalance)
                                            : ''}
                                    </span>
                                )}
                            </div>
                            <div className="my-2 flex items-center">
                                <i className="fa-regular fa-wallet w-4 h-4 mr-3 text-stk-grey-500" />
                                <span>Wallet Credit: </span>
                                {balanceLoading ? (
                                    <SkeletonBalanceToAdd width={10} />
                                ) : (
                                    <span className="text-stk-green ml-2">
                                        ${showBalanceVal(balancesForSubscription?.walletBalance)}
                                    </span>
                                )}
                            </div>
                            <div className="my-2 flex items-center">
                                <i className="fa-regular fa-timer w-4 h-4 mr-3 text-stk-grey-500" />
                                <span>Balance End Time: </span>
                                {balanceLoading ? (
                                    <SkeletonBalanceToAdd width={48} />
                                ) : (
                                    <span className="text-stk-green ml-2">
                                        {displayBalanceEndTime(balanceEndTime)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="my-4 w-full">
                            <DrawerSelect
                                label="Time Period"
                                defaultValue={DEFAULT_TIME_PERIOD}
                                value={timePeriodList.find(
                                    (timeObj) => timeObj.value == timePeriod
                                )}
                                options={timePeriodList}
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                                name="timePeriod"
                                // disabled={disableTimePeriod}
                                // disabled={estimateETHLoading}
                                onChange={(timePeriodObj: { label: string; value: number }) => {
                                    setTimePeriod(timePeriodObj.value);
                                    estimateCreditPurchase(timePeriodObj);
                                }}
                            />
                        </div>
                        {totalDripRate && new BN(totalDripRate).gt(new BN(0)) && (
                            <>
                                <div className="my-2 flex items-center w-full border-stk-white/20 border-b-[0.5px]">
                                    <span>Credit required: </span>
                                    {estimateETHLoading ? (
                                        <SkeletonBalanceToAdd />
                                    ) : (
                                        <span className="text-stk-green ml-2">
                                            ${showBalanceVal(subBalEstimate.xctRequired)}
                                        </span>
                                    )}
                                </div>
                                <div className="my-2 flex items-center w-full border-stk-white/20 border-b-[0.5px]">
                                    <span>Net Credit: </span>
                                    {estimateETHLoading ? (
                                        <SkeletonBalanceToAdd />
                                    ) : (
                                        <span className="text-stk-green ml-2">
                                            ${showBalanceVal(subBalEstimate.netXCTRequired)}
                                        </span>
                                    )}
                                </div>
                                <div className="my-2 flex items-center w-full border-stk-white/20 border-b-[0.5px]">
                                    <span>ETH for Net Credit: </span>
                                    {estimateETHLoading ? (
                                        <SkeletonBalanceToAdd />
                                    ) : (
                                        <span className="text-stk-green ml-2">
                                            {showBalanceVal(subBalEstimate.netETHRequired)} ETH
                                        </span>
                                    )}
                                </div>
                                {isFileApp && status !== 'upload-form' ? (
                                    <Button
                                        // dataCy="drawer-button-next"
                                        // onClick={addSubscriptionCredit}
                                        disabled={
                                            (subBalEstimate.netETHRequired &&
                                                new BN(subBalEstimate.netETHRequired).eq(
                                                    new BN(0)
                                                )) ||
                                            purchaseXctLoading
                                        }
                                        className="font-semibold my-3"
                                    >
                                        Add Subscription Credit
                                    </Button>
                                ) : (
                                    <Button
                                        // dataCy="drawer-button-next"
                                        onClick={purchaseXCT}
                                        disabled={
                                            (subBalEstimate.netETHRequired &&
                                                new BN(subBalEstimate.netETHRequired).eq(
                                                    new BN(0)
                                                )) ||
                                            purchaseXctLoading
                                        }
                                        className="font-semibold my-3"
                                    >
                                        Add Wallet Credit
                                    </Button>
                                )}
                                {/* <Button onClick={calcDripRate}>
                    calc drip rate
                </Button> */}
                            </>
                        )}
                        {/* <ResourceSummary /> */}
                        {Number(subscribeTime) < 0 &&
                            localStorage.getItem('referralAddress')?.toLowerCase() !==
                                address?.toLowerCase() && (
                                <>
                                    <div className="w-full">
                                        <span>
                                            Your Referral Address:{' '}
                                            {localStorage.getItem('referralAddress')}
                                        </span>
                                    </div>
                                    {/* <div className="w-full">
                                        <span>
                                            Your Discount:
                                            {creditToAdd &&
                                                creditToAdd.discountPercent &&
                                                Number(creditToAdd.discountPercent) / 100000}
                                        </span>
                                    </div> */}
                                </>
                            )}
                    </div>
                </div>
            )}
            {/* </form> */}
        </div>
    );
};

export default BalanceToAdd;
