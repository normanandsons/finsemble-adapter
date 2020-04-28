import { FDC3Instrument, FDC3ContextType } from './contexts';
import { FDC3IntentType, raiseIntent, catchIntent } from './intents';

export declare type FaInstrument = {
  RIC: string;
  meta?: {
    [key: string]: any;
  };
};

export declare type InstrumentMeta = {
  [key: string]: any;
};

export function broadcastInstrument(faInstrument: FaInstrument) {
  return raiseIntent(FDC3IntentType.ViewInstrument, {
    type: FDC3ContextType.Instrument,
    id: { RIC: faInstrument.RIC },
    meta: faInstrument.meta,
  });
}

export function subscribeInstrument(
  callback: (payload: FaInstrument, fsblEvent: any) => void,
  allowFromSelf = false
) {
  return catchIntent(
    FDC3IntentType.ViewInstrument,
    (instrument: FDC3Instrument, fsblEvent) => {
      if (!instrument.id.RIC) {
        return;
      }
      if (!allowFromSelf && fsblEvent.originatedHere()) {
        return;
      }
      const RIC = instrument.id.RIC;
      const meta = instrument.meta || {};
      callback({ RIC, meta }, fsblEvent);
    }
  );
}
