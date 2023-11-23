import { STKAppCache } from '@decloudlabs/stk-v2/lib/services/STKAppCache';
import STKAppDecrypt from '@decloudlabs/stk-v2/lib/services/STKAppDecrypt';
import STKAppEncrypt from '@decloudlabs/stk-v2/lib/services/STKAppEncrypt';
import STKAppManager from '@decloudlabs/stk-v2/lib/services/STKAppManager';
import { STKAppStorage } from '@decloudlabs/stk-v2/lib/services/STKAppStorage';
import {
    APICallReturn,
    AppModifier,
    AppPayload,
    AppStatusLog,
    CRUD_APP_STAGE,
    ContractApp,
    DripRateFactors,
    EncryptedPayload,
    EncryptedPayloadWithKeys,
    EtherContracts,
    SubnetPKMap,
    SubscriptionParam,
    UrsulaAuth,
    UrsulaParams,
} from '@decloudlabs/stk-v2/lib/types/types';
import { formatAppParams } from '@decloudlabs/stk-v2/lib/utils/utils';
import { ethers } from 'ethers';
import { sleep } from './utils';
import axios from 'axios';

export class UIAppManager extends STKAppManager {
    sessionStorage: Storage;
    setAppList: (app: ContractApp[]) => Promise<APICallReturn<string>>;

    constructor(
        appCache: STKAppCache,
        appStorage: STKAppStorage,
        contractService: EtherContracts,
        appEncrypt: STKAppEncrypt,
        appDecryptor: STKAppDecrypt,
        sessionStorage: Storage,
        setAppList: (app: ContractApp[]) => Promise<APICallReturn<string>>,
        saveAppToLocal: (app: ContractApp) => Promise<APICallReturn<string>>,
        saveSubParamToLocal: (subParam: SubscriptionParam) => Promise<APICallReturn<string>>,
        removeAppFromLocal: (nftID: string, appID: string) => Promise<APICallReturn<string>>
    ) {
        super(
            appCache,
            appStorage,
            contractService,
            appEncrypt,
            appDecryptor,
            saveAppToLocal,
            saveSubParamToLocal,
            removeAppFromLocal
        );

        this.setAppList = setAppList;
        this.sessionStorage = sessionStorage;
    }

    async getUrsulaAuth(userAddress: string): Promise<APICallReturn<UrsulaAuth>> {
        const tenMin = 1000 * 60 * 10;
        const savedAuthString = sessionStorage.getItem(`ursula_auth_${userAddress}`);
        if (savedAuthString) {
            try {
                const savedAuth: { ursulaAuth: UrsulaAuth; timestamp: number } =
                    JSON.parse(savedAuthString);
                if (savedAuth.timestamp + tenMin > new Date().getTime()) {
                    return {
                        success: true,
                        data: savedAuth.ursulaAuth,
                    };
                }
            } catch (err: any) {
                console.error('error retrieving ursula auth: ', err);
            }
        }

        const authResp = await super.getUrsulaAuth(userAddress);

        if (authResp.success == true) {
            sessionStorage.setItem(
                `ursula_auth_${userAddress}`,
                JSON.stringify({
                    ursulaAuth: authResp.data,
                    timestamp: new Date().getTime(),
                })
            );
        }

        return authResp;
    }

    // async callSubscribeAndCreateApp(
    //     balanceToAdd: string,
    //     contractApp: ContractApp,
    //     subscriptionParam: SubscriptionParam,
    //     dripRateFactors: DripRateFactors
    // ): Promise<APICallReturn<string>> {
    //     console.log('params: ', balanceToAdd, contractApp, subscriptionParam, dripRateFactors);
    //     const createAppResp = await this.contractCall.subscribeAndCreateApp(
    //         balanceToAdd,
    //         contractApp.nftID,
    //         [
    //             subscriptionParam.platformAddress,
    //             subscriptionParam.supportAddress,
    //             subscriptionParam.licenseAddress,
    //             subscriptionParam.referralAddress,
    //         ],
    //         dripRateFactors.licenseFactor,
    //         ethers.utils.formatBytes32String(contractApp.appName),
    //         [contractApp.appPath, contractApp.modPath],
    //         contractApp.subnetList,
    //         contractApp.multiplier,
    //         contractApp.resourceCount,
    //         contractApp.resourceType,
    //         contractApp.cidLock
    //     );

    //     return createAppResp;
    // }

