/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useSelector } from '@/redux/hooks';
import showToast from '@/utils/showToast';
import { getNFTList } from '@/utils/utils';
import { NftData, AddressRole } from '@/utils/types';
import { ROLE } from '@/utils/constants';
import ViewRoles from './ViewRoles';
import GrantRoles from './GrantRoles';
import Icon from '../common/Icon';
import { getAccountsWithRole, grantAppNFTRole, revokeAppNFTRole } from '@/utils/contractCallConfig';

export const userRolesTabs = ['View Roles', 'Grant Roles'];

const RoleComponent = () => {
    const router = useRouter();

    const { tab: tabQuery, page } = router.query;
    const currentTab = tabQuery || 'View Roles';

    const { address } = useAccount();
    const general = useSelector((state) => state.general);
    const { selectedNft, appCrypto } = general;

    const [nftData, setNFTData] = useState<NftData>({ nftList: [] });
    const [roleGranted, setRoleGranted] = useState(false);
    const [addresses, setAddresses] = useState<AddressRole>({});
    const [loading, setLoading] = useState(false);
    const [isRoleRevoking, setIsRoleRevoking] = useState(false);

    useEffect(() => {
        if (!address || !selectedNft) return;
        if (!appCrypto) return;

        (async () => {
            try {
                const res = await getNFTList(appCrypto, address);

                setNFTData(res);
            } catch (error: any) {
                console.error('Error while getting accounts: ', error);
                showToast('error', error?.message);
            }
        })();
    }, [address, selectedNft]);

    useEffect(() => {
        if (!nftData || !selectedNft) return;
        if (!appCrypto) return;

        (async () => {
            setLoading(true);

            try {
                const addressesAndTheirRoles: AddressRole = {};

                const roleRespList = await Promise.all(
                    Object.values(ROLE).map((role) =>
                        getAccountsWithRole(appCrypto, selectedNft, role)
                    )
                );
                for (let roleResp of roleRespList) {
                    if (roleResp.success == false) throw roleResp.data;
                }
                const roleListBatch: string[][] = [];
                for (let roleResp of roleRespList) {
                    if (roleResp.success == true) roleListBatch.push(roleResp.data);
                }

                const roles = ['read', 'deployer', 'access', 'billing'];
                let i = 0;

                roleListBatch.map((roleList) => {
                    roleList.map((address: string) => {
                        addressesAndTheirRoles[address] = {
                            ...addressesAndTheirRoles[address],
                            [roles[i]]: true,
                        };
                    });
                    i++;
                });

                setAddresses(addressesAndTheirRoles);
                setLoading(false);
            } catch (error: any) {
                console.error('Error while getting accounts with their roles: ', error);
                setLoading(false);
                showToast('error', error?.message);
            }
        })();
    }, [selectedNft, roleGranted]);

    const grantRole = async (role: string, address: string, successMessage: string) => {
        if (!appCrypto) return;
        try {
            const grantRoleResp = await grantAppNFTRole(appCrypto, selectedNft, role, address);
            if (grantRoleResp.success == false) throw grantRoleResp.data;

            setRoleGranted(!roleGranted);
            showToast('success', successMessage);
        } catch (error: any) {
            console.error('Error while granting role: ', error);
            showToast('error', error?.message);
        }
    };

    const revokeRole = async (role: string, fromAddress: string) => {
        if (!appCrypto) return;
        setIsRoleRevoking(true);
        try {
            const getRole = (key: string) => {
                switch (key) {
                    case 'read':
                        return ROLE.READ;
                    case 'access':
                        return ROLE.ACCESS_MANAGER;
                    case 'billing':
                        return ROLE.BILLING_MANAGER;
                    case 'deployer':
                        return ROLE.CONTRACT_BASED_DEPLOYER;
                    default:
                        return ROLE.READ;
                }
            };

            const revokeResp = await revokeAppNFTRole(
                appCrypto,
                selectedNft,
                getRole(role),
                fromAddress
            );
            if (revokeResp.success == false) throw revokeResp.data;

            setRoleGranted(!roleGranted);
            setIsRoleRevoking(false);
            showToast('success', 'Role revoked successfully');
        } catch (error: any) {
            console.error('Error while revoking a role: ', error);
            setIsRoleRevoking(false);
            showToast('error', error?.message);
        }
    };

    function handleChangeTab(newTab: string) {
        if (newTab === 'View Roles') {
            router.push({
                query: { tab: newTab, page: page || 1 },
            });
        } else {
            router.push({
                query: { tab: newTab },
            });
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex h-[7rem] overflow-hidden rounded-lg">
                <div className="relative h-[7rem] min-w-[10.6rem] duration-300">
                    <div className="m-auto pl-20">
                        <Icon width={60} height={60} iconName="stack-regular-green" />
                    </div>
                </div>

                <div className="flex w-full justify-between">
                    <div className="flex w-full flex-col text-ellipsis px-7">
                        <h1 className="text-2xl font-bold text-stk-white">User Roles</h1>
                        <span className="mt-1 flex h-[2.8rem] w-full overflow-hidden text-ellipsis text-base text-[#6B7280]">
                            View roles given & grant new roles
                        </span>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="border-b border-stk-blue-100">
                    <nav className="-mb-px flex space-x-4 px-16" aria-label="Tabs">
                        {userRolesTabs.map((tab: string) => (
                            <div
                                data-cy={`tab-${tab}`}
                                key={tab}
                                className={`${
                                    tab === currentTab
                                        ? 'border-stk-green font-medium text-stk-green hover:border-stk-white hover:text-stk-white'
                                        : 'border-transparent font-normal text-stk-grey-400 hover:border-stk-grey-400 hover:text-stk-grey-200'
                                } cursor-pointer whitespace-nowrap border-b-4 px-3 pb-1 text-lg duration-300`}
                                aria-current={tab === currentTab ? 'page' : undefined}
                                onClick={() => handleChangeTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {currentTab === 'View Roles' ? (
                <ViewRoles
                    addresses={addresses || {}}
                    loading={loading}
                    revokeRole={revokeRole}
                    isRoleRevoking={isRoleRevoking}
                />
            ) : (
                <GrantRoles address={address} grantRole={grantRole} />
            )}
        </div>
    );
};

export default RoleComponent;
