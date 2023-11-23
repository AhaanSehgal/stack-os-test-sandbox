import { GeneralTypes } from './general/types';
import { AppStoreTypes } from './app-store/types';
import { DrawerTypes } from './drawer/types';
import { HardwareTypes } from './hardware/types';
import { SwapTypes } from './swap/types';

export default interface ApplicationState {
  general: GeneralTypes;
  appStore: AppStoreTypes;
  drawer: DrawerTypes;
  hardware: HardwareTypes;
  swap: SwapTypes;
}
