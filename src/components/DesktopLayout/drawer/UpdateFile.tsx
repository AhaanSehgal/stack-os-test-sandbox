import { useFormContext } from 'react-hook-form';
import { useAccount, useNetwork } from 'wagmi';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@/components/common/Button';
import { getIpfsFilePath, sendFileToUploadOnIpfs } from '@/utils/utils';
import { useSelector } from '@/redux/hooks';
import { client } from '@/pages/_app';
import showToast from '@/utils/showToast';
import { setDeployedApps } from '@/redux/deploy/actions';
import {
    setDrawerLoadingMessage,
    setDrawerStatus,
    setFormValues,
    setStepIndex,
} from '@/redux/drawer/actions';
import { formatAppParams } from '@decloudlabs/stk-v2/lib/utils/utils';
import { ContractApp } from '@decloudlabs/stk-v2/lib/types/types';
import { getAppList } from '@/utils/contractCallConfig';

const UpdateFile = () => {
    const dispatch = useDispatch();

    const { general, drawer } = useSelector((state) => state);

    const { selectedNft, appCrypto } = general;
    const { formValues } = drawer;

    const { address: userAddress } = useAccount();
    const { chain } = useNetwork();

    const { setValue } = useFormContext();

    const [file, setFile] = useState<FileList>([]);
    const [sendingFiles, setSendingFiles] = useState(false);

    const handleSendFiles = async () => {
        if (!appCrypto) return;
        setSendingFiles(true);

        try {
            dispatch(setDrawerStatus('loading'));
            dispatch(setDrawerLoadingMessage('Updating your app...'));

            await sendFileToUploadOnIpfs(
                appCrypto,
                formValues.appID,
                file,
                selectedNft,
                chain?.id,
                userAddress
            );

            const ipfsFilePath = await getIpfsFilePath(formValues.appID, selectedNft);

            const { filePath } = ipfsFilePath.data.data;
            const fileHostUrl = `ipfs.io/ipfs/${filePath}`;

            const updatedCachedData = await appCrypto.appBrowserCache.getAppDataFromCache(
                userAddress,
                selectedNft
            );

            updatedCachedData[formValues.appName].hostUrl = fileHostUrl;

            await getAppCrypto().appBrowserCache.setAppDataToCache(
                userAddress,
                selectedNft,
                updatedCachedData
            );

            const appListResp = await getAppList(selectedNft);
            if (appListResp.success == false) throw appListResp.data;
            const appList = appListResp.data;

            dispatch(setDeployedApps(appList));
            dispatch(
                setFormValues({
                    ...formValues,
                    hostUrl: fileHostUrl,
                })
            );

            setSendingFiles(false);
            dispatch(setDrawerStatus('deploy-edit'));
            showToast('success', 'File uploaded sucessfully');
            dispatch(setStepIndex(0));
        } catch (error: any) {
            const updatedCachedData = await getAppCrypto().appBrowserCache.getAppDataFromCache(
                userAddress,
                selectedNft
            );

            updatedCachedData[formValues?.appName].hostUrl = undefined;

            await getAppCrypto().appBrowserCache.setAppDataToCache(
                userAddress,
                selectedNft,
                updatedCachedData
            );
            dispatch(
                setFormValues({
                    ...formValues,
                    hostUrl: undefined,
                })
            );
            const fetchedAppList: any =
                await getAppCrypto().contractService.AppDeployment.getAppList(selectedNft);
            const appList: ContractApp[] = fetchedAppList.map((appObj: any) =>
                formatAppParams(selectedNft, appObj)
            );
            dispatch(setDeployedApps(appList));
            console.error('Error while updating file: ', error);
            if (error.message.includes('File is missing'))
                showToast('warning', 'Warning : No file has been uploaded');
            else showToast('error', error.message);
            setSendingFiles(false);
            dispatch(setDrawerStatus('deploy-edit'));
        }
    };

    return (
        <div className="scrollbar flex h-full w-full flex-col overflow-auto">
            <div className="flex shrink-0 items-center px-6 pt-10 text-xl font-bold text-stk-green">
                <i className="fa-regular fa-list-ul mr-2 h-5 w-5 text-stk-green" />
                <span>File Information</span>
            </div>
            <div className="scrollbar mb-[4.5rem] mr-3 h-0 flex-1 overflow-y-auto pb-5">
                <div className="flex flex-col items-start justify-start px-6 text-stk-white">
                    <p className="mt-3 text-sm">Update files</p>

                    <div className="mt-7 flex w-full flex-row gap-4 child:flex-1">
                        <div className="w-full">
                            <input
                                className="file:border file:border-stk-green file:bg-transparent file:text-stk-green file:mr-5 file:py-2 file:px-4 file:rounded-md file:text-sm file:font-medium hover:file:cursor-pointer hover:file:text-stk-blue-500 hover:file:bg-stk-green file:duration-300"
                                type="file"
                                multiple
                                onChange={(e: any) => {
                                    setValue('file', e.target.files);
                                    setFile(e.target.files);
                                }}
                                disabled={sendingFiles}
                            />
                        </div>
                    </div>
                    <span className="mt-2 truncate  text-sm font-medium text-stk-grey-400">
                        html, jpg, mp4, etc can be uploaded.
                    </span>
                    <span className="mb-2 truncate  text-sm font-medium text-stk-grey-400">
                        To preserve directory structure use .zip file.
                    </span>
                    <div
                        className={`${
                            sendingFiles ? 'animate-pulse' : ''
                        } mt-7 flex w-full flex-row gap-4 child:flex-1`}
                    >
                        <div className="w-full">
                            <Button
                                onClick={handleSendFiles}
                                disabled={sendingFiles || !file.length}
                            >
                                {sendingFiles ? 'Uploading Files...' : 'Upload Files'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateFile;
