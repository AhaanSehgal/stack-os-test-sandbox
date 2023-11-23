/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import { useSelector } from '@/redux/hooks';
import Input from '@/components/common/Input';
import { setFormValidationFunc } from '@/redux/drawer/actions';
import CheckboxInput from '@/components/common/CheckBox';

const FileInfo = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { drawer, deploy, general } = useSelector((state) => state);
    const { selectedNft } = general;
    const { status, stepIndex } = drawer;
    const { deployedApps } = deploy;

    const {
        register,
        clearErrors,
        control,
        formState: { errors },
        setValue,
        setError,
        getValues,
    } = useFormContext();

    const [appName, setAppName] = useState(getValues().appName);
    const [hostUrl, setHostUrl] = useState('');
    const [fileSizeError, setFileSizeError] = useState(false);
    const [encryptFlag, setEncryptFlag] = useState(false);
    const [validFailFlag, setValidFailFlag] = useState(false);

    function hasDuplicateAppName() {
        // eslint-disable-next-line prefer-regex-literals
        const letters = new RegExp(/^[a-zA-Z0-9]+$/);
        if (!getValues('appName')) {
            setError('appName', {
                type: 'required',
                message: 'Name cannot be empty',
            });

            return false;
        }

        if (!letters.test(getValues('appName') || '')) {
            setError('appName', {
                type: 'required',
                message: 'Name has invalid characters',
            });
            return false;
        }

        if (deployedApps && deployedApps?.find((app) => app.appName === getValues('appName'))) {
            setError('appName', {
                type: 'required',
                message: 'Name already in use',
            });
            return false;
        }

        const file = getValues('file');
        if (!file || file.length == 0) {
            setValidFailFlag(true);
            return false;
        }

        return true;
    }

    useEffect(() => {
        dispatch(setFormValidationFunc(hasDuplicateAppName));
    }, []);

    useEffect(() => {
        const visibleHostUrl = `${appName.toLowerCase()}-n${selectedNft}-marvel.stackos.io`;
        setValue('hostUrl', visibleHostUrl);
        setHostUrl(visibleHostUrl);
    }, [stepIndex, appName, selectedNft]);

    const handleFileChange = (e: any) => {
        setFileSizeError(false);

        const { files } = e.target;

        let totalFileSize = 0;

        for (let i = 0; i < files.length; i++) {
            totalFileSize += files[i].size;
        }

        const FILE_SIZE_LIMIT_IN_BYTES = 100 * 1024 * 1024;

        if (totalFileSize > FILE_SIZE_LIMIT_IN_BYTES) {
            setFileSizeError(true);
            return;
        }

        setValue('file', files);
    };

    return (
        <div className="scrollbar flex h-full w-full flex-col overflow-auto">
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                <i className="fa-regular fa-list-ul mr-2 h-5 w-5 text-stk-green" />
                <span>File Information</span>
            </div>
            <div className="scrollbar mb-[4.5rem] mr-3 h-0 flex-1 overflow-y-auto pb-5">
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    <p className="mt-3 text-sm">Enter file information.</p>
                    <div className="mt-7 flex w-full flex-row gap-4 child:flex-1">
                        <div className="w-full">
                            <Input
                                disabled={status === 'deploy-app' || status === 'deploy-edit'}
                                label={t('DRAWER_STEP1_INPUT2_LABEL')}
                                register={register}
                                errors={errors}
                                validation={{
                                    required: true,
                                    maxLength: 32,
                                    lowerCase: true,
                                }}
                                clearErrors={clearErrors}
                                name="appName"
                                onChange={setAppName}
                                value={appName}
                                placeholder={t('DRAWER_STEP1_INPUT2_PLACEHOLDER')}
                            />
                        </div>
                    </div>
                    <div className="mt-7 flex w-full flex-row gap-4 child:flex-1">
                        <div className="w-full">
                            <input
                                className="file:border file:border-stk-green file:bg-transparent file:text-stk-green file:mr-5 file:py-2 file:px-4 file:rounded-md file:text-sm file:font-medium hover:file:cursor-pointer hover:file:text-stk-blue-500 hover:file:bg-stk-green file:duration-300"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    {validFailFlag ? (
                        <span className=" mt-2 truncate text-sm font-medium text-stk-red duration-500">
                            Please upload a file
                        </span>
                    ) : (
                        ''
                    )}

                    <span className=" mt-2 truncate  text-sm font-medium text-stk-grey-400">
                        html, jpg, mp4, etc can be uploaded.
                    </span>
                    <span className="mb-2 truncate  text-sm font-medium text-stk-grey-400">
                        To preserve directory structure use .zip file.
                    </span>
                    {fileSizeError && (
                        <span className="mb-2 truncate  text-sm font-medium text-red-500">
                            File size cannot be exceeded to 100MB.
                        </span>
                    )}
                    <CheckboxInput
                        noMarginTop
                        value={encryptFlag}
                        onClick={() => {
                            setEncryptFlag(!encryptFlag);
                            setValue('encryptFlag', !encryptFlag);
                        }}
                        label={`Encrypt`}
                    />
                </div>
            </div>
        </div>
    );
};

export default FileInfo;
