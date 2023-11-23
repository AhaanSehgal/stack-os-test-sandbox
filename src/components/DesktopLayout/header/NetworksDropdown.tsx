/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Chain, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import { Dropdown, Icon } from '@/components/common';
import { resetState } from '@/redux/app-store/actions';
import { resetStateGeneral } from '@/redux/general/actions';
import { resetStateDrawer } from '@/redux/drawer/actions';
import { resetStateHardware } from '@/redux/hardware/actions';
import { resetStateSwap } from '@/redux/swap/actions';
import { resetStateDeploy } from '@/redux/deploy/actions';

interface Network extends Chain {
    title: string;
    abbreviation: string;
    icon?: string;
    subtitle?: string;
}

interface Props {
    className?: string;
    dataCy?: string;
}

const NetworksDropdown = ({ dataCy, className }: Props) => {
    const { isDisconnected, connector, address } = useAccount();
    const { t } = useTranslation();
    const { chains, chain: activeChain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork({
        onSuccess(data) {
            if (data) {
                console.log('refresh network drop down');
                sessionStorage.setItem('currentNetworkId', String(data?.id));
                dispatch(resetState());
                dispatch(resetStateGeneral());
                dispatch(resetStateDrawer());
                dispatch(resetStateHardware());
                dispatch(resetStateSwap());
                dispatch(resetStateDeploy());
            }
        },
    });

    const dispatch = useDispatch();

    const BSC = 56;
    const POLYGON = 137;
    const HARDHAT = 31337;
    const FANTOM = 4002;
    const MUMBAI = 80001;

    const binanceChain = chains.find((chain) => chain.id === BSC);
    const polygonChain = chains.find((chain) => chain.id === POLYGON);
    const hardhatChain = chains.find((chain) => chain.id === HARDHAT);
    const fantomChain = chains.find((chain) => chain.id === FANTOM);
    const mumbaiChain = chains.find((chain) => chain.id === MUMBAI);

    const defaultNetworks = [
        {
            title: 'Binance Smart Chain',
            abbreviation: 'Binance',
            subtitle: '',
            icon: 'bnb',
            ...binanceChain,
        },
        {
            title: 'Polygon POS',
            abbreviation: 'Polygon',
            subtitle: '',
            icon: 'pos',
            ...polygonChain,
        },
    ];

    const networkOptions = [
        {
            title: 'Mumbai',
            abbreviation: 'Mumbai',
            subtitle: '',
            icon: 'polygon',
            id: 80001,
            ...mumbaiChain,
        },
    ];

    // const networkOptions =
    //   process.env.NODE_ENV !== 'production'
    //     ? [
    //         // ...defaultNetworks,
    //         // {
    //         //   title: 'Hardhat',
    //         //   abbreviation: 'Hardhat',
    //         //   subtitle: '',
    //         //   icon: 'hardhat',
    //         //   ...hardhatChain,
    //         // },
    //         // {
    //         //   title: 'Fantom',
    //         //   abbreviation: 'Fantom',
    //         //   subtitle: '',
    //         //   icon: 'fantom',
    //         //   ...fantomChain,
    //         // },
    //         {
    //           title: 'Mumbai',
    //           abbreviation: 'Mumbai',
    //           subtitle: '',
    //           icon: 'polygon',
    //           ...mumbaiChain,
    //         },
    //       ]
    //     : defaultNetworks;

    const [networkSelected, setNetworkSelected] = useState<Network>();

    useEffect(() => {
        function setupNetwork() {
            if (activeChain && activeChain?.id !== networkSelected?.id) {
                setNetworkSelected(
                    networkOptions.find((option) => option.id === activeChain?.id) as Network
                );

                if (activeChain?.id === 56 && isDisconnected) {
                    // connect({ connector: connectors.find((connector) => connector.id === 'metaMask') });
                }
            }
        }

        setupNetwork();
    }, [activeChain]);

    function onChangeNetwork(value: number) {
        if (activeChain?.id !== value) switchNetwork?.(value);
    }

    return (
        <>
            <div
                className={className}
                data-tip={t('UNABLE_SWITCH_NETWORK')}
                data-for="unableSwitch"
            >
                <Dropdown
                    className={`${
                        connector?.id === 'walletConnect' ? 'pointer-events-none' : 'cursor-pointer'
                    } flex flex-row items-start justify-start rounded-md bg-stk-blue-100 py-2 px-3`}
                    header="Select a network"
                    selected={networkSelected?.id}
                    dropdownOptions={networkOptions}
                    onChangeSelection={(value) => {
                        onChangeNetwork(value.id);
                    }}
                    arrow
                    topOpenMargin={36}
                    dataCy={dataCy}
                >
                    <Icon className="h-5 w-5" iconName={networkSelected?.icon || 'warning'} />

                    <span
                        data-cy="selected-network"
                        className="truncate px-3 text-sm text-stk-grey-200"
                    >
                        {address
                            ? (networkSelected && networkSelected.abbreviation) || 'Unsupported'
                            : 'Connect wallet'}
                    </span>
                </Dropdown>
            </div>
            {connector?.id === 'walletConnect' && (
                <ReactTooltip
                    id="unableSwitch"
                    place="top"
                    effect="solid"
                    backgroundColor="#DFDFDF"
                    textColor="#1F2937"
                    className="w-[18rem] text-center text-xs font-medium"
                />
            )}
        </>
    );
};

export default NetworksDropdown;
