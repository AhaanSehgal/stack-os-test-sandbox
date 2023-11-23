import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import DrawerSelect from '../common/DrawerSelect';
import Input from '../common/Input';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import showToast from '@/utils/showToast';
import { ROLE } from '@/utils/constants';

interface Role {
    label: string;
    value: string;
}

interface FormValues {
    walletAddress: string;
    role: Role;
}

interface Props {
    address: `0x${string}` | undefined;
    grantRole: any;
}

const roles: Role[] = [
    {
        label: 'Read',
        value: 'READ',
    },
    {
        label: 'Deployer',
        value: 'CONTRACT_BASED_DEPLOYER',
    },
    {
        label: 'Access Manager',
        value: 'ACCESS_MANAGER',
    },
    {
        label: 'Billing Manager',
        value: 'BILLING_MANAGER',
    },
];

const GrantRoles = ({ address, grantRole }: Props) => {
    const [formValues, setFormValues] = useState<FormValues>({
        walletAddress: '',
        role: { label: 'Read', value: 'READ' },
    });
    const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
    const [grantingRole, setGrantingRole] = useState(false);

    const {
        register,
        clearErrors,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        setError,
        getValues,
    } = useForm<FormValues>({
        defaultValues: formValues,
    });

    const onSubmit = async () => {
        setGrantingRole(true);

        try {
            await grantRole(
                ROLE[formValues.role.value as keyof typeof ROLE],
                formValues.walletAddress,
                `${formValues.role.label} role granted successfully`
            );

            reset(formValues);
            setGrantingRole(false);
            setIsGrantModalOpen(false);
        } catch (error: any) {
            console.error('Error while granting a role: ', error);

            reset(formValues);
            setGrantingRole(false);
            setIsGrantModalOpen(false);

            showToast('error', error.message);
        }
    };

    const handleGrantRole = () => {
        if (!formValues.walletAddress) {
            setError('walletAddress', {
                type: 'require',
                message: 'Input a wallet address',
            });
            return;
        }

        const isOwnWalletAddress =
            address?.toLowerCase() === formValues.walletAddress.toLocaleLowerCase();

        if (isOwnWalletAddress) {
            setError('walletAddress', {
                message: 'Cannot grant role to own address',
            });
            return;
        }

        if (!formValues.role.value) {
            setError('role', {
                type: 'require',
                message: 'Select a role',
            });
            return;
        }

        setIsGrantModalOpen(true);
    };

    return (
        <div data-cy="tags" className="mx-8 mt-7">
            <form className="flex w-full space-x-4">
                <Input
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    name="walletAddress"
                    validation={{ required: true }}
                    placeholder="Wallet Address"
                    value={getValues().walletAddress}
                    onChange={(value) => {
                        setValue('walletAddress', value);
                        setFormValues({ ...formValues, walletAddress: value });
                    }}
                />
                <div className="w-44">
                    <DrawerSelect
                        placeholder="Select a role"
                        defaultValue={formValues.role}
                        options={roles}
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        name="role"
                        validation={{ required: true }}
                        onChange={(role: Role) => {
                            setValue('role', role);
                            setFormValues({ ...formValues, role });
                        }}
                    />
                </div>

                <Button
                    className="bg-white py-0 px-5 duration-300 hover:bg-stk-grey-200"
                    onClick={handleGrantRole}
                    disabled={grantingRole}
                >
                    <span className="text-lg font-medium text-stk-blue-200">Grant</span>
                </Button>
            </form>
            <Modal
                showModal={isGrantModalOpen}
                closeButton
                onCloseModal={() => setIsGrantModalOpen(false)}
            >
                {grantingRole ? (
                    <div className="flex flex-col items-center justify-center w-80">
                        <LoadingSpinner />
                        <span className="mt-8 text-xl text-stk-green">Granting Role...</span>
                    </div>
                ) : (
                    <>
                        <div className="flex w-80 flex-col text-stk-white">
                            <span className="text-lg font-medium ">Grant Role</span>
                            <span className="mt-5 font-thin">Are you sure to grant role?</span>
                        </div>

                        <div className="-mb-3 flex w-full justify-end pt-3">
                            <Button onClick={onSubmit} className="bg-stk-white text-sm font-medium">
                                <span className="">Yes</span>
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default GrantRoles;