    async fetchContractAppAndSaveToLocal(
        transactionHash: string,
        contractApp: ContractApp
    ): Promise<APICallReturn<string>> {
        const appListResp = await this.contractCall.getAppList(contractApp.nftID);
        console.log('appListResp: ', appListResp);
        if (appListResp.success == true) {
            const fetchedContractAppList = appListResp.data;
            const contractAppList: ContractApp[] = [];
            for (let i = 0; i < fetchedContractAppList.length; i++) {
                const formattedApp: ContractApp = formatAppParams(
                    contractApp.nftID,
                    fetchedContractAppList[i]
                );
                contractAppList.push(formattedApp);
                if (formattedApp.appName === contractApp.appName) {
                    contractApp = formattedApp;
                }
            }

            try {
                this.setAppList(contractAppList);
            } catch (err: any) {
                const error: Error = err;
                return {
                    success: false,
                    data: error,
                };
            }
        } else {
            return appListResp;
        }

        return {
            success: true,
            data: '',
        };
    }

    async deleteApp(
        nftID: string,
        appID: string,
        setCurrentStatus: (status: CRUD_APP_STAGE) => Promise<void>
    ) {
        const resp = await super.deleteApp(nftID, appID, setCurrentStatus);
        await this.fetchContractAppAndSaveToLocal('', {
            nftID,
            appID,
            appName: '',
            appPath: '',
            modPath: '',
            subnetList: [],
            resourceCount: [],
            resourceType: [],
            cidLock: false,
            multiplier: [],
        });
        return resp;
    }

    async updateApp(
        balanceToAdd: string,
        contractApp: ContractApp,
        appPayload: AppPayload,
        appModifier: AppModifier,
        ursulaParam: UrsulaParams,
        setCurrentStatus: (status: CRUD_APP_STAGE) => Promise<void>
    ) {
        const resp = super.updateApp(
            balanceToAdd,
            contractApp,
            appPayload,
            appModifier,
            ursulaParam,
            setCurrentStatus
        );
        await this.fetchContractAppAndSaveToLocal('', contractApp);
        return resp;
    }
    async saveAppToCache(
        contractApp: ContractApp,
        encryptedApp: EncryptedPayloadWithKeys,
        appPayload: AppPayload,
        encryptedAppModifier: EncryptedPayload,
        appModifier: AppModifier
    ): Promise<APICallReturn<{ warning: Error[] }>> {
        const resp = await super.saveAppToCache(
            contractApp,
            encryptedApp,
            appPayload,
            encryptedAppModifier,
            appModifier
        );
        console.log('save app to cache: ', contractApp, resp);
        return resp;
    }

    async getDeploymentStatusFromLogger(
        nftID: string,
        appID: string,
        loggerURL: string,
        timeSinceCRUD: Date,
        probeInterval = 2000
    ): Promise<APICallReturn<APICallReturn<string, string>>> {
        const MINUTE = 1 * 60 * 1000;
        while (true) {
            console.log('date check: ', new Date().getTime(), timeSinceCRUD.getTime(), MINUTE);
            if (new Date().getTime() > timeSinceCRUD.getTime() + MINUTE) {
                return {
                    success: false,
                    data: new Error('Error: Timed out at getting deployment status'),
                };
            }

            try {
                const res = await axios.get(
                    `${loggerURL}/${nftID}/${appID}/${timeSinceCRUD.toISOString()}`
                );

                const appStatusLogResp: APICallReturn<AppStatusLog[]> = res.data;

                if (appStatusLogResp.success) {
                    const appStatusLogList = appStatusLogResp.data;
                    if (
                        appStatusLogList.find((appStatusLog) => appStatusLog.logType === 'success')
                    ) {
                        return {
                            success: true,
                            data: {
                                success: true,
                                data: '',
                            },
                        };
                    }

                    const errorLog = appStatusLogList.find(
                        (appStatusLog) => appStatusLog.logType === 'error'
                    );

                    if (errorLog) {
                        return {
                            success: true,
                            data: {
                                success: false,
                                data: errorLog.message,
                            },
                        };
                    }

                    const operationLog = appStatusLogList.find(
                        (appStatusLog) => appStatusLog.logType === 'operation'
                    );
                    if (operationLog) {
                        timeSinceCRUD = new Date();
                    }
                }

                await sleep(probeInterval);
            } catch (err: any) {
                const error: Error = err;
                console.log('app status error: ', error);
                return { success: false, data: error };
            }
        }
    }
}
