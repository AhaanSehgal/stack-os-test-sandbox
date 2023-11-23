import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import {
    setBalancesForSubscription,
    setDripRateFactors,
    setMetaDataValues,
    setNftRole,
    setSelectedNft,
    setSubscriptionParam,
} from '@/redux/general/actions';
import { useSelector } from '@/redux/hooks';
import { NftData } from '@/utils/types';
import showToast from '@/utils/showToast';
import { getMetaDataValues, getNFTList, initDripRateAndSubBalance } from '@/utils/utils';
import Dropdown from '@/components/common/Dropdown';
import Icon from '@/components/common/Icon';
import SkeletonClusterDropdown from '@/components/common/skeletons/SkeletonClusterDropdown';
import { GeneralState, MetaDataValues } from '@/redux/general/types';

interface Props {
    className?: string;
    dataCy?: string;
    nftsChanged: boolean;
}

interface NftOption {
    value: string;
    label: string;
}

const ClusterDropdown = ({ dataCy, className, nftsChanged }: Props) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { address } = useAccount();

    const [nftData, setNFTData] = useState<NftData>({ nftList: [] });
    const [loading, setLoading] = useState(false);
    // const { general } = useSelector((state) => state);
    const general: GeneralState = useSelector((state: any) => state.general);

    const { selectedNft, appCrypto } = general;

    const getLabel = (nftID: string) => {
        const str = `${nftID} : ${nftData[Number(nftID)]?.owner ? 'Owner,' : ''} ${
            nftData[Number(nftID)]?.read ? 'Read,' : ''
        } ${nftData[Number(nftID)]?.deployer ? 'Deployer,' : ''} ${
            nftData[Number(nftID)]?.billing ? 'Billing,' : ''
        } ${nftData[Number(nftID)]?.access ? 'Access,' : ''}`;

        return str.trim().slice(0, -1);
    };

    useEffect(() => {
        if (!address) return;
        if (!appCrypto) return;

        setLoading(true);
        (async () => {
            try {
                const res = await getNFTList(appCrypto, address);

                setNFTData(res);
                setLoading(false);
            } catch (error: any) {
                console.error('Error while getting accounts: ', error);
                setLoading(false);
                showToast('error', error?.message);
            }
        })();
    }, [nftsChanged, address]);

    const handleChange = async (nft: NftOption) => {
        if (!appCrypto) return;
        try {
            dispatch(setSelectedNft(nft.value));
            dispatch(setNftRole(nftData[Number(nft.value)]));

            const initDRResp = await initDripRateAndSubBalance(appCrypto, nft.value);
            if (initDRResp.success == false) throw initDRResp.data;
            const { subscriptionParam, dripRateFactors, balancesForSubscription } = initDRResp.data;

            dispatch(setSubscriptionParam(subscriptionParam));
            dispatch(setDripRateFactors(dripRateFactors));
            dispatch(setBalancesForSubscription(balancesForSubscription));

            // const metaDataValues: MetaDataValues = await getMetaDataValues(appCrypto, nft.value);
            // dispatch(setMetaDataValues(metaDataValues));
        } catch (error: any) {
            console.error('Error while getting subscription: ', error);
            showToast('error', error?.message);
        }
    };

    return (
        <div className={className} data-tip={t('UNABLE_SWITCH_NETWORK')} data-for="unableSwitch">
            <Dropdown
                className="cursor-pointer flex flex-row items-start justify-start rounded-md bg-stk-blue-100 py-2 px-3"
                header={t('LOGIN_SELECT_ACCOUNT')}
                selected={selectedNft && nftData[Number(selectedNft)] ? Number(selectedNft) : 0}
                dropdownOptions={nftData?.nftList?.map((val: string) => {
                    const res = {
                        title: getLabel(val),
                        value: val,
                        id: val,
                    };
                    return res;
                })}
                onChangeSelection={(role: NftOption) => {
                    handleChange(role);
                }}
                arrow
                topOpenMargin={36}
                dataCy={dataCy}
            >
                <Icon iconName="stackos-icon" className="h-5 w-5" />
                {loading ? (
                    <SkeletonClusterDropdown />
                ) : (
                    <span
                        data-cy="selected-network"
                        className="truncate px-3 text-sm text-stk-grey-200"
                    >
                        {selectedNft && nftData[Number(selectedNft)]
                            ? getLabel(selectedNft)
                            : 'Select account'}
                    </span>
                )}
            </Dropdown>
        </div>
    );
};

export default ClusterDropdown;
