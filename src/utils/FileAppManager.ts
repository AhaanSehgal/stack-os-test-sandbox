import { UIAppManager } from './UIAppManager';
import { APICallReturn } from './types';

export class FileAppManager extends UIAppManager {
    async getDeploymentStatusFromLogger(
        nftID: string,
        appID: string,
        loggerURL: string,
        timeSinceCRUD: Date,
        probeInterval = 2000
    ): Promise<APICallReturn<APICallReturn<string, string>>> {
        return {
            success: true,
            data: {
                success: true,
                data: '',
            },
        };
    }
}
