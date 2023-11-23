/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNetwork } from 'wagmi';
import { Input } from '@/components/common';
import { useSelector } from '@/redux/hooks';
import { setFormValidationFunc } from '@/redux/drawer/actions';
import { findAttribVars, getPayload } from '@/utils/utils';

const ModAttributeCreator = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { chain } = useNetwork();

    const { drawer, general } = useSelector((state) => state);
    const { selectedNft } = general;
    const { status, stepIndex } = drawer;

    const [modVarList, setModVarList] = useState<string[]>([]);

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

    //   const [varParam, setVarParam] = useState(attributeVariableParam);
    //   const [modVarVal, setModVarVal] = useState<{[key: string]: string}>(attributeVariableValue);

    const addCondition = (name: string, val: string) => {
        setValue(`attributeVariableParam.condition.${name}`, val);
    };

    const addDescription = (name: string, val: string) => {
        setValue(`attributeVariableParam.conditionDescription.${name}`, val);
    };

    const addDefaultValue = (name: string, val: string) => {
        setValue(`attributeVariableParam.defaultValue.${name}`, val);
    };

    const addModVarVal = (name: string, val: string) => {
        setValue(`attributeVariableValue.${name}`, val);
    };

    //   const onError: SubmitErrorHandler<FormValues> = () => {
    //     console.log("onError");
    //     slideActions.setSlide(stepName.ATTRIBUTE_VARIABLE);
    //   };

    //   const onSubmit: SubmitHandler<FormValues> = (data) => {

    //     if(!modStep)
    //         return;

    //         const {
    //             attributeVariableParam,
    //             attributeVariableValue
    //         } = data;

    //         dispatch(
    //             setFormValues({
    //                 ...formValues,
    //                 attributeVariableParam,
    //                 attributeVariableValue
    //             })
    //         );
    //         console.log("onSubmit: ", attributeVariableValue);
    //         slideActions.goToNextSlide(stepName.ATTRIBUTE_VARIABLE);
    //   };

    const validateForm = () => {
        let isError = false;

        const varNameList = Object.keys(getValues().attributeVariableParam.condition);
        const checkCondition = (varName: string, defCheck: boolean): boolean => {
            let reg;
            const varParam = getValues('attributeVariableParam');
            if (!varParam.condition[varName]) {
                setError(`attributeVariableParam.condition.${varName}`, {
                    type: 'required',
                    message: `Condition cannot be empty`,
                });

                return false;
            }

            try {
                reg = new RegExp(varParam.condition[varName]);
            } catch (err) {
                setError(`attributeVariableParam.condition.${varName}`, {
                    type: 'required',
                    message: `Condition is invalid`,
                });

                return false;
            }

            if (defCheck) {
                if (varParam.defaultValue[varName]) {
                    if (!reg.test(varParam.defaultValue[varName])) {
                        setError(`attributeVariableParam.defaultValue.${varName}`, {
                            type: 'required',
                            message: `Default value fails condition check`,
                        });

                        return false;
                    }
                }
            } else {
                const modVarVal = getValues(`attributeVariableValue.${varName}`);
                if (modVarVal) {
                    if (!reg.test(modVarVal)) {
                        setError(`attributeVariableValue.${varName}`, {
                            type: 'required',
                            message: `value fails condition check`,
                        });

                        return false;
                    }
                }
            }

            return true;
        };
        for (let i = 0; i < varNameList.length; i++) {
            const varName = varNameList[i];
            isError = isError || !checkCondition(varName, true);
        }

        const valList = Object.keys(getValues('attributeVariableValue'));
        console.log('valList ', valList);

        for (let i = 0; i < valList.length; i++) {
            const varName = valList[i];
            isError = isError || !checkCondition(varName, false);
        }

        return !isError;
    };

    //   const setHookFormValue = (varList: string[]) => {
    //     for(var i = 0; i < varList.length; i++)
    //     {
    //         const varName = varList[i];
    //         setValue(`condition-${varName}`, attributeVariableParam.condition[varName]);
    //         setValue(`conditionDescription-${varName}`, attributeVariableParam.conditionDescription[varName]);
    //         setValue(`defaultValue-${varName}`, attributeVariableParam.defaultValue[varName]);
    // }
    //   }

    useEffect(() => {
        let nameList = Object.keys(getValues().attributeVariableParam.condition);
        let conditionCheck: { [key: string]: boolean } = {};
        let condition: { [key: string]: string } = {
            ...getValues().attributeVariableParam.condition,
            ...getValues('attributeVariableParam.condition'),
        };
        let conditionDescription: { [key: string]: string } = {
            ...getValues().attributeVariableParam.conditionDescription,
            ...getValues('attributeVariableParam.conditionDescription'),
        };
        let defaultValue: { [key: string]: string } = {
            ...getValues().attributeVariableParam.defaultValue,
            ...getValues('attributeVariableParam.defaultValue'),
        };
        let modVal: { [key: string]: string } = {
            ...getValues().attributeVariableValue,
            ...getValues('attributeVariableValue'),
        };

        const formData = getValues();
        const payload = getPayload(selectedNft, chain ? chain.id : 0, formData);
        const varList = findAttribVars(payload);
        setModVarList(varList);

        for (let i = 0; i < varList.length; i++) {
            const varName = varList[i];
            conditionCheck[varName] = true;

            if (!condition[varName]) {
                condition[varName] = '';
            }
        }

        for (let i = 0; i < nameList.length; i++) {
            const varName = nameList[i];
            if (!conditionCheck[varName] && condition[varName] != undefined) {
                delete condition[varName];
                delete conditionDescription[varName];
                delete defaultValue[varName];
                delete modVal[varName];
            }
        }

        setValue('attributeVariableParam', {
            // ...formValues.attributeVariableParam,
            condition,
            conditionDescription,
            defaultValue,
        });
        setValue('attributeVariableValue', {
            ...modVal,
        });
        // dispatch(
        //     setFormValues(
        //         {
        //             ...formValues,
        //             attributeVariableParam: {
        //                 // ...formValues.attributeVariableParam,
        //                 condition,
        //                 conditionDescription,
        //                 defaultValue
        //             },
        //             attributeVariableValue: {
        //                 ...modVal
        //             }
        //         }
        //     )
        // );

        setValue('attributeVariableParam', {
            // ...formValues.attributeVariableParam,
            condition,
            conditionDescription,
            defaultValue,
        });
        setValue('attributeVariableValue', {
            ...modVal,
        });

        dispatch(setFormValidationFunc(validateForm));

        // setHookFormValue(varList);

        // if (slideActions.isSlideUpdated(stepName.ATTRIBUTE_VARIABLE) && validateForm()) {
        //   handleSubmit(onSubmit, onError)();
        // }
        // else {
        //     slideActions.setSlide(stepName.ATTRIBUTE_VARIABLE);
        // }
    }, [stepIndex]);

    return (
        <div
            data-cy="drawer-container-image"
            className="scrollbar flex h-full w-full flex-col overflow-auto"
        >
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                {status !== 'deploy-edit' && (
                    <i className="fa-solid fa-server mr-2 h-5 w-5 text-stk-green" />
                )}
                <span>Attribute Variables</span>
            </div>
            <div
                className={`${
                    status === 'deploy-form' || status === 'deploy-app' ? 'mb-[4.5rem] mr-3' : ''
                } scrollbar h-0 flex-1 overflow-y-auto pb-5`}
            >
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    {(status === 'deploy-form' || status === 'deploy-app') && (
                        <p className="mt-3 text-sm">Set the attribute variables.</p>
                    )}
                    <div className="mt-7 flex w-full flex-col gap-4 child:flex-1">
                        {
                            //   Object.keys(getValues().attributeVariableParam.condition).
                            modVarList.map((varName, idx) => (
                                //   varNameList && varNameList.length && varNameList.map((varName, idx) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <div key={idx} className="flex">
                                    <div className="flex w-full flex-col gap-3 child:flex-1">
                                        {/* <DrawerSelect
                      // value={item.protocol}
                      defaultValue={
                        status === 'deploy-edit' ? { label: item.protocol } : item.protocol
                      }
                      label={t('DRAWER_STEP2_INPUT1_LABEL')}
                      options={[{ label: 'TCP' }, { label: 'UDP' }]}
                      onChange={(value: { label: string }) =>
                        handlePortFormChange(idx, value, 'protocol')
                      }
                      disabled={formValues.isSoftwareLock && status === 'deploy-edit'}
                    /> */}
                                        <div className="border-stk-white/20 border-b-[0.5px]">
                                            Name:
                                            <span> {varName} </span>
                                        </div>
                                        {/* label={t('DRAWER_STEP2_INPUT5_LABEL')}
                  register={register}
                  errors={errors}
                  clearErrors={clearErrors}
                  name="path"
                  placeholder={t('DRAWER_STEP2_INPUT5_PLACEHOLDER')}
                  onChange={(value) => handleUpdateForm('path', value)}
                  disabled={formValues.isSoftwareLock && status === 'deploy-edit'} */}
                                        <div className="mt-2 w-full">
                                            <Input
                                                //   dynamicRequired
                                                label={`${t('DRAWER_STEP2_MODCOND_LABEL')}`}
                                                register={register}
                                                errors={errors}
                                                clearErrors={clearErrors}
                                                // name={`attributeVariableParam.condition.${varName}`}
                                                name={`attributeVariableParam.condition.${varName}`}
                                                // name={`condition${idx}`}
                                                // value={varParam.condition[varName]}
                                                // type="string"
                                                type="string"
                                                placeholder="Add Regex expression. E.g. [a-z]*"
                                                //   placeholder={t('DRAWER_STEP2_MODDESC_PLACEHOLDER')}
                                                onChange={(value) => addCondition(varName, value)}
                                            />
                                        </div>
                                        <div className="mt-2 w-full">
                                            <Input
                                                //   dynamicRequired
                                                label={`${t('DRAWER_STEP2_MODDESC_LABEL')}`}
                                                register={register}
                                                errors={errors}
                                                clearErrors={clearErrors}
                                                name={`attributeVariableParam.conditionDescription.${varName}`}
                                                // name={`condtionDescription${idx}`}
                                                // value={varParam.conditionDescription[varName]}
                                                type="string"
                                                placeholder="This is a description"
                                                //   placeholder={t('DRAWER_STEP2_INPUT3_PLACEHOLDER')}
                                                onChange={(value) => addDescription(varName, value)}
                                            />
                                        </div>
                                        <div className="mt-2 w-full">
                                            <Input
                                                //   dynamicRequired
                                                label={`${t('DRAWER_STEP2_MODDEF_LABEL')}`}
                                                register={register}
                                                errors={errors}
                                                clearErrors={clearErrors}
                                                name={`attributeVariableParam.defaultValue.${varName}`}
                                                // name={`defaultValue${idx}`}
                                                // value={varParam.defaultValue[varName]}
                                                type="string"
                                                //   placeholder={t('DRAWER_STEP2_INPUT3_PLACEHOLDER')}
                                                onChange={(value) =>
                                                    addDefaultValue(varName, value)
                                                }
                                            />
                                        </div>
                                        <div className="mt-2 w-full">
                                            <Input
                                                //   dynamicRequired
                                                label={`${t('DRAWER_STEP2_MODVAL_LABEL')}`}
                                                register={register}
                                                errors={errors}
                                                clearErrors={clearErrors}
                                                name={`attributeVariableValue.${varName}`}
                                                type="string"
                                                //   placeholder={t('DRAWER_STEP2_INPUT3_PLACEHOLDER')}
                                                onChange={(value) => addModVarVal(varName, value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <button
                    type="button"
                    onClick={() => removePortForm(idx)}
                    className={`${
                      idx > 0 ? '' : 'invisible'
                    } mt-14 ml-2 rounded-md border p-3 text-xs`}
                    disabled={formValues.isSoftwareLock && status === 'deploy-edit'}
                  >
                    <i className="fa-solid fa-trash" />
                  </button> */}
                                </div>
                            ))
                        }
                    </div>
                    {/* <button
                type="button"
                onClick={() => addPortForm()}
                className={`${
                  formValues.isSoftwareLock ? 'opacity-40' : 'opacity-100'
                } mt-7 w-full rounded-md border border-stk-grey-500 text-3xl font-light text-stk-grey-500`}
                disabled={formValues.isSoftwareLock && status === 'deploy-edit'}
              >
                +
              </button> */}
                </div>
            </div>
        </div>
    );
};

export default ModAttributeCreator;
