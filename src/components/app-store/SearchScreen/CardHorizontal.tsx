import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { AppStoreApp } from '@/redux/app-store/types';
import Button from '../../common/Button';
import { setDrawerOpen, setDrawerStatus } from '@/redux/drawer/actions';
import { setSelectedApp } from '@/redux/app-store/actions';

interface Props {
    app: AppStoreApp;
}

const CardHorizontal = ({ app }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-stk-blue-200 shadow">
            <div className="flex">
                <div className="relative h-[14rem] min-w-[17.2rem] duration-300">
                    <Image
                        src={app.coverImage || ''}
                        alt="metamask-logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="flex w-full flex-col text-ellipsis py-5 px-7">
                    <h3 data-cy="search-card-title" className="text-2xl font-bold text-stk-white">
                        {app.title}
                    </h3>
                    <dl className="mt-2 flex h-[4.5rem] w-[28.8rem] overflow-hidden text-ellipsis text-base text-stk-grey-400">
                        <dt className="sr-only">Title</dt>
                        <dd className="text-base text-stk-grey-400">{app.description}</dd>
                        <dt className="sr-only">Role</dt>
                    </dl>
                    <div className="mt-auto flex justify-between">
                        <Button
                            className={`${
                                app.price ? 'visible' : 'invisible'
                            } duration-300 hover:bg-stk-white`}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(setDrawerOpen(true));
                                dispatch(setDrawerStatus('deploy-app'));
                                dispatch(setSelectedApp(app.appName));
                            }}
                        >
                            <i className="fa-regular fa-check mr-2" />
                            <span className="font-medium text-stk-blue-200">
                                {t('BUTTON_DEPLOY')}
                            </span>
                        </Button>
                        <div className={`${app.price ? 'visible' : 'invisible'} flex items-end`}>
                            <Image
                                alt="stackos-black-icon"
                                src="/stackos-icon-black.svg"
                                width={20}
                                height={20}
                            />
                            <span className="ml-2 font-light leading-5 text-stk-white">{`${app.price} STACK/Month`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardHorizontal;
