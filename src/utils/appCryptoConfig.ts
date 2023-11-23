// import Web3 from 'web3';

import UmbralService from '@decloudlabs/stk-v2/lib/services/umbralService';
import STKSecretKeyEncrypter from '@decloudlabs/stk-v2/lib/services/STKSecretKeyEncrypter';
import STKBrowserETHkeyEncrypter from '@decloudlabs/stk-v2/lib/services/STKBrowserETHKeyEncrypter';
import STKAppEncrypt from '@decloudlabs/stk-v2/lib/services/STKAppEncrypt';
import * as ethers from 'ethers';
import { ContractAddresses, EtherContracts } from '@decloudlabs/stk-v2/lib/types/types';
import STKAppBrowserCache from '@decloudlabs/stk-v2/lib/services/STKAppBrowserCache';
import STKAppIPFSStorage from '@decloudlabs/stk-v2/lib/services/STKAppIPFSStorage';
import STKDripRateManager from '@decloudlabs/stk-v2/lib/services/STKDripRateManager';
import STKAppDecrypt from '@decloudlabs/stk-v2/lib/services/STKAppDecrypt';
import { init } from '@decloudlabs/stk-v2/lib/services/contractService';
import AppSenderStorage from './AppSenderStorage';
import UIUmbralService from './UIUmbralService';

export const addresses: ContractAddresses = {
    xct: process.env.NEXT_PUBLIC_XCT || '',
    stack: process.env.NEXT_PUBLIC_STACK || '',
    darkMatterNFT: process.env.NEXT_PUBLIC_NFT_TOKEN || '',
    darkMatterNFTMinter: '',
    Registration: process.env.NEXT_PUBLIC_REGISTRATION || '',
    appNFT: process.env.NEXT_PUBLIC_APP_NFT || '',
    appNFTMinter: process.env.NEXT_PUBLIC_APP_NFT_MINTER || '',
    SubscriptionBalanceCalculator: process.env.NEXT_PUBLIC_SUBSCRIPTION_BALANCE_CALCULATOR || '',
    SubscriptionBalance: process.env.NEXT_PUBLIC_SUBSCRIPTION_BALANCE || '',
    SubnetDAODistributor: process.env.NEXT_PUBLIC_SUBNET_DAO_DISTRIBUTOR || '',
    Subscription: process.env.NEXT_PUBLIC_SUBSCRIPTION || '',
    xctMinter: process.env.NEXT_PUBLIC_XCT_MINTER || '',
    AppDeployment: process.env.NEXT_PUBLIC_CONTRACT_BASED_DEPLOYMENT || '',
};

// let web3: Web3;

// export const web3Instance = async (provider: any, address: `0x${string}` | undefined) => {
//   if (
//     provider.provider &&
//     (provider.provider.isCoinbaseWallet || provider.provider.isWalletConnect)
//   ) {
//     provider = provider.provider;
//   }

//   web3 = new Web3(provider);

//   if (address) {
//     await init(web3, addresses, address);
//     await ipfs.initIPFS(
//       process.env.NEXT_PUBLIC_IPFS_PROJECT_ID,
//       process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET
//     );
//     await ipfs.initReadIpfs(
//       process.env.NEXT_PUBLIC_IPFS_PROJECT_ID,
//       process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET
//     );
//   }
// };

// const getWeb3 = (): Web3 => web3;

// export {
//   DarkMatterNFT,
//   ContractBasedDeployment,
//   AppNFT,
//   AppNFTMinter,
//   Registration,
//   Subscription,
//   SubscriptionBalance,
//   XCT,
//   XCTMinter,
//   SubscriptionBalanceCalculator,
//   SubscriptionContract,
//   setDefaultOptions,
//   utils,
//   decryptApp,
//   encryptApp,
//   ipfs,
//   libUtils,
//   getWeb3,
// };

// let localProvider = new ethers.providers.JsonRpcProvider(
//     "http://127.0.0.1:8545"
// );

export const web3Instance = async (provider: ethers.providers.Web3Provider, address: string) => {
    console.log('signer: ', provider, address);
    const signer = await provider.getSigner();

    const umbralService = new UIUmbralService();

    await umbralService.initAppCrypto();

    console.log('checking umbral: ', umbralService.getUmbral());

    const browserKeyEncryptor = new STKBrowserETHkeyEncrypter(address, provider); // this will change based on platform
    const appEncryptor = new STKAppEncrypt(browserKeyEncryptor, umbralService);

    const contractService: EtherContracts = init(provider, signer, addresses, address);

    const appBrowserCache = new STKAppBrowserCache();
    const appSenderStorage = new AppSenderStorage(appBrowserCache);

    const appDecryptor = new STKAppDecrypt(browserKeyEncryptor, umbralService);

    const dripRateManager = new STKDripRateManager(10 ** 12 + '', contractService);
    return {
        umbralService,
        appEncryptor,
        contractService,
        appBrowserCache,
        appIPFSStorage: appSenderStorage,
        appDecryptor,
        dripRateManager,
    };
};
