import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@/components/common';

interface Props {
    title?: string;
    description?: string;
    children: React.ReactNode;
    showModal: boolean;
    onCloseModal?: () => void;
    onSaveFilters?: () => void;
}

const FiltersModal = ({
    children,
    title,
    description,
    showModal,
    onCloseModal,
    onSaveFilters,
}: Props) => {
    const { t } = useTranslation();

    return (
        <Modal showModal={showModal} closeButton onCloseModal={onCloseModal}>
            <div className="flex w-80 flex-col">
                <span className="text-lg font-medium text-stk-white">{title}</span>
                <span className="mt-1 pr-9 text-sm text-stk-white">{description}</span>
                <div className="-mx-7 mt-5 h-[22.12rem] bg-stk-blue-400 px-7">{children}</div>
            </div>
            <div className="-mb-3 flex w-full justify-end pt-3">
                <Button onClick={onSaveFilters} className="bg-stk-white text-sm font-medium">
                    <span className="">{t('SAVE')}</span>
                </Button>
            </div>
        </Modal>
    );
};

export default FiltersModal;
