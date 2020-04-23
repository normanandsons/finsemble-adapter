const mockFSBL = {
  InternalFSBL: {
    addEventListener: jest.fn((_onReady: string, readyCb: () => void) => {
      readyCb();
    }),
    Clients: {
      LinkerClient: {
        publish: jest.fn(),
        subscribe: jest.fn(),
      },
    },
  },
};

jest.mock('./fsbl', () => mockFSBL);

import {
  fsblReadyAdapter,
  FsblReadyCallback,
  FsblReadyAdapterOptions,
} from './ready';

describe('fsblReadyAdapter', () => {
  it('should callback immediately if FSBL is not available', () => {
    const adapter = fsblReadyAdapter({ isFinsembleAvailable: () => false });
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(callback).toHaveBeenCalled();
  });
  it('should callback immediately if FSBL is ready and not waiting for the toolbar', () => {
    const adapter = fsblReadyAdapter({
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: false,
    });
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(callback).toHaveBeenCalled();
  });
  it('should not start observing if not waiting for the toolbar', () => {
    const options: FsblReadyAdapterOptions = {
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: false,
      createMutationObserver: jest.fn(),
    };
    const adapter = fsblReadyAdapter(options);
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(options.createMutationObserver).not.toHaveBeenCalled();
  });
  it('should not callback immediately if FSBL is ready and waiting for the toolbar', () => {
    const options: FsblReadyAdapterOptions = {
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: true,
      createMutationObserver: jest.fn(),
    };
    const adapter = fsblReadyAdapter(options);
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(callback).not.toHaveBeenCalled();
  });
  it('should start observing if waiting for the toolbar', () => {
    const options: FsblReadyAdapterOptions = {
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: true,
      createMutationObserver: jest.fn(),
    };
    const adapter = fsblReadyAdapter(options);
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(options.createMutationObserver).toHaveBeenCalled();
  });
  it('should dispatch a resize event after a tick if required', (done) => {
    const spy = jest.fn();
    window.addEventListener('resize', spy);
    const adapter = fsblReadyAdapter({
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: false,
    });
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(spy).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 60);
  });
  it('should dispatch a resize event after a tick if not required', (done) => {
    const spy = jest.fn();
    window.addEventListener('resize', spy);
    const adapter = fsblReadyAdapter({
      forceResize: false,
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: false,
    });
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(spy).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled();
      done();
    }, 60);
  });
  it('should check if the toolbar exists on mutation', () => {
    const options: FsblReadyAdapterOptions = {
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: true,
      createMutationObserver: jest.fn((cb: (_: any) => void) => cb(true)),
      doesToolbarExist: jest.fn(),
    };
    const adapter = fsblReadyAdapter(options);
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(options.doesToolbarExist).toHaveBeenCalled();
  });
  it('should check if the toolbar exists on mutation if not required', () => {
    const options: FsblReadyAdapterOptions = {
      isFinsembleAvailable: () => true,
      waitForFinsembleToolbar: false,
      createMutationObserver: jest.fn((cb: (_: any) => void) => cb(true)),
      doesToolbarExist: jest.fn(),
    };
    const adapter = fsblReadyAdapter(options);
    const callback: FsblReadyCallback = jest.fn();
    adapter.onFsblReady(callback);
    expect(options.doesToolbarExist).not.toHaveBeenCalled();
  });
});
