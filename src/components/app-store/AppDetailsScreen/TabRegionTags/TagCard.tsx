import Image from 'next/image';
// import { timeDistanceToNow } from '@/helpers/date';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ar';
import relativeTime from 'dayjs/plugin/relativeTime';
import { i18n } from 'next-i18next';

interface Props {
    tag: any;
    gridView: any;
    price: number;
}

dayjs.extend(relativeTime);
dayjs.locale(i18n?.language);

function timeDistanceToNow(date: string | Date) {
    return dayjs(date).fromNow();
}

const TagCard = ({ gridView, tag, price }: Props) => (
    <div className="mb-9 divide-y-[0.095rem] divide-stk-blue-100 rounded-2xl bg-stk-blue-200">
        <div
            className={`${
                gridView ? 'flex-col' : 'flex-row items-center'
            } flex justify-between p-7`}
        >
            <a className="cursor-pointer">
                <h3 className="text-base font-bold text-stk-green">{tag.name}</h3>
            </a>
            <span className={`${gridView ? 'my-6' : ''} text-stk-grey-400`}>
                {`Last pushed ${tag.last_updated ? timeDistanceToNow(tag.last_updated) : ''} by `}
                <span className="font-semibold text-stk-white">{tag.last_updater_username}</span>
            </span>
        </div>

        <div className="flex flex-col px-7 py-4">
            <div className="overflow-x-auto">
                <div className={`${price ? 'visible' : 'invisible'} flex items-center justify-end`}>
                    <Image
                        alt="stackos-black-icon"
                        src="/stackos-icon-black.svg"
                        width={20}
                        height={20}
                    />
                    <span className="ml-2 font-light leading-5 text-stk-white">{`${price} STACK/Month`}</span>
                </div>
            </div>
        </div>
    </div>
);

export default TagCard;
