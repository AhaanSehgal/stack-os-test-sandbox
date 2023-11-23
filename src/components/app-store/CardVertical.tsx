import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { AppStoreApp } from '@/redux/app-store/types';
import { setDrawerOpen, setDrawerStatus } from '@/redux/drawer/actions';
import { Button } from '@/components/common';
import { setSelectedApp } from '@/redux/app-store/actions';

interface Props {
    app: AppStoreApp;
}

const CardVertical = ({ app }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className="group col-span-1 flex w-[16rem] flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-stk-blue-200 shadow duration-300 hover:translate-y-[-0.1rem] hover:shadow-xl 2xl:w-[18rem]">
            <div className="flex flex-1 flex-col">
                <div className="relative h-[11.7rem] duration-300">
                    <Image
                        className="duration-500 group-hover:scale-[1.02]"
                        src={app.coverImage || ''}
                        alt="metamask-logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="mt-[1.75rem] text-2xl font-bold text-stk-white">{app.title}</h3>
                    <dl className="mt-2 flex h-[4.4rem] grow flex-col overflow-hidden text-ellipsis">
                        <dt className="sr-only">Title</dt>
                        <dd className="text-base text-stk-grey-400">{app.description}</dd>
                        <dt className="sr-only">Role</dt>
                    </dl>

                    <Button
                        className={`${
                            app.price ? 'visible' : 'invisible'
                        } mt-5 duration-300 hover:bg-stk-white`}
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setSelectedApp(app.appName));
                            dispatch(setDrawerOpen(true));
                            dispatch(setDrawerStatus('deploy-app'));
                        }}
                    >
                        <i className="fa-regular fa-check mr-2" />
                        <span className="font-medium text-stk-blue-200">{t('BUTTON_DEPLOY')}</span>
                    </Button>
                    {/* <div className={`${app.price ? 'visible' : 'invisible'} mt-[1.75rem] flex`}>
            <Image alt="stackos-black-icon" src="/stackos-icon-black.svg" width={20} height={20} />
            <span className="ml-2 font-light text-stk-white">{`${app.price} STACK/Month`}</span>
          </div> */}
                </div>
            </div>
        </div>
    );
};

export default CardVertical;
