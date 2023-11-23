/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
import BN from 'bn.js';
import dayjs from 'dayjs';
import base58 from 'bs58';
import { APICallReturn, APIResponse, BobData, NftData } from './types';
import { NFT_FACTOR_ADDRESSES, RESTYPE_NAME_TO_ID_MAP, ROLE, SECONDS_PER_DAY } from './constants';
import { AppCrypto, MetaDataValues, NftRole } from '@/redux/general/types';
import axios from 'axios';
import {
    AppModifier,
    AppPayload,
    AttribVariableParam,
    BalancesForSubscription,
    ContractApp,
    DripRateFactors,
    Port,
    SubscriptionParam,
    UrsulaAuth,
} from '@decloudlabs/stk-v2/lib/types/types';
import { setBalancesForSubscription } from '@/redux/general/actions';
import { AttributeVariableParam, FormValues } from '@/redux/drawer/types';
import { fileSubnetList } from '@/components/DesktopLayout/drawer/fileUploadSteps/helpers';

export const getNFTList = async (appCrypto: AppCrypto, address: `0x${string}` | undefined) => {
    const AppNFT = appCrypto.contractService.AppNFT;

    const nftCount = await AppNFT.balanceOf(address);

    const requestList = [];

    for (let i = 0; i < nftCount; i++) {
        const nftReq = AppNFT.tokenOfOwnerByIndex(address, i);
        requestList.push(nftReq);
    }

    const requestData = await Promise.all(requestList);
    const roleData = requestData[requestData.length - 1];
    let nftList = requestData.slice(0, nftCount);

    const respNFTData: NftData = {
        nftList: [],
    };

    for (let i = 0; i < nftCount; i++) {
        const nftID = nftList[i];

        respNFTData[Number(nftID)] = {
            owner: true,
        };
    }

    for (let i = 0; i < roleData?.length; i++) {
        let nftID = roleData[i][0];
        const role = roleData[i][1];

        let nftIDStr = nftID;
        nftID = Number(nftID);

        if (role === ROLE.READ) {
            if (!respNFTData[Number(nftID)]) {
                nftList.push(nftIDStr);
            }

            respNFTData[nftID] = { ...respNFTData[nftID], read: true };
        }

        if (role === ROLE.CONTRACT_BASED_DEPLOYER) {
            if (!respNFTData[Number(nftID)]) {
                nftList.push(nftIDStr);
            }

            respNFTData[nftID] = { ...respNFTData[nftID], deployer: true };
        }

        if (role === ROLE.ACCESS_MANAGER) {
            if (!respNFTData[Number(nftID)]) {
                nftList.push(nftIDStr);
            }

            respNFTData[nftID] = { ...respNFTData[nftID], access: true };
        }

        if (role === ROLE.BILLING_MANAGER) {
            if (!respNFTData[Number(nftID)]) {
                nftList.push(nftIDStr);
            }

            respNFTData[nftID] = { ...respNFTData[nftID], billing: true };
        }
    }

    nftList = nftList
        .map((nft) => Number(nft))
        .sort()
        .map((nft) => nft.toString());

    respNFTData.nftList = nftList;

    return { ...respNFTData };
};

export const isDeployAndUpdateDisabled = (nftRole: NftRole) =>
    nftRole.hasOwnProperty('read') &&
    !nftRole.hasOwnProperty('owner') &&
    !nftRole.hasOwnProperty('deployer');

export const calculateLicenseFee = (licenseFee: string) =>
    new BN(Number(licenseFee))
        .mul(new BN('1000000000000000000'))
        .div(new BN(SECONDS_PER_DAY))
        .toString();

export const getReferralAddress = (
    referralAddress: string,
    address: `0x${string}` | undefined,
    createTime: number
) => {
    if (!address) return '';

    const referralAddressStored = localStorage.getItem('referralAddress');

    if (!referralAddressStored) return referralAddress;

    if (referralAddressStored.toLowerCase() === address?.toLowerCase()) return referralAddress;

    if (createTime >= 0) return referralAddress;

    return referralAddressStored;
};

export const displayBalanceEndTime = (seconds: number) => {
    seconds *= 1000;

    const currentTime = Date.now();
    const balanceEndTime = dayjs(new Date(seconds));

    if (seconds === 0) {
        return '-';
    }

    if (currentTime > seconds) {
        return 'Your balance is expired!';
    }

    return balanceEndTime.format('LLL');
};

export const showBalanceVal = (bVal: string | undefined) => {
    if (!bVal) return 0;

    const XCT_SIZE = '10000000000000000';

    return new BN(bVal).div(new BN(XCT_SIZE)).toNumber() / 100;
};

export const stringToHex = (str: string | undefined) => {
    if (!str) return '';

    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }

    const diff = 64 - result.length;
    for (let i = 0; i < diff; i++) {
        result += '0';
    }

    return `0x${result}`;
};

export const hexToString = (hexx: string) => {
    const hex = hexx.toString();

    let str = '';

    for (let i = 0; i < hex.length; i += 2) {
        const val = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        if (val.charCodeAt(0) > 0) {
            str += val;
        }
    }
    return str;
};

// // TODO : remove unused functions
export const getIPFSHash = (digest: string, hashFunction: number, size: number) => {
    if (size === 0) return null;

    // const hashBytes
    const multihashBytes = Array.from(Buffer.from('0000' + digest.slice(2), 'hex'));

    // const multihashBytes = new hashBytes.constructor(2 + hashBytes.length);

    multihashBytes[0] = hashFunction;
    multihashBytes[1] = size;
    // multihashBytes.set(hashBytes, 2);

    return base58.encode(multihashBytes);
};

