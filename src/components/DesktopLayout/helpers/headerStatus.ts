import { Icons } from '../header/HardwareIndicator';

const headerStatus = [
  {
    id: 'bandwidth',
    hardwareId: 2,
    label: 'ALLOCATION_BANDWIDTH',
    iconName: 'bandwidth' as keyof Icons,
  },
  {
    id: 'cpu',
    hardwareId: 1,
    label: 'ALLOCATION_CPU',
    iconName: 'cpu' as keyof Icons,
  },
  {
    id: 'memory',
    hardwareId: 3,
    label: 'ALLOCATION_MEMORY',
    iconName: 'memory' as keyof Icons,
  },
  {
    id: 'storage',
    hardwareId: 4,
    label: 'ALLOCATION_STORAGE',
    iconName: 'storage' as keyof Icons,
  },
];

export default headerStatus;
