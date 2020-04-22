const mockIntents = {
  raiseIntent: jest.fn(),
  catchIntent: jest.fn(),
  FDC3IntentType: {
    ViewInstrument: 'ViewInstrument',
  },
};

jest.mock('./intents', () => mockIntents);

import { broadcastInstrument, subscribeInstrument } from './instruments';
import { FDC3Instrument, FDC3ContextType } from './contexts';

describe('Intents', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should raise an intent when broadcasting', () => {
    const instrument: FDC3Instrument = {
      type: FDC3ContextType.Instrument,
      id: {
        ric: 'FTSE',
      },
    };
    broadcastInstrument(instrument);
    expect(mockIntents.raiseIntent).toHaveBeenCalledWith(
      mockIntents.FDC3IntentType.ViewInstrument,
      instrument
    );
  });

  it('should catch an intent when subscribing', () => {
    const callback = jest.fn();
    subscribeInstrument(callback);
    expect(mockIntents.catchIntent).toHaveBeenCalledWith(
      mockIntents.FDC3IntentType.ViewInstrument,
      callback
    );
  });
});
