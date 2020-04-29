/*
showWindow
(windowIdentifier, params, cb) 
*/

import { InternalFSBL } from './fsbl';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // tslint:disable-next-line: no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line: no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Standard Finsemble WindowIdentifier
export declare type WindowIdentifier = {};

// Standard Finsemble params for showWindow
export declare type ShowWindowParams = {
  data?: any;
  spawnIfNotFound?: boolean;
  [key: string]: any;
};

// Additional params for showWindow
export declare type FaShowWindowParams = ShowWindowParams & {
  waitForAppReady?: boolean;
};

export function showWindow(
  windowIdentifier: WindowIdentifier,
  params: FaShowWindowParams = {
    waitForAppReady: false,
    spawnIfNotFound: true,
  },
  cb?: (err: any, winData: any) => void
) {
  if (!InternalFSBL) {
    return;
  }
  const { waitForAppReady, ...openWindowParams } = params;
  let actualParams = openWindowParams;
  let actualCallback = cb;
  if (waitForAppReady) {
    let cbErr: any;
    let cbWinData: any;
    const faAppStartTopic = `fa-app-start-${uuid()}`;
    actualParams = {
      ...openWindowParams,
      data: {
        ...openWindowParams.data,
        faAppStartTopic,
      },
    };
    const faAppStartCallback = () => {
      if (cb) {
        cb(cbErr, cbWinData);
      }
      if (!InternalFSBL) {
        return;
      }
      InternalFSBL.Clients.RouterClient.removeListener(
        faAppStartTopic,
        faAppStartCallback
      );
    };
    InternalFSBL.Clients.RouterClient.addListener(
      faAppStartTopic,
      faAppStartCallback
    );
    actualCallback = (err, winData) => {
      cbErr = err;
      cbWinData = winData;
      // If we get a miniaml winData object, the window was already open ...
      if (!winData.parentUUID && cb) {
        cb(err, winData);
      }
    };
  }
  return InternalFSBL.Clients.LauncherClient.showWindow(
    windowIdentifier,
    actualParams,
    actualCallback
  );
}

export function appStartCallback() {
  if (!InternalFSBL) {
    return;
  }
  const data = InternalFSBL.Clients.WindowClient.getSpawnData();
  if (!data || !data.faAppStartTopic) {
    return;
  }
  InternalFSBL.Clients.RouterClient.transmit(data.faAppStartTopic, {});
}
