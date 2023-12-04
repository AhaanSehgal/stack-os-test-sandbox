/* eslint-disable no-shadow */
/* eslint-disable @next/next/no-css-tags */
import { createClient, WagmiConfig, allChains, Chain, configureChains } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import RouterProvider from '@/routes/router';
import { makeStore, wrapper } from '../redux/store';
import { setAppCrypto, setIsMobile } from '@/redux/general/actions';
import showToast from '@/utils/showToast';
import { addresses, web3Instance } from '@/utils/appCryptoConfig';
import * as ethers from 'ethers';
import { GeneralState } from '@/redux/general/types';
import { init } from '@decloudlabs/stk-v2/lib/services/contractService';
import dynamic from 'next/dynamic'

const TriaConnectProvider = dynamic(
    () => import("authenticate-test-2"),
    { ssr: false }
)

const BINANCE_MAINNET = 56;
const POLYGON_MAINNET = 137;
const HARDHAT_TESTNET = 31337;
const FANTOM_TESTNET = 4002;
const POLOYGON_TESTNET = 80001;

const rpcUrl: any = {
    56: 'https://bsc-dataseed.binance.org/',
    137: 'https://polygon-rpc.com/',
};

const polygonMainnet = allChains.filter((chain) => chain.id === POLYGON_MAINNET);
const polygonTestnet = allChains.filter((chain) => chain.id === POLOYGON_TESTNET);
const hardhatTestnet = allChains.filter(
    (chain) => chain.id === HARDHAT_TESTNET && chain.name === 'Hardhat'
);

const fantomTestnet: Chain = {
    network: 'fantom',
    id: FANTOM_TESTNET,
    name: 'Fantom Chain',
    nativeCurrency: {
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18,
    },
    rpcUrls: {
        default: 'https://rpc.testnet.fantom.network',
    },
    blockExplorers: {
        default: {
            name: 'Fantom Blockchain Explorer',
            url: 'https://ftmscan.com/',
        },
    },
};

const binanceMainnet: Chain = {
    network: 'binance',
    id: BINANCE_MAINNET,
    name: 'Binance Smart Chain',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: {
        default: 'https://bsc-dataseed.binance.org',
        default2: 'https://bsc-dataseed1.defibit.io/',
        default3: 'https://bsc-dataseed1.ninicoin.io/',
    },
    blockExplorers: {
        etherscan: {
            name: 'BNB Smart Chain Explorer',
            url: 'https://bscscan.com',
        },
        default: {
            name: 'BNB Smart Chain Explorer',
            url: 'https://bscscan.com',
        },
    },
};

const defaultChains = [...polygonMainnet, binanceMainnet];
// const chainsToBeUsed =
//     process.env.NODE_ENV !== 'production'
//         ? [...defaultChains, ...hardhatTestnet, fantomTestnet, ...polygonTestnet]
//         : defaultChains;
const chainsToBeUsed = [...hardhatTestnet, ...polygonTestnet];

const { chains, provider } = configureChains(chainsToBeUsed, [
    jsonRpcProvider({
        rpc: (chain) => ({
            http: rpcUrl[chain.id],
        }),
    }),
    publicProvider(),
]);

export const client = createClient({
    autoConnect: true,
    provider,
    connectors() {
        return [
            new MetaMaskConnector({
                chains,
            }),
            new WalletConnectConnector({
                chains,
                options: {
                    qrcode: true,
                },
            }),
            // new CoinbaseWalletConnector({
            //     chains,
            //     options: {
            //         appName: 'stackos',
            //     },
            // }),
        ];
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    const [width, setWidth] = useState<number>(0);
    const [curAddress, setCurrentAddress] = useState<string | null>(null);
    const dispatch = useDispatch();

    const general: GeneralState = useSelector((state: any) => state.general);
    const { appCrypto } = general;

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener('resize', () => setWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setWidth(window.innerWidth));
        };
    }, []);

    useEffect(() => {
        if (width < 768) dispatch(setIsMobile(true));
        else dispatch(setIsMobile(false));
    }, [width]);

    useEffect(() => {
        (async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    let ethereum = window.ethereum;
                    // edge case if MM and CBW are both installed
                    //   if (window.ethereum.providers?.length) {
                    //     window.ethereum.providers.forEach(async (p: any) => {
                    //       if (p.isMetaMask) provider = p;
                    //     });
                    //   }

                    const web3Provider = new ethers.providers.Web3Provider(ethereum);

                    const accounts: string[] = await web3Provider.send('eth_requestAccounts', []);

                    console.log('initializing web3 instance');
                    const appCrypto = await web3Instance(web3Provider, accounts[0]);

                    // ethereum.on('accountsChanged', function (accounts: string[]) {
                    //     setCurrentAddress(accounts[0]);
                    //     // selectedAccount = accounts[0];

                    //     // defaultOptions = { from: selectedAccount };

                    //     console.log(`Selected account changed to ${accounts[0]}`);
                    // });

                    dispatch(setAppCrypto(appCrypto));
                }
            } catch (error: any) {
                console.error('Error while initiating web3 instance: ', error);
                showToast(
                    'error',
                    'Something went wrong. Please try reloading the page in a few minutes.'
                );
            }
        })();
    }, []);

    return (
        <>
            <Head>
                <link href="/assets/fontawesome/css/fontawesome.css" rel="stylesheet" />
                <link href="/assets/fontawesome/css/solid.css" rel="stylesheet" />
                <link href="/assets/fontawesome/css/regular.css" rel="stylesheet" />
                <link href="/assets/fontawesome/css/light.css" rel="stylesheet" />
                <link href="/assets/fontawesome/css/thin.css" rel="stylesheet" />
                <link href="/assets/fontawesome/css/brands.css" rel="stylesheet" />
                 <meta
          http-equiv="origin-trial"
          content="AnrU0+WJ9VPtF7HwQJYOsbXRvErZF40SAfZbnJPwBWZlZT77I+xQ8ejjfRAHTlZ+5lOlGahdEzwyiz/O6E1pFQQAAACVeyJvcmlnaW4iOiJodHRwczovL3N0YWNrLW9zLW5ldy1mbG93LXRlc3RpbmcudmVyY2VsLmFwcDo0NDMiLCJmZWF0dXJlIjoiRGlzYWJsZVRoaXJkUGFydHlTdG9yYWdlUGFydGl0aW9uaW5nIiwiZXhwaXJ5IjoxNzI1NDA3OTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0="
    />
            </Head>
            <WagmiConfig client={client}>
            <TriaConnectProvider />
                <RouterProvider>
                    <ToastContainer
                        theme="dark"
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        toastClassName={(ctx) => `${ctx?.defaultClassName} flex py-5`}
                        bodyClassName={() => `toast-body`}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover
                    />
                    <Component {...pageProps} />
                </RouterProvider>
            </WagmiConfig>
        </>
    );
}

export default wrapper.withRedux(appWithTranslation(MyApp));

// @ts-ignore
if (typeof window !== 'undefined' && window.Cypress) {
    // @ts-ignore
    window.store = makeStore();
}
