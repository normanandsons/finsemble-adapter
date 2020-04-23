import { InternalFSBL } from './fsbl';

export declare type FsblReadyAdapter = {
  onFsblReady: (cb: () => void) => void;
};

export declare type FsblReadyAdapterDefaults = {
  forceResize: boolean;
  createMutationObserver: (
    cb: (mutationList: MutationRecord[]) => boolean
  ) => void;
  doesToolbarExist: () => boolean;
  isFinsembleAvailable: () => boolean;
  waitForFinsembleToolbar: boolean;
};

export declare type FsblReadyAdapterOptions = Partial<FsblReadyAdapterDefaults>;

export declare type FsblReadyCallback = () => void;

/* istanbul ignore next */
export const defaultCreateMutationObserver = (
  cb: (mutationList: MutationRecord[]) => boolean
) => {
  const mutationObserver = new MutationObserver((mutations) => {
    if (cb(mutations)) {
      mutationObserver.disconnect();
    }
  });
  mutationObserver.observe(document.body);
};

/* istanbul ignore next */
export const defaultDoesToolbarExist = () =>
  !!document.body.querySelector('#FSBLHeader');

/* istanbul ignore next */
export const defaultIsFinsembleAvailable = () => !!InternalFSBL;

const fsblReadyAdapterDefaults: FsblReadyAdapterDefaults = {
  forceResize: true,
  createMutationObserver: defaultCreateMutationObserver,
  doesToolbarExist: defaultDoesToolbarExist,
  isFinsembleAvailable: defaultIsFinsembleAvailable,
  waitForFinsembleToolbar: true,
};

export function fsblReadyAdapter(options: FsblReadyAdapterOptions) {
  const {
    forceResize,
    createMutationObserver,
    doesToolbarExist,
    isFinsembleAvailable,
    waitForFinsembleToolbar,
  }: FsblReadyAdapterDefaults = {
    ...fsblReadyAdapterDefaults,
    ...options,
  };
  const callbacks: FsblReadyCallback[] = [];

  let isFsblReady = true;
  let isToolbarReady = true;

  const fsblOnReadyCallback = () => {
    isFsblReady = true;
    if (isToolbarReady || doesToolbarExist()) {
      everythingReadyCallback();
    } else {
      createMutationObserver(() => {
        return doesToolbarExist();
      });
    }
  };

  const everythingReadyCallback = () => {
    if (forceResize) {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }
    callbacks.forEach((cb) => cb());
  };

  if (waitForFinsembleToolbar) {
    isToolbarReady = false;
  }
  if (isFinsembleAvailable()) {
    isFsblReady = false;
    InternalFSBL.addEventListener('onReady', fsblOnReadyCallback);
  }
  return {
    onFsblReady(cb: () => void) {
      if (!isFinsembleAvailable() || (isFsblReady && isToolbarReady)) {
        cb();
      } else {
        callbacks.push(cb);
      }
    },
  };
}
