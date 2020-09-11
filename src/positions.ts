import { FDC3ContextType, FDC3Instrument, FDC3Position } from './contexts';
import { FDC3IntentType, raiseIntent, catchIntent } from './intents';

export declare type FaPosition = {
  positionId: string;
  holding?: number,
  instrument?:  FDC3Instrument | undefined
};

export function broadcastPosition(faPosition: FaPosition) {
  return raiseIntent(FDC3IntentType.ViewPosition, {
    type: FDC3ContextType.Position,
    id: { positionId: faPosition.positionId },
    holding: faPosition.holding,
    instrument: faPosition.instrument
  });
}

export function subscribePosition(
  callback: (payload: FaPosition, fsblEvent: any) => void,
  allowFromSelf = false
) {
  return catchIntent(
    FDC3IntentType.ViewPosition,
    (position: FDC3Position, fsblEvent) => {
      if (!position.id.positionId) {
        return;
      }
      if (!allowFromSelf && fsblEvent.originatedHere()) {
        return;
      }
      const {positionId} = position.id;
      callback({ positionId }, fsblEvent);
    }
  );
}
