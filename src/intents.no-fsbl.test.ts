const mockFSBL = {
  InternalFSBL: undefined,
};

jest.mock('./fsbl', () => mockFSBL);

import { raiseIntent, catchIntent, FDC3IntentType } from './intents';
import { FDC3ContextType, FDC3Instrument } from './contexts';

describe('Intents', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should silently do nothing when raising an intent and FSBL does not exist', () => {
    const instrument: FDC3Instrument = {
      type: FDC3ContextType.Instrument,
      id: {
        ric: 'FTSE',
      },
    };
    expect(() => {
      raiseIntent(FDC3IntentType.ViewInstrument, instrument);
    }).not.toThrow();
  });
  it('should silently do nothing when catching an intent and FSBL does not exist', () => {
    const callback = jest.fn();
    expect(() => {
      catchIntent(FDC3IntentType.ViewInstrument, callback);
    }).not.toThrow();
  });
});
