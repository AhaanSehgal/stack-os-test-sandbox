import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { GroupType } from '@/pages/deploy';
import { MultiSelect, Modal } from '@/components/common';
import { useSelector } from '@/redux/hooks';
import { setGroupModalOpen, setGroupName, setSelectedGroupApps } from '@/redux/deploy/actions';

interface Props {
    // eslint-disable-next-line no-unused-vars
    onSubmit: (group: GroupType) => void;
    // eslint-disable-next-line no-unused-vars
    onEdit: (id: any, apps: any) => void;
    userGroups: Array<GroupType> | [];
}

const NewGroupModal = ({ onSubmit, userGroups, onEdit }: Props) => {
    const { deploy } = useSelector((state) => state);
    const { deployedApps } = deploy;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isGroupCreatedOpen, setIsGroupCreatedOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState(deploy.groupName);

    const closeModal = () => {
        dispatch(setGroupModalOpen(false));
        dispatch(setSelectedGroupApps([]));
        dispatch(setGroupName(''));
        setNewGroupName('');
    };

    const modalAction = () => {
        if (deploy.isEdit) {
            onEdit(
                deploy.lastGroupEditedId,
                deploy.selectedGroupApps.map((item: any) => item.id)
            );
        } else {
            onSubmit({
                id: userGroups.length + 1 || 1,
                name: newGroupName,
                appsIds: deploy.selectedGroupApps.map((item: any) => item.id),
            });
            dispatch(setSelectedGroupApps([]));
            dispatch(setGroupName(''));
            setIsGroupCreatedOpen(true);
        }
    };

    return (
        <div>
            <Modal showModal={isGroupCreatedOpen} onCloseModal={() => setIsGroupCreatedOpen(false)}>
                <div className="flex flex-col items-center justify-center">
                    <div className="relative mt-14 h-28 w-40">
                        <Image
                            layout="fill"
                            src="/assets/home/group-created.svg"
                            alt="Illustrative folder image"
                        />
                    </div>
                    <span className="mx-14 mt-6 mb-7 max-w-xs text-center text-base font-normal text-white">
                        {t('DEPLOY_GROUP_CREATED')}
                    </span>
                    <button
                        onClick={() => setIsGroupCreatedOpen(false)}
                        type="button"
                        className="rounded-md bg-[#E4E4E4] px-6 py-2"
                    >
                        {t('CLOSE')}
                    </button>
                </div>
            </Modal>
            <Modal
                closeButton
                dataCy="new-group-modal"
                showModal={deploy.isGroupModalOpen}
                onCloseModal={() => closeModal()}
            >
                <div className="flex w-[29.3rem] max-w-[29.3rem] justify-between">
                    <h1 className="text-xl font-semibold text-stk-white">
                        {t(deploy.isEdit ? 'DEPLOY_EDIT_GROUP' : 'EMPTY_STATE_MODAL_TITLE')}
                    </h1>
                </div>
                <form className="mb-6 mt-8">
                    <p className="mb-2 text-sm font-medium text-stk-grey-400">
                        {t('EMPTY_STATE_MODAL_FIELD1')}
                    </p>
                    <input
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder={t('EMPTY_STATE_MODAL_PLACEHOLDER1')}
                        value={newGroupName}
                        type="text"
                        className="mb-6 w-full rounded-md border border-stk-grey-400 bg-transparent px-[0.9rem] py-2 text-stk-grey-400 outline-none"
                        data-cy="group-name"
                    />
                    <p className="mb-2 text-sm font-medium text-stk-grey-400">
                        {t('EMPTY_STATE_MODAL_FIELD2')}
                    </p>
                    <div data-cy="apps-select">
                        <MultiSelect
                            changeFunction={(items: any) => dispatch(setSelectedGroupApps(items))}
                            value={deploy.selectedGroupApps}
                            isMulti
                            options={
                                deployedApps?.filter((item: any) => item.groupId === '') as any
                            }
                        />
                    </div>
                </form>
                <div className="flex justify-between">
                    <button
                        className="text-base font-light text-[#e4e4e4]"
                        type="button"
                        onClick={() => closeModal()}
                    >
                        {t('CANCEL')}
                    </button>
                    <button
                        className="rounded-lg bg-[#e4e4e4] px-[1.53rem] py-[0.56rem] text-base font-medium text-stk-blue-500"
                        type="button"
                        onClick={modalAction}
                    >
                        {t(deploy.isEdit ? 'SAVE' : 'CREATE')}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default NewGroupModal;
