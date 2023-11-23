import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import { Icons } from '@/components/common/DesktopLayout/header/HardwareIndicator';

dayjs.extend(localizedFormat);

const errorMessages = {
    pattern: 'FORM_ERROR_PATTERN',
    maxLength: 'FORM_ERROR_MAX',
    required: 'FORM_ERROR_REQUIRED',
};

const hardwareList = [
    {
        id: 'cpu',
        unity: 'MCI',
        hardwareId: 1,
        label: 'ALLOCATION_CPU',
        iconName: 'cpu' as keyof Icons,
    },
    {
        id: 'bandwidth',
        unity: 'GB',
        hardwareId: 2,
        label: 'ALLOCATION_BANDWIDTH',
        iconName: 'bandwidth' as keyof Icons,
    },
    {
        id: 'memory',
        unity: 'MB',
        hardwareId: 3,
        label: 'ALLOCATION_MEMORY',
        iconName: 'memory' as keyof Icons,
    },
    {
        id: 'storage',
        unity: 'GB',
        hardwareId: 4,
        label: 'ALLOCATION_STORAGE',
        iconName: 'storage' as keyof Icons,
    },
];

const consumptionOptions = [
    { id: 1, label: 'All apps', value: 1 },
    { id: 2, label: 'Application X', value: 2 },
];

const allocationHistory = [
    {
        id: 1,
        icon: 'fa-wifi',
        hardwareChange: '100MB of Bandwidth',
        change: 'Allocated to Group X',
        price: '15.03',
        dateChanged: dayjs().format('LL'),
        hourChanged: dayjs().format('LT'),
    },
    {
        id: 2,
        icon: 'fa-sd-card',
        hardwareChange: '2GB of Storage',
        change: 'Allocated to Application 2',
        price: '8.04',
        dateChanged: dayjs().format('LL'),
        hourChanged: dayjs().format('LT'),
    },
    {
        id: 3,
        icon: 'fa-sd-card',
        hardwareChange: '2MB of Memory',
        change: 'Allocated to Group X',
        price: '3.21',
        dateChanged: dayjs().format('LL'),
        hourChanged: dayjs().format('LT'),
    },
];

const cpuChartData = [
    {
        available: 150,
        used: 0,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 0,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 0,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 0,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 0,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 0,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 150,
        used: 50,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 250,
        used: 100,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 250,
        used: 100,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 250,
        used: 100,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 250,
        used: 100,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 250,
        used: 100,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 250,
        used: 100,
        upgradeDate: dayjs().format('LL'),
    },
    {
        available: 250,
        used: 100,
        upgradeDate: dayjs().format('LL'),
    },
];

const bandwidthChartData = [
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 150,
        used: 250,
    },
    {
        available: 250,
        used: 500,
    },
    {
        available: 250,
        used: 500,
    },
    {
        available: 250,
        used: 500,
    },
    {
        available: 250,
        used: 500,
    },
    {
        available: 250,
        used: 500,
    },
    {
        available: 250,
        used: 500,
    },
    {
        available: 250,
        used: 500,
    },
];

const memoryChartData = [
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
];

const storageChartData = [
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 0,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 150,
        used: 50,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
    {
        available: 250,
        used: 100,
    },
];

export {
    errorMessages,
    hardwareList,
    consumptionOptions,
    allocationHistory,
    cpuChartData,
    bandwidthChartData,
    memoryChartData,
    storageChartData,
};