export const convertIPFSHash = (cid: string) => {
    const decoded = base58.decode(cid);

    const digest = `0x${Buffer.from(decoded.slice(2)).toString('hex')}`;
    const hashFunction = decoded[0];
    const size = decoded[1];

    return { digest, hashFunction, size };
};

export const initDripRateAndSubBalance = async (
    appCrypto: AppCrypto,
    nftID: string
): Promise<
    APICallReturn<{
        balancesForSubscription: BalancesForSubscription;
        subscriptionParam: SubscriptionParam;
        dripRateFactors: DripRateFactors;
        balanceEndTime: number;
    }>
> => {
    const dripRateManager = await appCrypto.dripRateManager;
    const subParamResp = await dripRateManager.getSubscriptionParam(nftID);
    if (subParamResp.success == false) return subParamResp;

    const balSubResp = await dripRateManager.getBalancesForSubscription(nftID);
    if (balSubResp.success == false) throw balSubResp.data;

    const dripRateResp = await dripRateManager.getDripRateFactors(nftID, subParamResp.data);
    if (dripRateResp.success == false) return dripRateResp;

    let balanceEndTime = 0;
    if (subParamResp.data.createTime > 0) {
        const balEndResp = await dripRateManager.getBalanceEndTime(nftID);
        if (balEndResp.success == false) return balEndResp;
        balanceEndTime = balEndResp.data;
    }

    return {
        success: true,
        data: {
            balancesForSubscription: balSubResp.data,
            subscriptionParam: subParamResp.data,
            dripRateFactors: dripRateResp.data,
            balanceEndTime: balanceEndTime,
        },
    };
};
// export const getContractValues = async (nftId: number) => {
//     const requestList = [];

//     const { Subscription, SubnetCluster, SubscriptionBalance } = appCrypto.contractService;

//     requestList.push(Subscription.contractInstance().methods.getNFTSubscription(nftId).call());

//     requestList.push(SubscriptionBalance.contractInstance().methods.totalPrevBalance(nftId).call());

//     requestList.push(Subscription.contractInstance().methods.getSupportFactor(nftId).call());

//     requestList.push(Subscription.contractInstance().methods.getLicenseFactor(nftId).call());

//     requestList.push(SubnetCluster.contractInstance().methods.getAllSubnetNamesAndIDs().call());

//     const createTime = await Subscription.contractInstance().methods.getCreateTime(nftId).call();
//     if (Number(createTime) !== 0) {
//         requestList.push(
//             SubscriptionBalance.contractInstance().methods.getBalanceEndTime(nftId).call()
//         );
//     } else {
//         requestList.push(0);
//     }

//     const platformAddress = await Subscription.contractInstance()
//         .methods.getNFTFactorAddress(nftId, NFT_FACTOR_ADDRESSES.platform)
//         .call();

//     requestList.push(
//         Subscription.contractInstance().methods.platformAddressMap(platformAddress).call()
//     );

//     requestList.push(
//         Subscription.contractInstance()
//             .methods.getNFTFactorAddress(nftId, NFT_FACTOR_ADDRESSES.license)
//             .call()
//     );
//     requestList.push(
//         Subscription.contractInstance()
//             .methods.getNFTFactorAddress(nftId, NFT_FACTOR_ADDRESSES.referral)
//             .call()
//     );
//     requestList.push(
//         Subscription.contractInstance()
//             .methods.getNFTFactorAddress(nftId, NFT_FACTOR_ADDRESSES.support)
//             .call()
//     );

//     const [
//         nftSubscription,
//         subscriptionBalance,
//         supportFactor,
//         licenseFactor,
//         subnetNameIDList,
//         balanceEndTime,
//         platformData,
//         licenseAddress,
//         referralAddress,
//         supportAddress,
//     ] = await Promise.all(requestList);

//     const subnetList = subnetNameIDList.map((e: any) => ({ subnetName: e[0], subnetID: e[1] }));

//     return {
//         nftSubscription,
//         createTime,
//         balanceEndTime,
//         subscriptionBalance,
//         supportFactor,
//         licenseFactor,
//         subnetList,
//         platformData,
//         licenseAddress,
//         referralAddress,
//         supportAddress,
//         platformAddress,
//     };
// };

export const updateHostUrl = (
    hostUrl: string | undefined,
    appName: string | undefined,
    selectedNft: string
) => {
    if (!hostUrl) return '';

    if (hostUrl?.split('-')[1].includes('n*')) {
        const stackosBaseUrl = sessionStorage.getItem('stackosBaseUrl');
        const infraNode = stackosBaseUrl?.substring(0, stackosBaseUrl.indexOf('.')) || 'marvel';

        if (appName?.toLowerCase() === 'webtty') {
            return `shell-n${selectedNft}-${infraNode}.stackos.io`;
        }

        return `${appName}-n${selectedNft}-${infraNode}.stackos.io`;
    }

    return hostUrl;
};

const getBundleData = async (cidPath: string) => {
    try {
        const resp = await axios.get(`https://ipfs.io/ipfs/${cidPath}`);
        const bundleData = resp.data;

        return JSON.stringify(bundleData);
    } catch (error: any) {
        console.error(error.message);
        return '';
    }
};

