import Image from 'next/image';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import Button from '@/components/common/Button';

const MobileEmptyState = () => {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-[calc(100vh_-_3.5rem)] flex-col items-center justify-center text-center">
            <h1 className="mb-5  max-w-[17rem] text-xl font-semibold leading-10 text-stk-white">
                {t('MOBILE_EMPTY_STATE_TITLE')}
            </h1>
            <span className="mb-7 max-w-[17rem] text-sm font-light leading-[1.85rem] text-stk-white p:inline  p:text-stk-green strong:font-bold">
                <Trans>{t('MOBILE_EMPTY_STATE_DESCRIPTION')}</Trans>
            </span>
            <Image
                className="z-0"
                src="/assets/home/empty-state.svg"
                alt="empty-state"
                width={177}
                height={193}
            />
            <Link href="/" passHref>
                <Button className="absolute bottom-10 w-3/4">{t('LOGIN')}</Button>
            </Link>
        </div>
    );
};

export default MobileEmptyState;
