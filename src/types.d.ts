import { WindowIdentifier, FaShowWindowParams } from './window';

export declare type FSBL = {
  addEventListener: (eventType: string, callback: () => void) => void;
  Clients: {
    LinkerClient: {
      publish: ({ dataType, data }: { dataType: string; data: any }) => void;
      subscribe: (
        dataType: string,
        callback: (data: any, fsblEvent: any) => void
      ) => void;
      unsubscribe: (
        dataType: string,
        callback: (data: any, fsblEvent: any) => void
      ) => void;
    };
    LauncherClient: {
      showWindow: (
        windowIdentifier: WindowIdentifier,
        params: FaShowWindowParams,
        cb?: (err: any, winData: any) => void
      ) => void;
    };
    RouterClient: {
      addListener: (
        channel: string,
        cb: (err: any, response: any) => void
      ) => void;
      removeListener: (
        channel: string,
        cb: (err: any, response: any) => void
      ) => void;
      transmit: (channel: string, event: any) => void;
    };
    WindowClient: {
      getSpawnData: () => any;
    };
  };
};

export declare const FSBL: FSBL;

interface Window {
  FSBL: FSBL;
}