export const getMetaDataValues = async (appCrypto: AppCrypto, nftId: string) => {
    try {
        const AppNFT = appCrypto.contractService.AppNFT;
        const cidHash = await AppNFT.tokenURI(nftId);

        console.log('checking cid: ', cidHash, nftId);

        if (!cidHash)
            return {
                id: nftId,
                name: '',
                image: '',
                description: '',
                appToOpen: '',
                bundleCID: '',
                bundleData: '',
            };

        // const cid = getIPFSHash(cidHash, 18, 32);
        const cid = Buffer.from(cidHash.substring(2), 'hex').toString();
        console.log('cid: ', cid);

        // const metaData: MetaDataValues = await ipfs.readFile(`${cid}/nftID/${nftId}/metadata`);

        const resp = await axios.get(`https://ipfs.io/ipfs/${cid}/nftID/${nftId}/metadata`);
        const metaData: MetaDataValues = resp.data;

        const bundleCID = metaData?.bundleCID || '';
        let bundleData;
        if (bundleCID) bundleData = await getBundleData(bundleCID);
        return {
            id: nftId,
            name: metaData.name,
            image: metaData.image,
            description: metaData.description,
            appToOpen: metaData.appToOpen,
            bundleCID,
            bundleData,
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            id: nftId,
            name: '',
            image: '',
            description: '',
            appToOpen: '',
            bundleCID: '',
            bundleData: '',
        };
    }
};

export const getUsdcRequired = (xct: BN) => {
    let usdcRequired = new BN(xct).div(new BN(10 ** 12));
    usdcRequired = new BN(usdcRequired).mul(new BN(90)).div(new BN(100));

    return usdcRequired;
};

export const getBlockTimestamp = () => {
    const deadline = parseInt(process.env.UNISWAP_ROUTER_DEADLINE || '60', 10);
    const currentTime = Math.floor(Date.now() / 1000 + deadline);
    return currentTime;
};

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatEnvString = (envState: string) => {
    const envObj: { name: string; value: string }[] = [];
    const envVariables = envState.split(/\n/);

    envVariables.forEach((item) => {
        if (item.includes('=')) {
            item = item.replace('=', '***');
            const name = item.split('***')[0].trim();
            let value = item.split('***')[1].trim();
            try {
                let numVal = Number(value);
                if (!isNaN(numVal)) value = `'${numVal}'`;
            } catch (err: any) {}
            envObj.push({
                name,
                value,
            });
        }
    });

    return envObj;
};

export const getPayload = (
    nftID: string,
    chainID: number,
    formValues: FormValues,
    isFileApp?: boolean
): AppPayload | undefined => {
    const {
        appName,
        image,
        containerPort,
        servicePort,
        storage,
        isNoDeployment,
        statefulSet,
        privateImage,
        privateImageRegistry,
        privateImagePassword,
        privateImageUsername,
        persistenceEnabled,
        mountVolume,
        storageType,
        envVariables,
        args,
        commands,
        envVariablesEnabled,
        argsEnabled,
        commandsEnabled,
        username,
        password,
        attributeVariableParam,
        attributeVariableValue,
        advanceOptions,
    } = formValues;

    let { hostUrl } = formValues;
    console.log('hostUrl: ', hostUrl);

    const attribVarList: AttribVariableParam[] = Object.keys(attributeVariableParam.condition).map(
        (varName: string) => {
            return {
                name: varName,
                condition: attributeVariableParam.condition[varName],
                conditionDescription: attributeVariableParam?.conditionDescription[varName],
                defaultValue: attributeVariableParam?.defaultValue[varName],
            };
        }
    );

    console.log('attrib variable: ', attributeVariableParam, attributeVariableValue, attribVarList);

    //   hostUrl = "www.newdomain-{'modURL', '^//$//{[a-zA-Z]*//}$', 'This is mod url', 'www.example.com'}-marvel.stackos.io";

    if (!appName) throw new Error('appName is missing');
    if (persistenceEnabled === undefined) throw new Error('persistenceEnabled value is undefined');
    if (!chainID) throw new Error('chainID is missing');
    if (!isFileApp && !image.repository) throw new Error('image.repository is missing');
    // if (!isFileApp && !hostUrl) throw new Error('hostUrl is missing');

    const httpPortList: Port[] = containerPort
        .filter((portObj) => portObj.protocol.toUpperCase() === 'HTTP')
        .map((portObj, i) => {
            return {
                containerPort: portObj.port,
                servicePort: servicePort[i].port,
            };
        });

    const tcpPortList: Port[] = containerPort
        .filter((portObj) => portObj.protocol.toUpperCase() === 'TCP')
        .map((portObj, i) => {
            return {
                containerPort: portObj.port,
                servicePort: servicePort[i].port,
            };
        });
    // servicePort,
    //   hostUrl = updateHostUrl(hostUrl, appName, nftID);

    // if (appName?.toLowerCase() === 'webtty') {
    //     const payload: WebTTYAppPayload = {
    //         username,
    //         password: md5(password),
    //         namespace: `n${nftID}`,
    //         networkId: chainID.toString(),
    //         nftID,
    //     };

    //     return payload;
    // }

    let payload: AppPayload = {
        appName: appName.toLowerCase(),
        nftID,
        namespace: `n${nftID}`,
        containers: [
            {
                name: appName.toLowerCase(),
                image: image.repository + ':' + image.tag,
                tcpPorts: tcpPortList,
                httpPorts: httpPortList,
                resourceLimits: {
                    cpu: 100,
                    memory: 100,
                },
                resourceRequests: {
                    cpu: 100,
                    memory: 100,
                },
            },
        ],
        persistence: [],
        whitelistedIps: ['0.0.0.0/0'],
        replicaCount: 0,
        status: '',
        attribVarList,
        createHostURL: {
            containerID: 0,
            httpPortID: 0,
        },
    };

    if (privateImage && privateImageRegistry && privateImageUsername && privateImagePassword) {
        payload.privateImage = {
            registry: privateImageRegistry,
            username: privateImageUsername,
            password: privateImagePassword,
        };
    }

    // if (persistenceEnabled) {
    //     payload = {
    //         ...payload,
    //         volumeMounts: [{ mountPath: mountVolume || '/', name: appName?.toLowerCase() }],
    //         storageType: storageType === 'Standard IOPS' ? 'standard' : 'ssd-sc',
    //         storageSize: `${storage}Gi`,
    //     };
    // }

    if (envVariablesEnabled)
        payload.containers[0] = {
            ...payload.containers[0],
            envVariables: formatEnvString(envVariables),
        };
    if (argsEnabled) payload.containers[0] = { ...payload.containers[0], args: args.split(/\n/) };
    if (commandsEnabled)
        payload.containers[0] = { ...payload.containers[0], commands: commands.split(/\n/) };

    return payload;
};

