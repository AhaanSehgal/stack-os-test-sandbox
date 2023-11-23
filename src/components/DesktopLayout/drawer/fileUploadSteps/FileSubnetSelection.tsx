import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxInput from '@/components/common/CheckBox';
import Input from '@/components/common/Input';
import { fileSubnetList } from './helpers';
import { useEffect, useState } from 'react';
import { setCalcDripRateFlag } from '@/redux/general/actions';
import { setFormValidationFunc } from '@/redux/drawer/actions';

interface Props {
    selectionSubnetList: string[];
}
const FileSubnetSelection = ({ selectionSubnetList }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const drawer = useSelector((state: any) => state.drawer);

    const [subnetReplicaMap, setSubnetReplicaMap] = useState<{ [subnetID: string]: number }>({});
    const [validFailFlag, setValidFailFlag] = useState(false);

    const { creditToAdd } = drawer;

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

    useEffect(() => {
        dispatch(setCalcDripRateFlag(true));
        setSubnetReplicaMap(getValues().subnetReplicaMap);

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
        <div className="scrollbar flex h-full flex-col overflow-auto">
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                <i className="fa-solid fa-cloud-check mr-2 h-5 w-5 text-stk-green" />
                <span>Choose Subnets</span>
            </div>
            <div className="scrollbar mb-[4.5rem] mr-3 h-0 flex-1 overflow-y-auto pb-5">
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    <p className="mt-3 text-sm mb-5">Choose one or more subnets & replicas.</p>
                    {validFailFlag ? (
                        <span className={`text-stk-red mr-1 duration-500`}>
                            Please select a subnet
                        </span>
                    ) : (
                        ''
                    )}
                    {fileSubnetList.map(({ subnetID, subnetName }) => (
                        <div key={subnetID} className="w-full bg-stk-blue-100 rounded-md my-1 p-3">
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-col items-center justify-center">
                                    <CheckboxInput
                                        noMarginTop
                                        value={
                                            subnetReplicaMap[subnetID] !== undefined ||
                                            subnetReplicaMap[subnetID] == 0
                                        }
                                        onClick={() => {
                                            dispatch(setCalcDripRateFlag(true));
                                            const subRepMap = {
                                                ...subnetReplicaMap,
                                            };
                                            if (subnetReplicaMap[subnetID] !== undefined) {
                                                // delete subRepMap[subnetID];
                                                subRepMap[subnetID] = 0;
                                            } else {
                                                subRepMap[subnetID] = 1;
                                            }
                                            setSubnetReplicaMap({
                                                ...subRepMap,
                                            });
                                            setValue('subnetReplicaMap', {
                                                ...subRepMap,
                                            });
                                        }}
                                        label={`${subnetName} (#${subnetID})`}
                                    />
                                </div>
                            </div>

                            {getValues().subnetReplicaMap[subnetID] !== undefined && (
                                <div className="mt-3 w-full">
                                    <Input
                                        value={subnetReplicaMap[subnetID]}
                                        type="number"
                                        required
                                        name={`fileSubnetValues.${subnetID}`}
                                        register={register}
                                        disabled
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
                                            const replica = value === '' ? 0 : Number(value);
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileSubnetSelection;
