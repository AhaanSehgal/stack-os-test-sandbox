import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DesktopLayout } from '@/components/common';

import { useSelector } from '@/redux/hooks';
import MobileUnavailableFeature from '@/components/common/app-store/MobileUnavailableFeature';

const AppStore: NextPage = () => {
    const { general } = useSelector((state) => state);
    const { isMobile } = general;

    return (
        <div>
            <Head>
                <title>App Store - StackOS</title>
                <meta name="description" content="StackOS App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isMobile ? (
                <MobileUnavailableFeature />
            ) : (
                <DesktopLayout>
            
                </DesktopLayout>
            )}
        </div>
    );
};

export async function getStaticProps({ locale }: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default AppStore;