export const getContractParam = (nftID: string, formValues: FormValues): ContractApp => {
    const {
        appID,
        appName,
        subnetReplicaMap,
        cpuType,
        cpuTypeCount,
        bandwidth,
        storage,
        isSoftwareLock,
        isNoDeployment,
    } = formValues;
    const subnetList = Object.keys(subnetReplicaMap);

    let resourceType: number[] = [];
    let resourceCount: number[] = [];
    let isFileApp = false;

    for (let i = 0; i < fileSubnetList.length; i++) {
        const fileSubnet = fileSubnetList[i];
        if (subnetReplicaMap[fileSubnet.subnetID]) {
            isFileApp = true;
            break;
        }
    }

    if (isFileApp) {
        resourceType = [5];
        resourceCount = [1];
    } else {
        resourceType = [
            RESTYPE_NAME_TO_ID_MAP[cpuType] || 0,
            RESTYPE_NAME_TO_ID_MAP.storage,
            RESTYPE_NAME_TO_ID_MAP.bandwidth,
        ];

        resourceCount = [cpuTypeCount || 0, bandwidth || 0, storage || 0];
    }

    const multiplier = subnetList.map((subnetID: string) =>
        new Array(resourceType.length).fill(subnetReplicaMap[subnetID] & (isNoDeployment ? 0 : 1))
    );

    const contractApp: ContractApp = {
        nftID,
        appID: appID || '0',
        appName: appName || '',
        appPath: '',
        modPath: '',
        subnetList,
        resourceCount,
        resourceType,
        cidLock: isSoftwareLock,
        multiplier,
    };

    return contractApp;
};

export const getAppModifier = (
    nftID: string,
    contractApp: ContractApp,
    formValues: FormValues
): AppModifier => {
    const multiplier: {
        [subnetID: string]: number[];
    } = {};

    const { subnetReplicaMap } = formValues;

    for (let i = 0; i < contractApp.subnetList.length; i++) {
        const subnetID = contractApp.subnetList[i];
        // multiplier[subnetID] = new Array(contractApp.resourceType.length).fill(
        //     contractApp.multiplier[i]
        // );
        multiplier[subnetID] = new Array(contractApp.resourceType.length).fill(
            subnetReplicaMap[subnetID]
        );
    }

    const appModifier: AppModifier = {
        modAttribVar: {},
        contractParam: {
            resourceCount: contractApp.resourceCount,
            resourceType: contractApp.resourceType,
            multiplier,
        },
        loggerURL: `${process.env.NEXT_PUBLIC_APP_STORAGE_SERVER}/api/appStatus`,
    };

    return appModifier;
};

export const getSubscriptionParam = (
    formValues: FormValues,
    createTime: number
): SubscriptionParam => {
    const subParam: SubscriptionParam = {
        licenseAddress: formValues.licenseAddress,
        supportAddress: formValues.supportAddress,
        platformAddress: formValues.platformAddress,
        referralAddress: formValues.referralAddress,
        createTime: createTime,
    };

    return subParam;
};

