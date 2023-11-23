import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppStoreActions } from '@/redux/app-store';
import { AppStoreApp } from '@/redux/app-store/types';
import Button from '../../common/Button';
import Footer from './Footer';
import { setDrawerOpen, setDrawerStatus } from '@/redux/drawer/actions';
import FeaturedApps from './FeaturedApps';
import SearchBar from '../SearchBar';
import CardVertical from '../CardVertical';
import { useSelector } from '@/redux/hooks';

const HomeScreen = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { appStore } = useSelector((state) => state);
    const { apps } = appStore;
    const featuredApps = apps ? apps.filter((app) => app.featured) : null;

    function handleOpenApp(app: AppStoreApp) {
        dispatch(AppStoreActions.setSearchApp(app));

        router.push({
            pathname: `/app-store/search/${app?.appName}`,
        });

        localStorage.setItem('appStoreSearchPreviousPage', 'home');
    }

    const parallax = useCallback((event: MouseEvent) => {
        const base = document.querySelector('#out-of-hardware-image-base');
        const top = document.querySelector('#out-of-hardware-image-top');

        if (base && top) {
            const x = (window.innerWidth - event.pageX) / 90;
            const y = (window.innerHeight - event.pageY) / 90;

            (base as HTMLElement).style.transform = `translateX(${x * 0.1}px) translateY(${
                y * 0.1
            }px)`;
            (top as HTMLElement).style.transform = `translateX(${x * 0.15}px) translateY(${
                y * 0.15
            }px)`;
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', parallax);

        return () => {
            document.removeEventListener('mousemove', parallax);
        };
    }, [parallax]);

    return (
        <div className="flex flex-col">
            <SearchBar />
            {featuredApps && (
                <FeaturedApps data={featuredApps} onClickApp={(app) => handleOpenApp(app)} />
            )}
            <div className="mb-10 mt-16 flex justify-between ">
                <h2 className="text-2xl font-semibold text-stk-white">
                    {t('APP_STORE_TITLE_CATEGORY_1')}
                </h2>
                <a
                    className="cursor-pointer"
                    onClick={() =>
                        router.push({
                            pathname: '/app-store/search',
                            query: {
                                category: 'application',
                            },
                        })
                    }
                >
                    <p className="text-xl font-normal text-stk-green">
                        {t('APP_STORE_CATEGORY_VIEW_ALL')}
                    </p>
                </a>
            </div>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {apps &&
                    apps
                        ?.filter((app) => !app.featured && app.category === 'application')
                        .slice(0, 8)
                        .map((app) => (
                            <li key={`home-${app.appName}`}>
                                <a className="cursor-pointer" onClick={() => handleOpenApp(app)}>
                                    <CardVertical app={app} />
                                </a>
                            </li>
                        ))}
            </ul>
            <div className="mb-10 mt-16 flex justify-between ">
                <h2 className="text-2xl font-semibold text-stk-white">
                    {t('APP_STORE_TITLE_CATEGORY_2')}
                </h2>
                <a
                    className="cursor-pointer"
                    onClick={() =>
                        router.push({
                            pathname: '/app-store/search',
                            query: {
                                category: 'game',
                            },
                        })
                    }
                >
                    <p className="text-xl font-normal text-stk-green">
                        {t('APP_STORE_CATEGORY_VIEW_ALL')}
                    </p>
                </a>
            </div>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {apps &&
                    apps
                        ?.filter((app) => !app.featured && app.category === 'game')
                        .slice(0, 8)
                        .map((app) => (
                            <li key={`home-${app.appName}`}>
                                <a className="cursor-pointer" onClick={() => handleOpenApp(app)}>
                                    <CardVertical app={app} />
                                </a>
                            </li>
                        ))}
            </ul>
            <div className="relative mt-[5.5rem] flex w-full overflow-hidden rounded-xl bg-stk-blue-200 px-10 pt-16 pb-20">
                <div className="flex flex-col">
                    <span className="whitespace-nowrap text-4xl font-bold text-stk-white">
                        <Trans>{t('APP_STORE_LOOKING_CUSTOM_APPLICATION_TITLE')}</Trans>
                    </span>
                    <span className="mt-7 w-[21rem] text-lg font-light text-stk-white">
                        <Trans>{t('APP_STORE_LOOKING_CUSTOM_APPLICATION_DESCRIPTION')}</Trans>
                    </span>

                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setDrawerOpen(true));
                            dispatch(setDrawerStatus('deploy-form'));
                        }}
                        className="mt-10 w-[23rem] py-4 duration-300"
                    >
                        <span className="font-medium text-stk-blue-100">
                            {t('APP_STORE_LOOKING_CUSTOM_APPLICATION_BUTTON')}
                        </span>
                    </Button>
                </div>
                <div
                    id="out-of-hardware-image-base"
                    className="absolute right-10 top-[4rem] hidden h-64 w-96 lg:block xl:h-[22.8em] xl:w-[38rem]"
                >
                    <Image
                        alt="empty-state-base"
                        src="/assets/app-store/empty-state-base.svg"
                        layout="fill"
                        priority
                    />
                </div>
                <div
                    id="out-of-hardware-image-top"
                    className="absolute right-32 top-[-6rem] hidden h-[30rem] w-56 lg:block xl:right-[12rem] xl:h-[35.5rem] xl:w-[21.6rem]"
                >
                    <Image
                        alt="empty-state-top"
                        src="/assets/app-store/empty-state-top.svg"
                        layout="fill"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeScreen;
