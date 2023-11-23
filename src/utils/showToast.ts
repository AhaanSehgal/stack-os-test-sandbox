import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { ErrorToast } from '@/components/common';

const toastOptions: ToastOptions = {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
};

function showToast(type?: 'success' | 'error' | 'info' | 'warning', content?: ReactNode | string) {
    if (typeof content === 'string' && content.length > 180) {
        const errorMessage = content;
        content = () => ErrorToast({ errorMessage });
    }

    if (type === 'success') {
        toast.success(content, toastOptions);
    } else if (type === 'error') {
        toast.error(content, toastOptions);
    } else if (type === 'warning') {
        toast.warning(content, toastOptions);
    } else {
        toast.info(content, toastOptions);
    }
}

export default showToast;
