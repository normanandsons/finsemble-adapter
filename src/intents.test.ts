import { InternalFSBL } from './fsbl';
import { raiseIntent, FDC3IntentType } from './intents';
import { FDC3ContextType, FDC3Instrument } from './contexts';

jest.mock('./fsbl', () => {
  return {
    InternalFSBL: {
      Clients: {
        LinkerClient: {
          publish: jest.fn(),
          subscribe: jest.fn(),
        },
      },
    },
  };
});

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
});
