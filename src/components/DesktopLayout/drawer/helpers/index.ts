import { Step } from '@/redux/drawer/types';

interface HardwareUsage {
  id: number;
  title: string;
  icon: 'cpu' | 'memory' | 'storage' | 'bandwidth';
  measure: string;
}

export interface HardwareStackValues {
  id: number;
  icon: string;
  content: string;
  field: 'cpu' | 'memory' | 'storage' | 'bandwidth';
}

const hardwaresUsage: HardwareUsage[] = [
  {
    id: 1,
    title: 'DRAWER_STEP3_HARDWARE1_TITLE',
    icon: 'cpu',
    measure: 'MCI',
  },
  {
    id: 2,
    title: 'DRAWER_STEP3_HARDWARE2_TITLE',
    icon: 'memory',
    measure: 'MB',
  },
  {
    id: 3,
    title: 'DRAWER_STEP3_HARDWARE3_TITLE',
    icon: 'bandwidth',
    measure: 'GB',
  },

  {
    id: 4,
    title: 'DRAWER_STEP3_HARDWARE4_TITLE',
    icon: 'storage',
    measure: 'GB',
  },
];

const hardwareStackValues: HardwareStackValues[] = [
  { id: 1, icon: 'fa-microchip', content: ' MCI', field: 'cpu' },
  { id: 2, icon: 'fa-sd-card', content: ' MB', field: 'memory' },
  { id: 3, icon: 'fa-wifi', content: ' GB', field: 'bandwidth' },
  { id: 4, icon: 'fa-box-archive', content: ' GB', field: 'storage' },
  // { id: 5, content: 'Acess to logs = $ 0,50  ( ' },
  // { id: 6, content: 'Enable Shell = $ 0,50  ( ' },
];

const stepName = {
  BASIC_INFO: 'basic-info',
  CONTAINER_IMAGE: 'container-image',
  RESOURCES: 'resources',
  FILE_SUBNET_SELECTION: 'subnet-selection',
  ATTRIBUTE_VARIABLE: 'attrib-var',
  UPDATE_FILE: 'update-file',
  BALANCE_TO_ADD: 'balance-to-add',
};

const steps: Step[] = [
  { id: 0, name: stepName.BASIC_INFO, icon: 'list', title: 'Basic Information' },
  { id: 1, name: stepName.CONTAINER_IMAGE, icon: 'server', title: 'Container Image' },
  { id: 2, name: stepName.RESOURCES, icon: 'cloud-check', title: 'Resources Usage' },
  {
    id: 3,
    name: stepName.FILE_SUBNET_SELECTION,
    icon: 'subnet-selection',
    title: 'Choose Subnets',
  },
  {
    id: 4,
    name: stepName.ATTRIBUTE_VARIABLE,
    icon: 'attribute-variables',
    title: 'Attribute Variables',
  },
  { id: 5, name: stepName.BALANCE_TO_ADD, icon: 'stackos-icon', title: 'Balance To Add' },
];

const fileUploadStepName = {
  FILE_INFO: 'file-info',
  SUBNET_SELECTION: 'file-subnet-selection',
  FILE_RESOURCES: 'file-resources',
  BALANCE_TO_ADD: 'balance-to-add',
};

const fileUploadSteps: Step[] = [
  { id: 0, name: fileUploadStepName.FILE_INFO, icon: 'list', title: 'File Information' },
  { id: 1, name: fileUploadStepName.SUBNET_SELECTION, icon: 'list', title: 'Choose Subnets' },
  { id: 2, name: fileUploadStepName.FILE_RESOURCES, icon: 'list', title: 'Resources Usage' },
  { id: 3, name: fileUploadStepName.BALANCE_TO_ADD, icon: 'list', title: 'Balance To Add' },
];

interface TimePeriod {
  label: string;
  value: number;
}

const timePeriodList: TimePeriod[] = [
  { label: 'None', value: 0 },
  //   { label: '5 minutes(minimum)', value: 300 },
  //   { label: '1 hour', value: 3600 },
  { label: '1 day', value: 86400 },
  { label: '1 week', value: 604800 },
  { label: '1 month', value: 2630000 },
  { label: '2 month', value: 5260000 },
  { label: '3 month', value: 7890000 },
  { label: '6 month', value: 15780000 },
  { label: '1 year', value: 31536000 },
  { label: '2 years', value: 63072000 },
  { label: '3 years', value: 94608000 },
  { label: '5 years', value: 157680000 },
];

export {
  hardwaresUsage,
  hardwareStackValues,
  steps,
  timePeriodList,
  stepName,
  fileUploadSteps,
  fileUploadStepName,
};
