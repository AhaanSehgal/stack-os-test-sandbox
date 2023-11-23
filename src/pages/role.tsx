/* eslint-disable react/jsx-no-bind */
/* eslint-disable global-require */
import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSelector } from '@/redux/hooks';
import { DesktopLayout, MobileLayout } from '@/components/common';
import RoleComponent from '@/components/role';

const Role: NextPage = () => {
    const { general } = useSelector((state) => state);
    const { isMobile } = general;

    return (
        <div>
            <Head>
                <title>Role - StackOS</title>
                <meta name="description" content="StackOS Role" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isMobile ? (
                <MobileLayout>
                    <RoleComponent />
                </MobileLayout>
            ) : (
                <DesktopLayout>
                    <RoleComponent />
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

export default Role;
