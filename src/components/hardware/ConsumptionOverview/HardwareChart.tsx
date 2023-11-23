import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from 'recharts';
import { Icon } from '@/components/common';
import { cpuChartData, bandwidthChartData, memoryChartData, storageChartData } from '../helpers';
import { useSelector } from '@/redux/hooks';

interface Props {
    className?: string;
    width?: string | number;
}

const CustomTooltipContent = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
        const { available, used, upgradeDate } = payload[0].payload;

        return (
            <div className="flex w-52 flex-col justify-start rounded bg-white p-3">
                <span className="mb-4 text-base font-semibold text-stk-blue-500">
                    {upgradeDate}
                </span>
                <div className="flex flex-row justify-between text-sm text-stk-grey-500">
                    <span>Available</span>
                    <span>{`${available} MCI`}</span>
                </div>
                <div className="flex flex-row justify-between pb-1 text-sm font-semibold text-stk-blue-500">
                    <span>Usage</span>
                    <span>{`${used} MCI`}</span>
                </div>
                <div className="mb-2 flex flex-row justify-between border-t border-solid border-stk-grey-400 pt-1">
                    <span className="text-sm text-stk-grey-500">Monthly cost</span>
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-sm font-semibold text-stk-blue-500">16.312</span>
                        <Icon
                            iconName="stack-inverted"
                            width={16}
                            height={16}
                            className="ml-2 leading-3"
                            layout="fixed"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

const CustomActiveDot = (props: any) => {
    const { cx, cy } = props;

    return (
        <>
            <circle opacity="0.16" cx={cx} cy={cy} r="13" stroke="#FDFDFD" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="5" fill="#2D3948" stroke="#FDFDFD" strokeWidth="4" />
        </>
    );
};

const HardwareChart = ({ className = '', width = '112%' }: Props) => {
    const { hardware } = useSelector((state) => state);
    const { hardwareSelected } = hardware;

    const getChartData: any = {
        CPU: cpuChartData,
        Bandwidth: bandwidthChartData,
        Memory: memoryChartData,
        Storage: storageChartData,
    };

    return (
        <ResponsiveContainer className={className} width={width} height={380}>
            <LineChart
                data={getChartData[hardwareSelected?.label || '']}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line
                    type="monotone"
                    dot={false}
                    activeDot={CustomActiveDot}
                    dataKey="available"
                    stroke="#FDFDFD"
                />
                <Line
                    type="monotone"
                    dot={false}
                    activeDot={CustomActiveDot}
                    dataKey="used"
                    stroke="#AAFF00"
                />
                <CartesianGrid stroke="#2D3948" vertical={false} />
                <YAxis orientation="right" axisLine={false} tickLine={false} />
                <Tooltip
                    cursor={false}
                    isAnimationActive={false}
                    content={<CustomTooltipContent />}
                />
                <Legend
                    content={
                        <div className="mt-3 flex flex-row justify-between text-xs text-stk-grey-400">
                            <span>30 days ago</span>
                            <span className="mr-16">Today</span>
                        </div>
                    }
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default HardwareChart;
