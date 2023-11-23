import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import { useSpring, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import Icon from '@/components/common/Icon';
import Resource from './Resource';
import AppCard from '../AppCard';
import GroupOptions from './GroupOptions';
import {
    setGroupModalOpen,
    setGroupName,
    setIsEdit,
    setLastGroupEditedId,
    setSelectedGroupApps,
} from '@/redux/deploy/actions';
import AppCardList from '../AppCardList';
import { setDrawerOpen } from '@/redux/drawer/actions';

interface Props {
    id: number;
    groupName: string;
    appsIds: any;
    userApps: any;
    isCardView: boolean;
    collapseTrigger: boolean;
}

const Group = ({ id, groupName, appsIds, userApps, isCardView, collapseTrigger }: Props) => {
    const dispatch = useDispatch();

    const { t } = useTranslation();
    const [isGroupOpen, setIsGroupOpen] = useState(true);
    const groupApps = userApps?.filter((app: any) =>
        appsIds.find((appId: any) => app.id === appId)
    );

    const [gridRef, gridBounds] = useMeasure();
    const [listRef, listBounds] = useMeasure();
    const [emptyRef, emptyBounds] = useMeasure();

    const gridStyles = useSpring({
        height: isGroupOpen ? gridBounds.height : 0,
    });

    const listStyles = useSpring({
        height: isGroupOpen ? listBounds.height : 0,
    });

    const emptyStyles = useSpring({
        height: isGroupOpen ? emptyBounds.height : 0,
    });

    useEffect(() => {
        setIsGroupOpen(!collapseTrigger);
    }, [collapseTrigger]);

    const groupInfo = [
        { id: 1, icon: 'fa-wifi', max: '0', used: '0' },
        {
            id: 2,
            icon: 'fa-microchip',
            max: groupApps?.reduce(
                (accumulator: any, cur: any) => accumulator + Number(cur.cpuMax || 0),
                0
            ),
            used: groupApps?.reduce(
                (accumulator: any, cur: any) => accumulator + Number(cur.cpuUse || 0),
                0
            ),
        },
        {
            id: 3,
            icon: 'fa-floppy-disk',
            max: groupApps?.reduce(
                (accumulator: any, cur: any) => accumulator + Number(cur.memoryMax || 0),
                0
            ),
            used: groupApps?.reduce(
                (accumulator: any, cur: any) => accumulator + Number(cur.memoryUse || 0),
                0
            ),
        },
        { id: 4, icon: 'fa-box-archive', max: '0', used: '0' },
    ];

    const editGroup = () => {
        dispatch(setGroupModalOpen(true));
        dispatch(setSelectedGroupApps(groupApps));
        dispatch(setGroupName(groupName));
        dispatch(setIsEdit(true));
        dispatch(setLastGroupEditedId(id));
    };

    return (
        <div className="group relative mb-6 flex flex-col overflow-hidden">
            <div
                onClick={() => setIsGroupOpen(!isGroupOpen)}
                className="flex w-full cursor-pointer items-center justify-between rounded-t-lg bg-stk-blue-300 px-10 py-7"
            >
                <div className="flex items-center gap-10">
                    {groupName && (
                        <span className="text-2xl font-bold text-stk-white">{groupName}</span>
                    )}
                    {groupInfo.map((item) => (
                        <Resource key={item.id} icon={item.icon} max={item.max} used={item.used} />
                    ))}
                    <div className="flex items-center space-x-3">
                        <Icon iconName="stackos-icon" className="mb-[-0.375rem]" />
                        <span className="text-base font-light text-stk-grey-400">
                            2,200 STK/Month
                        </span>
                    </div>
                </div>
                <GroupOptions
                    editGroupTrigger={editGroup}
                    isGroupOpen={isGroupOpen}
                    collapseFunction={() => setIsGroupOpen(!isGroupOpen)}
                />
            </div>
            {isCardView && (
                <animated.div style={{ overflow: 'hidden', ...gridStyles }}>
                    {appsIds.length && (
                        <div
                            ref={gridRef}
                            className="grid grid-cols-2 gap-7 rounded-b-lg bg-stk-blue-500 p-10"
                        >
                            {groupApps.map(
                                ({
                                    hostUrl,
                                    label,
                                    status,
                                    cpuUse,
                                    cpuMax,
                                    memoryUse,
                                    memoryMax,
                                }: any) => (
                                    <div key={hostUrl}>
                                        <AppCard
                                            appLink={hostUrl}
                                            appName={label}
                                            status={status}
                                            cpuMin={cpuUse}
                                            cpuMax={cpuMax}
                                            memoryMin={memoryUse}
                                            memoryMax={memoryMax}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </animated.div>
            )}
            {!isCardView && (
                <animated.div style={{ overflow: 'hidden', ...listStyles }}>
                    {appsIds.length && (
                        <div
                            ref={listRef}
                            className="divide-y-[1px] divide-stk-blue-100 rounded-b-lg bg-stk-blue-500 p-10"
                        >
                            {groupApps.map(({ hostUrl, label, status }: any) => (
                                <div key={hostUrl}>
                                    <AppCardList
                                        appLink={hostUrl}
                                        appName={label}
                                        status={status}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </animated.div>
            )}

            {!appsIds.length && (
                <animated.div
                    style={{ overflow: 'hidden', ...emptyStyles }}
                    className={`flex w-full flex-col items-center rounded-b-lg bg-stk-blue-500 text-center duration-200 ${
                        isCardView ? 'min-w-[78.75rem]' : 'min-w-[68.75rem]'
                    }`}
                >
                    <div className="flex flex-col items-center" ref={emptyRef}>
                        <span className="mb-5 mt-12 max-w-sm text-[1.65rem] font-normal leading-10 text-stk-white">
                            {t('DEPLOY_GROUP_EMPTY_STATE')}
                        </span>
                        <button
                            className="mb-14 max-w-[8rem] rounded-md bg-[#E4E4E4] py-2 px-6"
                            type="button"
                            onClick={() => dispatch(setDrawerOpen(true))}
                        >
                            <i className="fa-light fa-rocket-launch" />
                            <span className="ml-2 text-base font-light leading-5 text-stk-blue-500">
                                {t('BUTTON_DEPLOY')}
                            </span>
                        </button>
                    </div>
                </animated.div>
            )}
        </div>
    );
};

export default Group;
