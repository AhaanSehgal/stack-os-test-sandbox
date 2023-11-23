import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';
import Image from 'next/image';
import Button from '@/components/common/Button';

const MobileDisconnectedState = () => {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-[calc(100vh_-_3.5rem)] flex-col items-center justify-center text-center">
            <h1 className="mb-5  max-w-[17rem] text-xl font-semibold leading-10 text-stk-green">
                {t('DISCONNECTED_TITLE')}
            </h1>
            <Trans>
                <p className="mb-7 max-w-[19rem] text-sm font-bold leading-[1.85rem]  text-stk-white strong:text-stk-green">
                    {t('DISCONNECTED_DESCRIPTION')}
                </p>
            </Trans>
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

export default MobileDisconnectedState;