export async function sendFileToUploadOnIpfs(
    appCrypto: AppCrypto,
    appID: string,
    file: FileList | undefined,
    selectedNft: string,
    userAddress: string,
    userAuth: UrsulaAuth,
    encryptKey: string | undefined = undefined
) {
    try {
        if (!file || !file.length) throw new Error('File is missing');
        if (!selectedNft) throw new Error("Couldn't fetched selected NFT");
        if (!appID) throw new Error('App ID is missing');
        if (!userAddress) throw new Error("Couldn't fetch user's address");

        // const isLoginNeeded = utils.isLoginNeeded(userAddress);

        // if (isLoginNeeded)
        //   await decryptApp.login(await client.connector?.getProvider(), userAddress, chainID);

        const appDecryptor = appCrypto.appDecryptor;
        // const userAuthResp = await appDecryptor.signUserForDecryption(
        //     appCrypto.contractService.Provider,
        //     userAddress
        // );
        // if (userAuthResp.success == false)
        //     throw new Error('Failed to get userAuth: ', userAuthResp.data);

        // const userAuth = userAuthResp.data;

        const formData = new FormData();

        console.log('file length: ', file.length);
        for (let i = 0; i < file.length; i += 1) {
            formData.append('file', file[i]);
        }

        formData.append('userAuthPayload', JSON.stringify(userAuth));
        formData.append('address', userAddress.toString());
        formData.append('enableEncrypt', encryptKey ? 'true' : 'false');
        if (encryptKey) {
            formData.append('encryptionKey', encryptKey);
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_STATIC_FILE_SERVER}/api/ipfsFileUpload/${selectedNft}/${appID}`,
            formData
        );

        console.log('axios post: ', response.data);
        if (!response.data.success || !response.data.data.rootPath.cid) {
            const message = response.data.message || 'Uploading data to ipfs failed!';
            throw new Error(message);
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.error) throw new Error(error?.response?.data?.error);
        else throw new Error(error);
    }
}

export async function getIpfsFilePath(appID: string, selectedNft: string) {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STATIC_FILE_SERVER}/api/ipfsFileUpload/${selectedNft}/${appID}/getAppFilePath`
    );
    console.log('get ipfsFilePath response : ', response);

    return response;
}

