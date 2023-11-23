/* eslint-disable import/prefer-default-export */
import { ContractApp } from '@/redux/general/types';

export function hasDuplicateAppName(
  deployedApps: ContractApp[] | null,
  appName: string,
  setError: (val: string, error: { type: string; message: string }) => void
) {
  // eslint-disable-next-line prefer-regex-literals
  const letters = new RegExp(/^[a-zA-Z0-9]+$/);
  if (!appName) {
    setError('appName', {
      type: 'required',
      message: 'Name cannot be empty',
    });

    return false;
  }

  if (!letters.test(appName || '')) {
    setError('appName', {
      type: 'required',
      message: 'Name has invalid characters',
    });
    return false;
  }

  if (deployedApps && deployedApps?.find((app) => app.appName === appName)) {
    setError('appName', {
      type: 'required',
      message: 'Name already in use',
    });
    return false;
  }

  return true;
}
