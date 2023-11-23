import React, { ReactNode, useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/common';

interface Props {
    children: ReactNode;
}

const RouterProvider = ({ children }: Props) => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-stk-blue-500">
                <LoadingSpinner />
            </div>
        );
    }

    return <div>{children}</div>;
};

export default RouterProvider;
