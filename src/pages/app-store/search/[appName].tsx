import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import DesktopLayout from '@/components/common/DesktopLayout';
import { AppStoreActions } from '@/redux/app-store';
import { useSelector } from '@/redux/hooks';

const App: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { appStore } = useSelector((state) => state);
    const { apps, searchApp } = appStore;

    useEffect(() => {
        if (apps) {
            const reduxApp = apps.find((item) => item.appName === router.query?.appName);
            if (reduxApp) {
                dispatch(AppStoreActions.setSearchApp(reduxApp));
                dispatch(
                    AppStoreActions.getAppDescription(
                        reduxApp?.necessaryApps?.[0]?.officialImage,
                        reduxApp?.necessaryApps?.[0].image?.repository
                    )
                );
            }
        }
    }, [apps]);

    return (
        <div>
            <Head>
                <title>{`${searchApp?.title} - StackOS`}</title>
                <meta name="description" content="StackOS App description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DesktopLayout>
           
            </DesktopLayout>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ['common'])),
    },
});

export default App;
