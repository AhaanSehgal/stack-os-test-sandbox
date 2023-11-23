import {
    APICallReturn,
    AppModifier,
    AppPayload,
    ContractApp,
    CreatorKey,
    ETHAddress,
    EncryptedPayload,
    EncryptedPayloadWithKeys,
    ReaderKey,
    SubnetKFragMap,
    UrsulaKFrag,
    UrsulaParams,
} from '@decloudlabs/stk-v2/lib//types/types';
import all from 'it-all';
import IPFSClient from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { default as axios } from 'axios';
import { pipe } from 'it-pipe';
import { default as toBuffer } from 'it-to-buffer';
import { extract } from 'it-tar';
import { apiCallWrapper } from '@decloudlabs/stk-v2/lib/utils/utils';
import { STKAppStorage } from '@decloudlabs/stk-v2/lib/services/STKAppStorage';
import { STKAppCache } from '@decloudlabs/stk-v2/lib/services/STKAppCache';

export default class AppSenderStorage extends STKAppStorage {
    appSenderURL: string;

    sendApp(
        nftID: string,
        appID: string,
        appPayload: AppPayload,
        cidLock: boolean,
        appModifier: AppModifier
    ): Promise<APICallReturn<{ appPath: string; modPath: string }>> {
        throw new Error('Method not implemented.');
    }

    constructor(appCache: STKAppCache) {
        super(appCache);
        this.appSenderURL = `${process.env.NEXT_PUBLIC_APP_STORAGE_SERVER}/api/ipfsFileUpload`;
    }

    callIPFSAdd = async (pushFile: { path: string; content: number[] }) => {
        const result = await apiCallWrapper<any, any>(
            axios.post(this.appSenderURL + '/writeFile', {
                pushFile,
            }),
            (res: any) => res.data.data
        );

        console.log('result: ', result);
        return result;
    };

    callIPFSAddAll = async (pushList: { path: string; content: number[] }[]) => {
        const result = await apiCallWrapper<any, any>(
            axios.post(this.appSenderURL + '/write', {
                pushList,
            }),
            (res: any) => res.data.data
        );

        console.log('result: ', result);
        return result;
    };

    callIPFSCat = async (path: string) => {
        const result = await apiCallWrapper<any, any>(
            axios.post(this.appSenderURL + '/read', {
                path,
            }),
            (res: any) => res.data.data
        );

        return result;
    };

    async getEncryptedApp(
        contractApp: ContractApp
    ): Promise<APICallReturn<EncryptedPayloadWithKeys>> {
        const { appPath, modPath, nftID, appName, subnetList } = contractApp;
        const pathPrefix = this.createIPFSDir(appPath, nftID, appName);
        const appModifierPath = this.createIPFSDir(modPath, nftID, appName);

        const paths = {
            creator: `${pathPrefix}/creator`,
            reader: `${pathPrefix}/reader`,
            capsule: `${pathPrefix}/capsule`,
            cipherText: `${pathPrefix}/cipherText`,
            ursulaParams: `${pathPrefix}/ursulaParams`,
            appModifierCipher: `${appModifierPath}/cipherText`,
            appModifierCapsule: `${appModifierPath}/capsule`,
        };

        const dataPromises: Promise<any>[] = [
            this.readFile(paths.creator),
            this.readFile(paths.reader),
            this.readFile(paths.capsule),
            this.readFile(paths.cipherText),
            this.readFile(paths.ursulaParams),
            this.readFile(paths.appModifierCapsule),
            this.readFile(paths.appModifierCipher),
        ];

        // Fetch creator, reader, capsule, and ciphertext in parallel
        const promiseAllResp: any = await Promise.all(dataPromises);
        const dataAllResp: any = [];
        for (let i = 0; i < promiseAllResp.length; i++) {
            if (!promiseAllResp[i].success) return promiseAllResp[i];
            dataAllResp.push(promiseAllResp[i].data);
        }
        const [creator, reader, capsuleBytes, cipherTextBytes, ursulaParams]: [
            CreatorKey,
            ReaderKey,
            number[],
            number[],
            UrsulaParams
        ] = dataAllResp;

        const encryptedApp: EncryptedPayloadWithKeys = {
            creator,
            reader,
            capsule: capsuleBytes,
            cipherText: cipherTextBytes,
            subnetKFragMap: {},
            ursulaParams,
        };

        for (const subnetID of subnetList) {
            const kFragsPath = `${appModifierPath}/subnetCluster/${subnetID}/kFrags`;
            let ursulaKFragResp = await this.readFile(kFragsPath);
            if (!ursulaKFragResp.success) return ursulaKFragResp;

            console.log('ursulaKFragResp', ursulaKFragResp);

            let ursulaKFrag = ursulaKFragResp.data;
            ursulaKFrag = ursulaKFrag.map((singleFrag: any) => ({
                ...singleFrag,
                kfrag: new Uint8Array(Object.values(singleFrag.kfrag)),
            }));
            encryptedApp.subnetKFragMap[subnetID] = ursulaKFrag;
        }

        console.log('encryptedApp: ', encryptedApp);

        return {
            success: true,
            data: encryptedApp,
        };
    }

