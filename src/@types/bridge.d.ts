import { api } from '../../electron/bridge';

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: typeof api;
  }
}

/** Window action event enum */
export enum WindowAction {
  MAXIMIZE = 'maximize',
  MINIMIZE = 'minimize',
  RESTORE = 'restore',
  CLOSE = 'close',
}
