import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';
import Modal from '@/components/common/Modal';
import Button from '../common/Button';
import { setShellModalOpen } from '@/redux/general/actions';
import { useSelector } from '@/redux/hooks';
import LoadingSpinner from '../common/LoadingSpinner';
import showToast from '@/utils/showToast';
import Icon from '../common/Icon';
import { ContractBasedDeployment, Registration, ipfs } from '@/utils/appCryptoConfig';
import { setDeployedApps } from '@/redux/deploy/actions';
import { setDrawerOpen, setDrawerStatus } from '@/redux/drawer/actions';
import DrawerSelect from '../common/DrawerSelect';
import CheckboxInput from '../common/CheckBox';
import { MIN_RES_TYPE_LENGTH } from '@/utils/constants';
import { ContractApp } from '@/redux/general/types';

interface Props {
    showModal: boolean;
    onCloseModal?: () => void;
}

const ShellModal = ({ showModal, onCloseModal = () => null }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { general, deploy } = useSelector((state) => state);
    const { selectedNft } = general;
    const { deployedApps } = deploy;
    const { address } = useAccount();
    const [activeContext, setActiveContext] = useState<
        'loading' | 'success' | 'subnetSelection' | 'delete' | 'shell'
    >('loading');
    const [iframeSrc, setIframeSrc] = useState<string | undefined>();
    const [selectedSubnet, setSelectedSubnet] = useState(null);
    const [subnetList, setSubnetList] = useState([]);
    const [updateSubnets, setUpdateSubnets] = useState(false);
    const [newSubnet, setNewSubnets] = useState([]);

    useEffect(() => {
        if (!selectedNft) return;
        verifyWebtty();
    }, []);

    async function verifyWebtty() {
        try {
            const subList = deployedApps?.find((el) => el.appName === 'webtty').subnetList;
            console.log(
                'sublist:',
                subList,
                await Registration.contractInstance().methods.totalSubnets().call()
            );

            const data = await Registration.getAllSubnetAttributes();
            console.log('-->  data : ', data);

            const newD = data.map((el) => {
                let disabledField = false;
                let status = false;

                if (subList.includes(el.subnetID)) {
                    disabledField = true;
                    status = true;
                }
                return {
                    subnetID: el.subnetID,
                    subnetName: el.subnetName,
                    status,
                    disabledField,
                };
            });

            const subList2 = newD.filter((el) => subList.includes(el.subnetID));
            setSubnetList(subList2);

            setNewSubnets(newD);

            if (deployedApps?.some((el) => el.appName === 'webtty')) {
                setActiveContext('subnetSelection');
            } else {
                dispatch(setDrawerOpen(true));
                dispatch(setDrawerStatus('deploy-form'));
            }
        } catch (error: any) {
            console.error('Error while verifying webtty: ', error);
            showToast('error', error.message);
        }
    }

    useEffect(() => {
        if (selectedSubnet !== null) {
            // TODO :  temporary nft url  should change to nft-subnet url
            setIframeSrc(`https://shell-n${selectedNft}-marvel.stackos.io/`);
            setActiveContext('shell');
        }
    }, [selectedSubnet]);

    async function deleteWebTty() {
        try {
            setActiveContext('loading');
            const { appID } = deployedApps?.find((el) => el.appName === 'webtty');
            const result = await ContractBasedDeployment.deleteApp(selectedNft, appID);

            if (!result?.status) {
                showToast('error', 'Something went wrong! Please try again later.');
                setActiveContext('delete');
            } else {
                ipfs.deleteAppFromCache(address, selectedNft, 'webtty');
                const data = await ContractBasedDeployment.getAppsOfNFT(selectedNft);
                dispatch(setDeployedApps(data));
                dispatch(setShellModalOpen(false));
                router.push('/deploy');
            }
        } catch (error: any) {
            console.error('Error while deleting webtty: ', error);
            setActiveContext('delete');
            showToast('error', error.message);
        }
    }

    async function subscribeSubets() {
        try {
            setActiveContext('loading');
            const subList = newSubnet.filter((el) => el.status === true).map((el) => el.subnetID);
            const contractAppData: ContractApp = deployedApps?.find(
                (el) => el.appName === 'webtty'
            );
            const { resourceType, resourceCount, appDataCID, modifiedDataCID, appID } =
                contractAppData;
            const subnetValues = {};
            for (let i = 0; i < subList.length; i++) {
                subnetValues[subList[i]] = 1;
            }

            const multiplier = Object.values(subnetValues).map((value) =>
                new Array(MIN_RES_TYPE_LENGTH).fill(value)
            );

            let appCid = Buffer.from(`0${appDataCID}`, 'utf8').toString('hex');
            let modCid = Buffer.from(`0${modifiedDataCID}`, 'utf8').toString('hex');
            appCid = `0x${appCid}`;
            modCid = `0x${modCid}`;

            const result = await ContractBasedDeployment.contractInstance()
                .methods.updateApp(
                    0,
                    selectedNft,
                    appID,
                    [appCid, modCid],
                    subList,
                    multiplier,
                    resourceCount,
                    resourceType
                )
                .send({ from: address });
            if (!result?.status) {
                showToast('error', 'Something went wrong! Please try again later.');
                setActiveContext('subnetSelection');
            } else {
                const data = await ContractBasedDeployment.getAppsOfNFT(selectedNft);
                dispatch(setDeployedApps(data));
                dispatch(setShellModalOpen(false));
                router.push('/deploy');
            }
        } catch (error: any) {
            console.error('Error while subscribing to subnets: ', error);
            setActiveContext('subnetSelection');
            showToast('error', error.message);
        }
    }

    const contexts: any = {
        loading: (
            <div className="flex h-full flex-col items-center justify-center py-10">
                <LoadingSpinner />
                <span className="mt-8 text-xl text-stk-green">Loading...</span>
            </div>
        ),
        success: (
            <>
                <div className="flex flex-col items-center justify-center text-center">
                    <Icon width={195} height={212} iconName="stack-regular-green" />
                    <span className="mt-8 text-lg font-semibold text-white">
                        {t('SHELL_SUCCESS_TITLE')}
                    </span>
                    <span className="mt-2 mb-8 text-sm text-stk-grey-400">
                        {t('SHELL_SUCCESS_SUBTITLE')}
                    </span>
                </div>
                <Button onClick={() => dispatch(setShellModalOpen(false))}>{t('CONFIRM')}</Button>
            </>
        ),
        subnetSelection: (
            <div className="mt-4 flex flex-col items-center justify-center text-center">
                <div className="mt-8  ">
                    <DrawerSelect
                        placeholder={t('SHELL_SELECT_SUBNET_PLACEHOLDER')}
                        options={subnetList?.map((val: string) => ({
                            label: `${val.subnetName}(#${val.subnetID})`,
                            value: val.subnetID,
                        }))}
                        onChange={(value: any) => {
                            setSelectedSubnet(value.value);
                        }}
                    />
                </div>
                {newSubnet.length && (
                    <div className="mt-7 w-full">
                        <span className="mt-2 mb-8 max-w-xs text-sm text-stk-grey-400">
                            {t('SHELL_UPDATE_SUBNETS')}
                        </span>
                        <Switch
                            checked={updateSubnets}
                            onChange={setUpdateSubnets}
                            className={`${
                                updateSubnets ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${
                                    updateSubnets ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                        {updateSubnets && (
                            <>
                                {newSubnet?.map(
                                    ({ subnetID, subnetName, status, disabledField }) => (
                                        <CheckboxInput
                                            value={status}
                                            disabled={disabledField}
                                            onClick={() => {
                                                const temp = newSubnet.map((sub) => {
                                                    if (sub.subnetID === subnetID) {
                                                        return { ...sub, status: !sub.status };
                                                    } else return sub;
                                                });
                                                setNewSubnets(temp);
                                            }}
                                            label={`${subnetName} (#${subnetID})`}
                                        />
                                    )
                                )}
                                <Button className="w-full max-w-xs" onClick={subscribeSubets}>
                                    Subscribe Subnets
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        ),
        shell: (
            <iframe
                title="webtty"
                className="mt-4 h-[28rem] w-full border-none bg-transparent text-white "
                src={iframeSrc}
            />
        ),
        delete: (
            <>
                <div className="mt-28 flex flex-col items-center justify-center text-center">
                    <Icon width={59} height={59} iconName="close" />
                    <span className="mt-8 text-lg font-semibold text-white">
                        {t('SHELL_DELETE_TITLE')}
                    </span>
                    <span className="mt-2 mb-8 max-w-xs text-sm text-stk-grey-400">
                        {t('SHELL_SUCCESS_SUBTITLE')}
                    </span>
                </div>
                <div className="flex flex-row justify-center">
                    <Button className="w-full max-w-xs" onClick={() => deleteWebTty()}>
                        {t('DELETE')}
                    </Button>
                </div>
                <span
                    onClick={() => setActiveContext('shell')}
                    className="mt-2 mb-8 cursor-pointer text-center text-sm text-stk-grey-400"
                >
                    {t('SHELL_DELETE_REVERT')}
                </span>
            </>
        ),
    };

    const ActiveContext = contexts[activeContext];

    return (
        <Modal closeButton showModal={showModal} bgColor="#191F2D" onCloseModal={onCloseModal}>
            <div
                className={`flex  flex-col ${
                    iframeSrc ? 'h-[32rem] w-[50rem]' : 'h-full w-[30rem]'
                }`}
            >
                <div
                    className={`flex flex-row justify-start pb-5 text-xl font-bold text-stk-white ${
                        iframeSrc ? 'border-b border-solid border-[#565A69]' : ''
                    }`}
                >
                    <span className="w-full">{iframeSrc ? 'Web TTY' : 'Run Shell'}</span>
                    {iframeSrc && (
                        <div className="mr-10 flex w-full flex-row items-center justify-end gap-6">
                            <DrawerSelect
                                placeholder={t('SHELL_SELECT_SUBNET_PLACEHOLDER')}
                                options={subnetList?.map((val: string) => ({
                                    label: `${val.subnetName}(#${val.subnetID})`,
                                    value: val.subnetID,
                                }))}
                                onChange={(value: any) => {
                                    setSelectedSubnet(value.value);
                                }}
                            />
                            <div className="text-base  text-stk-white "></div>
                            <div
                                onClick={() => setActiveContext('delete')}
                                className="text-base font-medium text-stk-white hover:cursor-pointer"
                            >
                                <i className="fa-thin fa-trash mr-2 text-stk-green" />
                                {t('DELETE')}
                            </div>
                            <a href={iframeSrc} target="_blank" rel="noreferrer">
                                <div className="text-base font-medium text-stk-white hover:cursor-pointer">
                                    <i className="fa-regular fa-arrow-up-right-from-square mr-2 text-stk-green" />
                                    {t('SHELL_HEADER_EXTERNAL')}
                                </div>
                            </a>
                        </div>
                    )}
                </div>
                {ActiveContext}
            </div>
        </Modal>
    );
};

export default ShellModal;