    async getEncryptedAppModifier(
        contractApp: ContractApp
    ): Promise<APICallReturn<EncryptedPayload>> {
        const { appPath, modPath, nftID, appName, subnetList } = contractApp;
        const appModifierPath = this.createIPFSDir(modPath, nftID, appName);

        const paths = {
            appModifierCipher: `${appModifierPath}/cipherText`,
            appModifierCapsule: `${appModifierPath}/capsule`,
        };

        // const dataPromises: Promise<any>[] = [
        //     this.readFile(paths.appModifierCapsule),
        //     this.readFile(paths.appModifierCipher),
        // ];

        // Fetch creator, reader, capsule, and ciphertext in parallel
        // const [appModifierCapsuleBytes, appModifierCipherBytes] = await Promise.all(dataPromises);

        const dataPromises: Promise<any>[] = [
            this.readFile(paths.appModifierCapsule),
            this.readFile(paths.appModifierCipher),
        ];

        // Fetch creator, reader, capsule, and ciphertext in parallel
        const promiseAllResp: any = await Promise.all(dataPromises);
        const dataAllResp: any = [];
        for (let i = 0; i < promiseAllResp.length; i++) {
            if (!promiseAllResp[i].success) return promiseAllResp[i];
            dataAllResp.push(promiseAllResp[i].data);
        }
        const [capsuleBytes, cipherBytes]: [number[], number[]] = dataAllResp;
        console.log('promiseAllResp: ', dataAllResp);

        // const modCapsule = new Uint8Array(
        //     appModifierCapsuleBytes
        // );
        // const modCipher = new Uint8Array(Object.values(appModifierCipherBytes));
        const encryptedAppModifier: EncryptedPayload = {
            capsule: capsuleBytes,
            cipherText: cipherBytes,
        };

        return {
            success: true,
            data: encryptedAppModifier,
        };
    }

    async sendEncryptedApp(
        appName: string,
        nftID: string,
        appID: string,
        encryptedApp: EncryptedPayloadWithKeys,
        appModifier: EncryptedPayload | null,
        cidLock: boolean
    ): Promise<APICallReturn<{ appPath: string; modPath: string }>> {
        const pathPrefix = this.createIPFSDir('', nftID, appName);
        let pathList: string[];
        let contentList: any[];

        if (cidLock) {
            pathList = [];
            contentList = [];
        } else {
            pathList = [
                `appData/${pathPrefix}/creator`,
                `appData/${pathPrefix}/reader`,
                `appData/${pathPrefix}/capsule`,
                `appData/${pathPrefix}/cipherText`,
                `appData/${pathPrefix}/ursulaParams`,
            ];

            contentList = [
                encryptedApp.creator,
                encryptedApp.reader,
                encryptedApp.capsule,
                encryptedApp.cipherText,
                encryptedApp.ursulaParams,
            ];
        }

        const subnetKFragMap: SubnetKFragMap = encryptedApp.subnetKFragMap;
        const subnetList = Object.keys(subnetKFragMap);
        for (var i = 0; i < subnetList.length; i++) {
            const subnetID = subnetList[i];

            const kfrags = subnetKFragMap[subnetID];

            pathList.push(`appModifier/${pathPrefix}/subnetCluster/${subnetID}/kFrags`);
            contentList.push(kfrags);
        }

        if (appModifier) {
            pathList.push(`appModifier/${pathPrefix}/cipherText`);
            contentList.push(appModifier.cipherText);

            pathList.push(`appModifier/${pathPrefix}/capsule`);
            contentList.push(appModifier.capsule);
        }

        const pushList: { path: string; content: number[] }[] = [];
        for (var i = 0; i < contentList.length; i++) {
            let content: any = JSON.stringify(contentList[i]);
            content = Array.from(Buffer.from(content));
            pushList.push({
                path: pathList[i],
                content,
            });
        }

        // const res = await all(
        //     this.ipfsConfig.addAll(pushList, { wrapWithDirectory: false })
        // );
        const catResp = await this.callIPFSAddAll(pushList);
        if (!catResp.success) return catResp;
        const { appPath, modPath } = catResp.data;

        return {
            success: true,
            data: {
                appPath,
                modPath,
            },
        };
    }

    async sendAppToStorage(
        nftID: string,
        appID: string,
        appPayload: AppPayload,
        cidLock: boolean,
        appModifier: AppModifier
    ): Promise<APICallReturn<{ appPath: string; modPath: string }>> {
        return {
            success: true,
            data: {
                appPath: 'test',
                modPath: 'test',
            },
        };
    }

    createIPFSDir = (CID = '', nftID: string, appName: string, path = '') =>
        `${CID ? CID + '/' : ''}nftID/${nftID}/app/${appName.toLowerCase()}${path}`;

    readFile = async (path: string): Promise<APICallReturn<any>> => {
        let catResp = await this.callIPFSCat(path);
        console.log('catResp: ', catResp);
        return catResp;
    };

    removeApp = async (appPath: string): Promise<APICallReturn<string>> => {
        return {
            success: true,
            data: '',
        };
    };

    getStorageIDForContract = (): number => {
        return 0;
    };
}
