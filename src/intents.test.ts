const mockFSBL = {
  InternalFSBL: {
    Clients: {
      LinkerClient: {
        publish: jest.fn(),
        subscribe: jest.fn(),
      },
    },
  },
};

jest.mock('./fsbl', () => mockFSBL);

import { InternalFSBL } from './fsbl';
import { raiseIntent, catchIntent, FDC3IntentType } from './intents';
import { FDC3ContextType, FDC3Instrument } from './contexts';

describe('Intents', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should publish when raising an intent', () => {
    const instrument: FDC3Instrument = {
      type: FDC3ContextType.Instrument,
      id: {
        ric: 'FTSE',
      },
    };
    raiseIntent(FDC3IntentType.ViewInstrument, instrument);
    expect(InternalFSBL.Clients.LinkerClient.publish).toHaveBeenCalledWith({
      dataType: FDC3IntentType.ViewInstrument,
      data: instrument,
    });
  });
  it('should throw when raising an intent for a specific application', () => {
    const instrument: FDC3Instrument = {
      type: FDC3ContextType.Instrument,
      id: {
        ric: 'FTSE',
      },
    };
    const applicationName = 'NOT-SUPPORTED-YET';
    expect(() => {
      raiseIntent(FDC3IntentType.ViewInstrument, instrument, applicationName);
    }).toThrow(TypeError);
  });
  it('should subscribe when catching an intent', () => {
    const callback = jest.fn();
    catchIntent(FDC3IntentType.ViewInstrument, callback);
    expect(InternalFSBL.Clients.LinkerClient.subscribe).toHaveBeenCalledWith(
      FDC3IntentType.ViewInstrument,
      callback
    );
  });
});
