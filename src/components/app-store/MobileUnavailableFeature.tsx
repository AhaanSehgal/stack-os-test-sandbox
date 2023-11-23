import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/common';

const MobileUnavailableFeature = () => {
    const { t } = useTranslation();

    return (
        <div className="relative flex h-screen w-full flex-col items-center bg-stk-blue-500 px-6 text-center">
            <Link href="/deploy" passHref>
                <i className="fa-regular fa-xmark absolute top-5 right-6 text-3xl text-stk-white" />
            </Link>
            <div className="mt-72 w-60">
                <h1 className="text-xl font-semibold leading-10 text-stk-green">
                    {t('MOBILE_FEATURES_TITLE')}
                </h1>
                <span className="mt-5 text-sm font-normal leading-8 text-stk-white">
                    {t('MOBILE_FEATURES_DESCRIPTION')}
                </span>
            </div>
            <Link href="/deploy" passHref>
                <Button className="absolute bottom-10 w-3/4">{t('MOBILE_FEATURES_BUTTON')}</Button>
            </Link>
        </div>
    );
};

export default MobileUnavailableFeature;
