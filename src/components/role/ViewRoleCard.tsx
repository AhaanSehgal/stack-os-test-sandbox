import { useState } from 'react';
import Button from '../common/Button';
import CopyField from '../common/CopyField';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';

interface Props {
    address: string;
    roles: string[];
    gridView: any;
    revokeRole: any;
    isRoleRevoking: boolean;
}

const ViewRoleCard = ({ address, roles, gridView, revokeRole, isRoleRevoking }: Props) => {
    const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);

    const [roleToBeRevoked, setRoleToBeRevoked] = useState<{ role: string; address: string }>({
        role: '',
        address: '',
    });

    return (
        <div className="px-3 mb-9 divide-y-[0.095rem] divide-stk-blue-100 rounded-2xl bg-stk-blue-200">
            <div
                className={`${
                    gridView ? 'flex-col' : 'flex-row items-center'
                } flex justify-between px-3 py-4`}
            >
                <CopyField
                    text={
                        gridView
                            ? `${address?.substring(0, 5)}...${address?.substring(
                                  address.length - 4,
                                  address.length
                              )}`
                            : address
                    }
                    copyText={address}
                    bodyClassName={`${
                        !gridView ? 'mr-3' : 'mb-3'
                    } flex cursor-pointer items-center justify-center overflow-hidden rounded-md border-[0.1px] border-stk-blue-100 bg-transparent px-4 py-2 hover:bg-stk-blue-100`}
                />
                <div className="flex gap-3 flex-wrap">
                    {roles.map((role) => (
                        <span
                            key={role}
                            className="group bg-stk-blue-100 text-stk-white hover:bg-stk-green hover:text-black flex items-center rounded-md px-3 py-1 text-sm font-medium duration-300"
                        >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                            <i
                                onClick={() => {
                                    setRoleToBeRevoked({
                                        role,
                                        address,
                                    });
                                    setIsRevokeModalOpen(true);
                                }}
                                className="fa-solid fa-xmark ml-1 duration-300 text-stk-red cursor-pointer hidden group-hover:block"
                            />
                        </span>
                    ))}
                </div>
            </div>
            <Modal
                showModal={isRevokeModalOpen}
                closeButton
                onCloseModal={() => setIsRevokeModalOpen(false)}
            >
                {isRoleRevoking ? (
                    <div className="flex flex-col items-center justify-center w-80">
                        <LoadingSpinner />
                        <span className="mt-8 text-xl text-stk-green">Revoking role...</span>
                    </div>
                ) : (
                    <>
                        <div className="flex w-80 flex-col text-stk-white">
                            <span className="text-lg font-medium ">Revoke Role</span>
                            <span className="mt-5 font-thin">Are you sure to revoke role?</span>
                        </div>

                        <div className="-mb-3 flex w-full justify-end pt-3">
                            <Button
                                onClick={async () => {
                                    await revokeRole(roleToBeRevoked.role, roleToBeRevoked.address);
                                    setIsRevokeModalOpen(false);
                                }}
                                className="bg-stk-white text-sm font-medium"
                                disabled={isRoleRevoking}
                            >
                                <span className="">Yes</span>
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default ViewRoleCard;
