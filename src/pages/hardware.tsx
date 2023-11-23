// !!! The name of this file must be "hardware.tsx" to work in the app. We changed it to deactivate temporarily this page.
// To activate again we have some comments that should be uncommented in MobileHeader.tsx, SideMenu.tsx and header/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DesktopLayout, MobileLayout } from '@/components/common';
import { resetStateHardware } from '@/redux/hardware/actions';
import { useSelector } from '@/redux/hooks';
import ResourcesOverview from '@/components/hardware/ResourcesOverview';
import PurchaseResources from '@/components/hardware/PurchaseResources';

const Hardware: NextPage = () => {
    const dispatch = useDispatch();
    const { general } = useSelector((state) => state);
    const { isMobile } = general;

    useEffect(
        () => () => {
            dispatch(resetStateHardware());
        },
        []
    );

    return (
        <div>
            <Head>
                <title>Hardware - StackOS</title>
                <meta name="description" content="StackOS Hardware" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isMobile ? (
                <MobileLayout>
                    {/* <MobileResourcesOverview /> */}
                    <ResourcesOverview />
                    {/* <PurchaseResources /> */}
                    {/* <ConsumptionOverview /> */}
                </MobileLayout>
            ) : (
                <DesktopLayout>
                    {/* <ConsumptionOverview /> */}
                    {/* <AllocationHistory /> */}

                    {/* <ResourcesOverview /> */}
                    <PurchaseResources />
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

export default Hardware;