export async function saveAppDataTostorage(
    appCrypto: AppCrypto,
    nftID: string,
    appID: number,
    encryptedApp: any,
    isSoftwareLock: boolean,
    modAppData: any,
    userAddress: string | undefined,
    platformAddress: string,
    chainID: number | undefined
) {
    if (!userAddress) return;
    // const isLoginNeeded = utils.isLoginNeeded(userAddress);

    // if (isLoginNeeded)
    //     await decryptApp.login(await client.connector?.getProvider(), userAddress, chainID);

    // const userAuthPayload = await decryptApp.signUserForDecryption(userAddress, chainID);

    const appDecryptor = appCrypto.appDecryptor;
    const userAuthResp = await appDecryptor.signUserForDecryption(
        appCrypto.contractService.Provider,
        userAddress
    );
    if (userAuthResp.success == false)
        throw new Error('Failed to get userAuth: ', userAuthResp.data);
    const userAuthPayload = userAuthResp.data;

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_STORAGE_SERVER}/api/ipfsFileUpload/${nftID}/${appID}`,
        { userAuthPayload, encryptedApp, isSoftwareLock, modAppData, platformAddress }
    );

    return response;
}

export async function checkDeploymentStatus(
    nftID: any,
    appName: any,
    timestampBeforeCreateApp: Date,
    loggerURL: string
) {
    if (!loggerURL) return { statusFlag: true, errorMessage: '' };

    const statusFlag = false;
    let errorMessage = 'Error: Timed out at getting deployment status';

    //   if (retries >= 7) {
    //     return { statusFlag, errorMessage };
    //   }

    for (let i = 0; i < 7; i++) {
        try {
            const res = await axios.get(
                `${loggerURL}/appStatus/${nftID}/${appName}/${timestampBeforeCreateApp.toISOString()}`
            );

            console.log('axios res: ', res);

            if (
                res?.data?.success &&
                res.data.data?.length &&
                res.data.data[0].logType === 'success'
            ) {
                return { statusFlag: true, errorMessage: '' };
            }
            if (
                res?.data?.success &&
                res.data.data?.length &&
                res.data.data[0].logType === 'error'
            ) {
                errorMessage = res.data.data[0].message || errorMessage;
                return { statusFlag: false, errorMessage };
            }

            errorMessage = res.data?.message || errorMessage;
            throw new Error(errorMessage);
        } catch (error) {
            console.error(error);
            // await new Promise((resolve) => setTimeout(resolve, 5000));
            // return await checkDeploymentStatus(
            //   nftID,
            //   appName,
            //   timestampBeforeCreateApp,
            //   loggerURL
            // );
        }

        await sleep(5000);
    }

    return { statusFlag, errorMessage: 'Error: Timed out at getting deployment status' };
}

const searchPayload = (payload: any, replaceFunc: Function) => {
    if (!payload) return;

    const keyList = Object.keys(payload);
    let modParam: any = {};

    for (var objKey of keyList) {
        if (objKey === 'attribVarList') continue;
        else if (
            objKey === 'persistenceEnabled' ||
            objKey === 'privateImage' ||
            objKey === 'statefulSet'
        )
            continue;
        else if (typeof payload[objKey] === 'string') {
            payload[objKey] = replaceFunc(payload[objKey]);
        } else if (Array.isArray(payload[objKey]) && payload[objKey].length) {
            if (typeof payload[objKey] === 'string') {
                for (var i = 0; i < payload[objKey].length; i++) {
                    payload[objKey] = replaceFunc(payload[objKey]);
                }
            } else {
                console.log('cur key: ', objKey, payload[objKey]);
                for (var i = 0; i < payload[objKey].length; i++) {
                    payload[objKey] = searchPayload(payload[objKey], replaceFunc);
                }
            }
        } else if (typeof payload[objKey] === 'object') {
            payload[objKey] = searchPayload(payload[objKey], replaceFunc);
        }
    }

    return payload;
};

export const findAttribVars = (payload: any) => {
    const nameList: string[] = [];

    const checkAttrib = (field: string) => {
        const pattern = new RegExp('\\$\\{[a-zA-Z]+[a-zA-Z0-9]*\\}', 'g');

        const modVarMatchList = field.match(pattern);
        if (modVarMatchList) {
            for (let i = 0; i < modVarMatchList.length; i++) {
                let varName = modVarMatchList[i];
                varName = varName.substring(varName.indexOf('{') + 1, varName.indexOf('}'));
                nameList.push(varName);
            }
        }

        return field;
    };

    searchPayload(payload, checkAttrib);

    return nameList;
};

export const verifyModVariables = (
    payload: any,
    modVar: any
): { status: boolean; modVarName?: string; message?: string } => {
    const condition = payload.condition;
    const keyList = Object.keys(condition);
    for (var keyObj of keyList) {
        if (!new RegExp(condition[keyObj]).test(modVar[keyObj])) {
            return {
                status: false,
                modVarName: keyObj,
                message: payload.conditionDescription[keyObj],
            };
        }
    }

    return {
        status: true,
    };
};

export const replaceModVariable = (payload: AppPayload, modValues: { [key: string]: string }) => {
    if (!payload.attribVarList) return payload;

    const defaultValueMap: { [s: string]: string } = {};
    for (let i = 0; i < payload.attribVarList.length; i++) {
        const attrib = payload.attribVarList[i];
        if (attrib.defaultValue) defaultValueMap[attrib.name] = attrib.defaultValue;
    }
    modValues = { ...defaultValueMap, ...modValues };

    function findAndAddModVar(attrib: string) {
        const pattern = new RegExp('\\$\\{[a-zA-Z]+[a-zA-Z0-9]*\\}', 'g');

        const indexList: number[] = [];
        const matchVarNameList: string[] = [];
        let nameRes = pattern.exec(attrib);
        while (nameRes) {
            indexList.push(pattern.lastIndex - nameRes[0].length);
            matchVarNameList.push(nameRes[0]);
            nameRes = pattern.exec(attrib);
        }

        if (indexList.length == 0) return attrib;

        let newAttrib = '';
        let indexScanner = 0;
        for (let i = 0; i < indexList.length; i++) {
            const curIndex = indexList[i];
            const matchVarName = matchVarNameList[i];
            const varName = matchVarName.substring(2, matchVarName.length - 1);
            newAttrib += attrib.substring(indexScanner, curIndex) + modValues[varName];
            indexScanner = curIndex + matchVarName.length;
        }
        newAttrib += attrib.substring(indexScanner, attrib.length);

        return newAttrib;
    }

    return searchPayload(payload, findAndAddModVar);
};

const addSkipVariable = (payload: any, modVarName: string, flag: boolean) => {
    payload = {
        ...payload,
        skipModVar: {
            ...payload.skipModVar,
            [modVarName]: flag,
        },
    };

    return payload;
};

const addModifyVariable = (
    payload: any,
    modVarName: string,
    regExp: string,
    description: string,
    defaultVal: string
) => {
    if (payload.conditionDescription && payload.conditionDescription[modVarName]) {
        throw new Error('Mod variable already exists');
    }

    payload = {
        ...payload,
        condition: {
            ...payload.condition,
            [modVarName]: regExp,
        },
        defaultValue: {
            ...payload.defaultValue,
            [modVarName]: defaultVal,
        },
        conditionDescription: {
            ...payload.conditionDescription,
            [modVarName]: description,
        },
    };

    return payload;
};

const setModifyVariable = (
    payload: any,
    fieldName: string,
    modVarName: string,
    regExp: string,
    description: string,
    defaultVal: string
) => {
    const rejectAttribList: any = {
        nftID: true,
    };

    const modFieldVal = '${' + modVarName + '}';
    if (payload.conditionDescription && payload.conditionDescription[modVarName]) {
        throw new Error('Mod variable already exists');
    }

    if (modVarName === 'extendENV') {
        throw new Error('invalid modVarName');
    }

    if (new RegExp('^image.').test(fieldName)) {
        fieldName = fieldName.split('.')[1];
        payload = {
            ...payload,
            image: {
                ...payload.image,
                [fieldName]: modFieldVal,
            },
        };
    } else if (new RegExp('^containerPort\\[[0-9]+\\].(port|protocol)$').test(fieldName)) {
        const numMatch = fieldName.match(/[0-9]+/);
        if (!numMatch) throw new Error('index not found for :' + fieldName);

        const num = numMatch[0];

        const containerPort = JSON.parse(payload.containerPort);

        if (new RegExp('.port$').test(fieldName)) {
            containerPort[num].port = modFieldVal;
        } else if (new RegExp('.protocol$').test(fieldName)) {
            containerPort[num].protocol = modFieldVal;
        }

        payload = {
            ...payload,
            containerPort: JSON.stringify(containerPort),
        };
    } else if (new RegExp('^servicePort\\[[0-9]+\\].(port|protocol)$').test(fieldName)) {
        const numMatch = fieldName.match(/[0-9]+/);
        if (!numMatch) throw new Error('index not found for :' + fieldName);

        const num = numMatch[0];

        const servicePort = JSON.parse(payload.servicePort);

        if (new RegExp('.port$').test(fieldName)) {
            servicePort[num].port = modFieldVal;
        } else if (new RegExp('.protocol$').test(fieldName)) {
            servicePort[num].protocol = modFieldVal;
        }

        payload = {
            ...payload,
            servicePort: JSON.stringify(servicePort),
        };
    } else if (new RegExp('^whitelistedIps\\[[0-9]+\\]$').test(fieldName)) {
        const numMatch = fieldName.match(/[0-9]+/);
        if (!numMatch) throw new Error('index not found for :' + fieldName);

        const num = numMatch[0];

        const whitelistedIps = payload.whitelistedIps;
        whitelistedIps[num] = modFieldVal;

        payload = {
            ...payload,
            whitelistedIps,
        };
    } else if (new RegExp('^envVariables.[a-zA-Z_]+[a-zA-Z0-9_]*$').test(fieldName)) {
        const attribField = fieldName.split('.')[1];
        const envVariables = payload.envVariables;

        for (var i = 0; i < envVariables.length; i++) {
            if (envVariables[i].name === attribField) {
                envVariables[i].value = modFieldVal;
                break;
            }
        }

        payload = {
            ...payload,
            envVariables,
        };
    } else {
        if (rejectAttribList[fieldName]) {
            throw new Error('Cannot modify attribute: ' + fieldName);
        }

        // const evalStr = "payload." + fieldName + "='" + modFieldVal + "';";
        // eval(evalStr);
        payload = {
            ...payload,
            [fieldName]: modFieldVal,
        };
    }

    payload = {
        ...payload,
        condition: {
            ...payload.condition,
            [modVarName]: regExp,
        },
        defaultValue: {
            ...payload.defaultValue,
            [modVarName]: defaultVal,
        },
        conditionDescription: {
            ...payload.conditionDescription,
            [modVarName]: description,
        },
    };

    return payload;
};

export const setAttribVar = (payload: any, attributeVariableParam: AttributeVariableParam): any => {
    let conditionParam = {
        condition: {},
        conditionDescription: {},
        defaultValue: {},
    };

    const evalAddVar = (
        condParam: any,
        modVarName: string,
        regExp: string,
        description: string,
        defaultVal: string
    ) => {
        if (!new RegExp('[a-zA-Z]+[a-zA-Z0-9_]*').test(modVarName)) {
            throw new Error('Mod variable name is invalid');
        }

        if (condParam.conditionDescription && condParam.conditionDescription[modVarName]) {
            throw new Error('Mod variable already exists');
        }

        console.log(' called add modify: ', modVarName, regExp, description, defaultVal);

        return {
            condition: {
                [modVarName]: regExp,
            },
            defaultValue: {
                [modVarName]: defaultVal,
            },
            conditionDescription: {
                [modVarName]: description,
            },
        };
    };

    function findAndAddModVar(attrib: string) {
        console.log('attrib: ', attrib);
        let fBrace: number = attrib.indexOf('{');
        let lBrace: number = attrib.lastIndexOf('}');

        if (fBrace < 0 && lBrace < 0) {
            return attrib;
        }

        if (fBrace < 0 || lBrace < 0 || lBrace < fBrace) {
            throw new Error('Invalid syntax for mod variable detected');
        }

        let modParam = attrib.substring(fBrace + 1, lBrace);

        let localConditionParam: any = {};
        eval(`localConditionParam = evalAddVar(conditionParam, '${modParam}')`);

        let modVarName;
        if (modParam.indexOf(',') > 0)
            modVarName = modParam.substring(1, modParam.indexOf(',') - 1);
        else modVarName = modParam;

        console.log('modTxtList: ', modParam, modVarName, modParam.indexOf(',') > 0 ? true : false);

        conditionParam.condition = {
            ...conditionParam.condition,
            ...localConditionParam.condition,
        };
        conditionParam.conditionDescription = {
            ...conditionParam.conditionDescription,
            ...localConditionParam.conditionDescription,
        };
        conditionParam.defaultValue = {
            ...conditionParam.defaultValue,
            ...localConditionParam.defaultValue,
        };

        return (
            attrib.substring(0, fBrace - 1) +
            '${' +
            modVarName +
            '}' +
            attrib.substring(lBrace + 1, attrib.length)
        );
    }

    const searchAndReplace = (payload: any) => {
        const keyList = Object.keys(payload);
        let modParam: any = {};

        for (var objKey of keyList) {
            if (
                objKey === 'condition' ||
                objKey === 'conditionDescription' ||
                objKey === 'defaultValue' ||
                objKey === 'skipModVar'
            )
                continue;
            else if (
                objKey === 'persistenceEnabled' ||
                objKey === 'privateImage' ||
                objKey === 'statefulSet'
            )
                continue;
            // else if (objKey === 'containerPort' || objKey === 'servicePort') {
            //     let portList = JSON.parse(payload[objKey]);
            //     for (var i = 0; i < portList.length; i++) {
            //         portList[i] = searchAndReplace(portList[i]);
            //     }
            //     payload[objKey] = JSON.stringify(portList);
            // }
            else if (typeof payload[objKey] === 'string') {
                payload[objKey] = findAndAddModVar(payload[objKey]);
            } else if (Array.isArray(payload[objKey]) && payload[objKey].length) {
                if (typeof payload[objKey] === 'string') {
                    for (var i = 0; i < payload[objKey].length; i++) {
                        payload[objKey] = findAndAddModVar(payload[objKey]);
                    }
                } else {
                    for (var i = 0; i < payload[objKey].length; i++) {
                        payload[objKey] = searchAndReplace(payload[objKey]);
                    }
                }
            } else if (typeof payload[objKey] === 'object') {
                payload[objKey] = searchAndReplace(payload[objKey]);
            }
        }

        return payload;
    };

    payload = searchAndReplace(payload);
    payload = { ...payload, ...conditionParam };

    console.log('after search and replace: ', payload, conditionParam);

    return payload;
};

// export const subscribeAndCreateAppContractCall = async (
//   balanceToAdd: string,
//   nftID: string,
//   platformAddress: string,
//   supportAddress: string,
//   licenseAddress: string,
//   referralAddress: string,
//   licensePercent: number,
//   licenseFee: string,
//   appName: string,
//   appCid: string,
//   modCid: string,
//   subnetList: number[],
//   multiplier: number[][],
//   resourceCount: number[],
//   resourceType: number[],
//   isSoftwareLock: boolean,
//   userAddress: string
// ) => {
//   console.log('subscribe & create call');

//   const callWrapper = async () => {
//     const resp = apiCallWrapper<
//       MetaMaskSuccessResponse,
//       MetaMaskSuccessResponse,
//       MetaMaskFailResponse
//     >(
//       ContractBasedDeployment.contractInstance()
//         .methods.subscribeAndCreateApp(
//           balanceToAdd,
//           nftID,
//           [platformAddress, supportAddress, licenseAddress || BLANK_ADDRESS, referralAddress],
//           [licensePercent, licenseFee],
//           stringToHex(appName),
//           [appCid, modCid],
//           subnetList,
//           multiplier,
//           resourceCount,
//           resourceType,
//           isSoftwareLock
//         )
//         .send({ from: userAddress }),
//       (res) => res
//     );
//     return resp;
//   };
//   const call = new APIRetryExecution<{}, MetaMaskSuccessResponse, MetaMaskFailResponse>(
//     API_CALL_RETRY_LIMIT,
//     callWrapper
//   );
//   const response = await call.execute();

//   return response;
// };

// export const createAppContractCall = async (
//   balanceToAdd: string,
//   nftID: string,
//   appName: string,
//   appCid: string,
//   modCid: string,
//   subnetList: number[],
//   multiplier: number[][],
//   resourceCount: number[],
//   resourceType: number[],
//   isSoftwareLock: boolean,
//   userAddress: string
// ) => {
//   console.log('create call');

//   const callWrapper = async () => {
//     const resp = apiCallWrapper<
//       MetaMaskSuccessResponse,
//       MetaMaskSuccessResponse,
//       MetaMaskFailResponse
//     >(
//       ContractBasedDeployment.contractInstance()
//         .methods.createApp(
//           balanceToAdd,
//           nftID,
//           stringToHex(appName),
//           [appCid, modCid],
//           subnetList,
//           multiplier,
//           resourceCount,
//           resourceType,
//           isSoftwareLock
//         )
//         .send({ from: userAddress }),
//       (res) => res
//     );
//     return resp;
//   };
//   const call = new APIRetryExecution<{}, MetaMaskSuccessResponse, MetaMaskFailResponse>(
//     API_CALL_RETRY_LIMIT,
//     callWrapper
//   );
//   const response = await call.execute();

//   return response;
// };

// export const updateAppContractCall = async (
//   balanceToAdd: string,
//   nftID: string,
//   appID: number,
//   appCid: string,
//   modCid: string,
//   subnetList: number[],
//   multiplier: number[][],
//   resourceCount: number[],
//   resourceType: number[],
//   userAddress: string
// ) => {
//   console.log('update call');

//   const callWrapper = async () => {
//     const resp = apiCallWrapper<
//       MetaMaskSuccessResponse,
//       MetaMaskSuccessResponse,
//       MetaMaskFailResponse
//     >(
//       ContractBasedDeployment.contractInstance()
//         .methods.updateApp(
//           balanceToAdd,
//           nftID,
//           appID,
//           [appCid, modCid],
//           subnetList,
//           multiplier,
//           resourceCount,
//           resourceType
//         )
//         .send({ from: userAddress }),
//       (res) => res
//     );
//     return resp;
//   };
//   const call = new APIRetryExecution<{}, MetaMaskSuccessResponse, MetaMaskFailResponse>(
//     API_CALL_RETRY_LIMIT,
//     callWrapper
//   );
//   const response = await call.execute();

//   return response;
// };

// export const saveAppDataTostorageWrapper = async (
//   nftID: string,
//   appID: number,
//   encryptedApp: any,
//   isSoftwareLock: boolean,
//   modAppData: any,
//   userAddress: string | undefined,
//   platformAddress: string,
//   chainID: number | undefined
// ) => {
//   const callWrapper = async () => {
//     const resp = apiCallWrapper<AxiosResponse, AppDataStorage, Error>(
//       saveAppDataTostorage(
//         nftID,
//         appID,
//         encryptedApp,
//         isSoftwareLock,
//         modAppData,
//         userAddress,
//         platformAddress,
//         chainID
//       ),
//       (res) => res,
//       (param) => {
//         if (param.success) {
//           return { success: true, data: param.resp.data.data };
//         }
//         if (param.resp.response.data.error) {
//           return { success: false, data: { message: param.resp.response.data.error } };
//         }
//         return { success: false, data: resp };
//       }
//     );
//     return resp;
//   };

//   const call = new APIRetryExecution<{}, AppDataStorage, Error>(API_CALL_RETRY_LIMIT, callWrapper);
//   const response = await call.execute();

//   return response;
// };
