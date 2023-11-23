import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { AppStoreApp } from '@/redux/app-store/types';
import { Button } from '@/components/common';
import { setDrawerOpen, setDrawerStatus } from '@/redux/drawer/actions';
import { setSelectedApp } from '@/redux/app-store/actions';

interface Props {
    data: AppStoreApp[];
    // eslint-disable-next-line no-unused-vars
    onClickApp?: (app: AppStoreApp) => void;
}

const FeaturedApps = ({ data, onClickApp }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <div>
            <h2 className="mt-[2.7rem] mb-10 text-2xl font-semibold text-stk-white">
                {t('APP_STORE_TITLE_FEATURED')}
            </h2>
            <ul className="grid gap-10 lg:grid-cols-2">
                <li
                    key={`featured-${data[0].appName}`}
                    className="group col-span-1 flex flex-col divide-y divide-gray-200 overflow-hidden rounded-xl bg-stk-blue-200 shadow"
                >
                    <a
                        className="relative flex flex-1 cursor-pointer flex-col"
                        onClick={() => onClickApp?.(data[0])}
                    >
                        <div className="relative h-[36rem] w-full">
                            <Image
                                className="duration-700 group-hover:scale-[1.02]"
                                src={data[0].coverImage || ''}
                                alt="metamask-logo"
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                            <span className="absolute h-full w-full bg-gradient-to-t from-[#040812] to-[#11182754] opacity-50 duration-300 group-hover:opacity-70" />
                            <div className="absolute flex h-full w-full items-end justify-between p-8">
                                <div className="w-[19rem]">
                                    <h3 className="translate-y-14 text-4xl font-bold text-stk-white duration-300 group-hover:translate-y-2">
                                        {data[0].title}
                                    </h3>
                                    <dl className="mt-4 flex flex-col">
                                        <dt className="sr-only">Title</dt>
                                        <dd className="text-base font-medium text-stk-grey-400 opacity-0  duration-200 group-hover:opacity-100">
                                            {data[0].description}
                                        </dd>
                                        <dt className="sr-only">Role</dt>
                                    </dl>
                                </div>
                                <div className="flex flex-col items-end">
                                    <Button
                                        className={`${
                                            data[0]?.price ? 'visible' : 'invisible'
                                        } w-[7rem] duration-300 hover:bg-stk-white`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(setDrawerOpen(true));
                                            dispatch(setDrawerStatus('deploy-app'));
                                            dispatch(setSelectedApp(data[0].appName));
                                        }}
                                    >
                                        <i className="fa-regular fa-check mr-2" />
                                        <span className="font-medium text-stk-blue-200">
                                            {t('BUTTON_DEPLOY')}
                                        </span>
                                    </Button>
                                    <div
                                        className={`${
                                            data[0]?.price ? 'visible' : 'invisible'
                                        } mt-[1rem] flex`}
                                    >
                                        <Image
                                            src="/stackos-icon-black.svg"
                                            alt="stackos black"
                                            width={20}
                                            height={20}
                                            priority
                                        />
                                        <span className="ml-2 whitespace-nowrap font-light text-stk-white">{`${data[0].price} STACK/Month`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                <div className="grid h-[36rem] grid-cols-1 grid-rows-2 gap-3">
                    {data.slice(1).map((item) => (
                        <li
                            key={`featured-${item.appName}`}
                            className="group col-span-1 flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-stk-blue-200 shadow"
                        >
                            <a
                                className="relative flex flex-1 cursor-pointer flex-col"
                                onClick={() => onClickApp?.(item)}
                            >
                                <div className="relative h-full w-full ">
                                    <Image
                                        className="duration-700 group-hover:scale-[1.03]"
                                        src={item.coverImage || ''}
                                        alt="metamask-logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <span className="absolute h-full w-full bg-gradient-to-t from-[#040812] to-[#11182754] opacity-50 duration-300 group-hover:opacity-70" />
                                    <div className="absolute flex h-full w-full items-end justify-between px-8 py-5">
                                        <div className="w-[19rem]">
                                            <h3 className="translate-y-14 text-4xl font-bold text-stk-white duration-300 group-hover:translate-y-2">
                                                {item.title}
                                            </h3>
                                            <dl className="mt-4 flex flex-col">
                                                <dt className="sr-only">Title</dt>
                                                <dd className="text-base font-medium text-stk-grey-400 opacity-0  duration-200 group-hover:opacity-100">
                                                    {item.description}
                                                </dd>
                                                <dt className="sr-only">Role</dt>
                                            </dl>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <Button
                                                className={`${
                                                    item.price ? 'visible' : 'invisible'
                                                } w-[7rem] duration-300 hover:bg-stk-white`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch(setDrawerOpen(true));
                                                    dispatch(setDrawerStatus('deploy-app'));
                                                    dispatch(setSelectedApp(item.appName));
                                                }}
                                            >
                                                <i className="fa-regular fa-check mr-2" />
                                                <span className="font-medium text-stk-blue-200">
                                                    {t('BUTTON_DEPLOY')}
                                                </span>
                                            </Button>
                                            <div
                                                className={`${
                                                    item.price ? 'visible' : 'invisible'
                                                } mt-[1rem] flex`}
                                            >
                                                <Image
                                                    src="/stackos-icon-black.svg"
                                                    alt="stackos black"
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className="ml-2 whitespace-nowrap font-light text-stk-white">{`${item.price} STACK/Month`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default FeaturedApps;
