import { apiCallWrapper, formatAppParams } from '@decloudlabs/stk-v2/lib/utils/utils';
import { ethers } from 'ethers';
import { ContractApp, ETHAddress } from '@decloudlabs/stk-v2/lib/types/types';
import { AppCrypto } from '@/redux/general/types';

export const getAppList = async (appCrypto: AppCrypto, nftID: string) => {
    const result = await apiCallWrapper<any, ContractApp[]>(
        appCrypto.contractService.AppDeployment.getAppList(nftID),
        (fetchedAppList: any) =>
            fetchedAppList.map((fetchedApp: any) => formatAppParams(nftID, fetchedApp))
    );

    return result;
};

export const getDripRatePerSec = async (appCrypto: AppCrypto, nftID: string) => {
    const result = await apiCallWrapper<ethers.BigNumber, string>(
        appCrypto.contractService.SubscriptionBalanceCalculator.dripRatePerSec(nftID),
        (res) => res.toString()
    );

    return result;
};

export const mintAppNFT = async (appCrypto: AppCrypto, callerAddress: ETHAddress) => {
    const result = await apiCallWrapper<any, any>(
        (async () => {
            const tr = await appCrypto.contractService.AppNFTMinter.mint(callerAddress, {
                value: 10 ** 11,
            });

            const rc = await tr.wait();

            return rc;
        })(),
        (res) => res
    );

    return result;
};

export const getAccountsWithRole = async (appCrypto: AppCrypto, nftID: string, role: string) => {
    const result = await apiCallWrapper<string[], string[]>(
        appCrypto.contractService.AppNFT.getAccountsWithRole(nftID, role),
        (res) => res
    );

    return result;
};

export const grantAppNFTRole = async (
    appCrypto: AppCrypto,
    nftID: string,
    role: string,
    callerAddress: ETHAddress
) => {
    const result = await apiCallWrapper<any, any>(
        (async () => {
            const tr = await appCrypto.contractService.AppNFT.grantRole(nftID, role, callerAddress);

            const rc = await tr.wait();

            return rc;
        })(),
        (res) => res
    );

    return result;
};

export const revokeAppNFTRole = async (
    appCrypto: AppCrypto,
    nftID: string,
    role: string,
    callerAddress: ETHAddress
) => {
    const result = await apiCallWrapper<any, any>(
        (async () => {
            const tr = await appCrypto.contractService.AppNFT.revokeRole(
                nftID,
                role,
                callerAddress
            );

            const rc = await tr.wait();

            return rc;
        })(),
        (res) => res
    );

    return result;
};
