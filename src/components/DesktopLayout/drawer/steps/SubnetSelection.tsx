/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormValidationFunc } from '@/redux/drawer/actions';
import CheckboxInput from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { useSelector } from '@/redux/hooks';
import SkeletonSubnetSelection from '@/components/common/skeletons/SkeletonSubnetSelection';
import { DrawerState } from '@/redux/drawer/types';
import { GeneralState } from '@/redux/general/types';
import { setCalcDripRateFlag } from '@/redux/general/actions';

interface Props {
    selectionSubnetList: { subnetID: string; subnetName: string }[];
}

const SubnetSelection = ({ selectionSubnetList }: Props) => {
    const { t } = useTranslation();

    //   const { drawer, general } = useSelector((state) => state);
    const drawer: DrawerState = useSelector((state) => state.drawer);
    const general: GeneralState = useSelector((state) => state.general);
    const { status, stepIndex } = drawer;
    // const { subnetList } = general;
    console.log('selectionSubnetList', selectionSubnetList);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [subnetReplicaMap, setSubnetReplicaMap] = useState<{ [subnetID: string]: number }>({});
    const [subnetSelectedMap, setSubnetSelectedMap] = useState<{ [subnetID: string]: boolean }>({});
    const [validFailFlag, setValidFailFlag] = useState(false);

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
    //     if (formValues.appName === 'webtty') {
    //       const subnetValues: any = {};

    //       // eslint-disable-next-line array-callback-return
    //       Object.entries(data.subnets).map(([key, val]) => {
    //         if (val) subnetValues[key] = 1;
    //       });

    //       data.subnetValues = subnetValues;
    //     }

    //     dispatch(
    //         setFormValues({
    //           ...formValues,
    //           ...data,
    //         })
    //       );
    //     slideActions.goToNextSlide(stepName.SUBNET_SELECTION);
    //     //   dispatch(setCurrentStep(steps[stepIndex - 1]));
    //   };

    useEffect(() => {
        dispatch(setFormValidationFunc(() => true));
    }, [stepIndex]);

    useEffect(() => {
        dispatch(setCalcDripRateFlag(true));
        setSubnetReplicaMap(getValues().subnetReplicaMap);

        const subnetList = Object.keys(getValues().subnetReplicaMap);
        const subSelMap: { [sub: string]: boolean } = {};
        for (let i = 0; i < subnetList.length; i++) {
            const subnetID = subnetList[i];
            if (getValues().subnetReplicaMap[subnetID] > 0) {
                subSelMap[subnetID] = true;
            }
        }
        setSubnetSelectedMap(subSelMap);

        dispatch(
            setFormValidationFunc(() => {
                const subnetReplicaMap = getValues().subnetReplicaMap;
                console.log('subnetReplicaMap: ', subnetReplicaMap);
                const subnetList = Object.keys(subnetReplicaMap);
                if (subnetList.length == 0) {
                    setValidFailFlag(true);
                    return false;
                }
                for (let i = 0; i < subnetList.length; i++) {
                    const subnetID = subnetList[i];
                    if (subnetReplicaMap[subnetID] == 0) {
                        setValidFailFlag(true);
                        return false;
                    }
                }
                return true;
            })
        );
    }, []);

    return (
        <div
            data-cy="drawer-subnet-selection"
            className="scrollbar flex h-full w-full flex-col overflow-auto"
        >
            {/* <form
      data-cy="drawer-subnet-selection"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="scrollbar flex h-full w-full flex-col overflow-auto"
    > */}
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                {status !== 'deploy-edit' && (
                    <i className="fa-solid fa-circle-nodes mr-2 h-5 w-5 text-stk-green" />
                )}
                <span>Choose Subnets:</span>
            </div>

            <div
                className={`${
                    status === 'deploy-form' || status === 'deploy-app' ? 'mb-[4.5rem] mr-3' : ''
                } scrollbar h-0 flex-1 overflow-y-auto pb-5`}
            >
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    {(status === 'deploy-form' || status === 'deploy-app') && (
                        <p className="mt-3 text-sm mb-5">Choose one or more subnets & replicas.</p>
                    )}
                    {validFailFlag ? (
                        <span className={`text-stk-red mr-1 duration-500`}>
                            Please select a subnet
                        </span>
                    ) : (
                        ''
                    )}
                    {loading ? (
                        <SkeletonSubnetSelection />
                    ) : (
                        selectionSubnetList.map(({ subnetID, subnetName }) => (
                            <>
                                {
                                    <div
                                        key={subnetID}
                                        className="w-full bg-stk-blue-100 rounded-md my-1 p-3"
                                    >
                                        <div className="flex flex-row gap-2">
                                            <div className="flex flex-col items-center justify-center">
                                                <CheckboxInput
                                                    noMarginTop
                                                    value={subnetSelectedMap[subnetID]}
                                                    onClick={() => {
                                                        dispatch(setCalcDripRateFlag(true));

                                                        const subRepMap = {
                                                            ...subnetReplicaMap,
                                                        };

                                                        const subSelMap = {
                                                            ...subnetSelectedMap,
                                                        };

                                                        if (!subSelMap[subnetID]) {
                                                            subRepMap[subnetID] = 1;
                                                        } else {
                                                            delete subRepMap[subnetID];
                                                        }
                                                        subSelMap[subnetID] = !subSelMap[subnetID];

                                                        setSubnetReplicaMap({
                                                            ...subRepMap,
                                                        });
                                                        setValue('subnetReplicaMap', {
                                                            ...subRepMap,
                                                        });

                                                        setSubnetSelectedMap(subSelMap);
                                                    }}
                                                    label={`${subnetName} (#${subnetID})`}
                                                />
                                            </div>
                                        </div>

                                        {subnetSelectedMap[subnetID] && (
                                            <div className="mt-3 w-full">
                                                <Input
                                                    value={
                                                        // getValues().appName !== 'webtty' &&
                                                        // getValues().subnetReplicaMap &&
                                                        // getValues().subnetReplicaMap[subnetID]
                                                        subnetReplicaMap[subnetID]
                                                    }
                                                    defaultValue={
                                                        getValues().appName === 'webtty'
                                                            ? 1
                                                            : undefined
                                                    }
                                                    disabled={getValues().appName === 'webtty'}
                                                    type="number"
                                                    required
                                                    name={`subnetReplicaMap.${subnetID}`}
                                                    register={register}
                                                    errors={errors}
                                                    clearErrors={clearErrors}
                                                    placeholder={t('REPLICA_COUNT')}
                                                    onChange={(value) => {
                                                        dispatch(setCalcDripRateFlag(true));
                                                        console.log(
                                                            'setting replica value: ',
                                                            value,
                                                            value === '',
                                                            Number(value)
                                                        );
                                                        const replica =
                                                            value === '' ? 0 : Number(value);
                                                        setValue('subnetReplicaMap', {
                                                            ...getValues().subnetReplicaMap,
                                                            [subnetID]: replica,
                                                        });
                                                        setSubnetReplicaMap({
                                                            ...subnetReplicaMap,
                                                            [subnetID]: replica,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                }
                            </>
                        ))
                    )}
                </div>
            </div>
            {/* </form> */}
        </div>
    );
};

export default SubnetSelection;
