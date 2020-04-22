import { FDC3Instrument } from './contexts';
import { FDC3IntentType, raiseIntent, catchIntent } from './intents';

export function broadcastInstrument(instrument: FDC3Instrument) {
  return raiseIntent(FDC3IntentType.ViewInstrument, instrument);
}

export function subscribeInstrument(
  callback: (payload: FDC3Instrument) => void
) {
  return catchIntent<FDC3Instrument>(FDC3IntentType.ViewInstrument, callback);
}
