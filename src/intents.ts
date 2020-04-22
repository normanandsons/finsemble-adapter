import {
  FDC3Contact,
  FDC3Instrument,
  FDC3InstrumentList,
  FDC3Position,
  FDC3Portfolio,
  FDC3Organization,
} from './contexts';

import { InternalFSBL } from './fsbl';

export enum FDC3IntentType {
  StartCall = 'StartCall',
  StartChat = 'StartChat',
  ViewChart = 'ViewChart',
  ViewContact = 'ViewContact',
  ViewQuote = 'ViewQuote',
  ViewNews = 'ViewNews',
  ViewInstrument = 'ViewInstrument',
  ViewAnalysis = 'ViewAnalysis',
}

export function raiseIntent(
  intentType:
    | FDC3IntentType.StartCall
    | FDC3IntentType.StartChat
    | FDC3IntentType.ViewContact,
  payload: FDC3Contact,
  applicationName?: string
): void;
export function raiseIntent(
  intentType: FDC3IntentType.ViewChart,
  payload: FDC3Instrument | FDC3InstrumentList | FDC3Position | FDC3Portfolio,
  applicationName?: string
): void;
export function raiseIntent(
  intentType: FDC3IntentType.ViewInstrument | FDC3IntentType.ViewQuote,
  payload: FDC3Instrument,
  applicationName?: string
): void;
export function raiseIntent(
  intentType: FDC3IntentType.ViewNews,
  payload: FDC3Instrument | FDC3Contact | FDC3Organization,
  applicationName?: string
): void;
export function raiseIntent(
  intentType: FDC3IntentType.ViewAnalysis,
  payload: FDC3Instrument | FDC3Organization | FDC3Portfolio,
  applicationName?: string
): void;
export function raiseIntent<T>(
  intentType: FDC3IntentType,
  payload: T,
  applicationName?: string
): void {
  if (applicationName) {
    throw new TypeError('Specifying applicationName is not supported yet');
  }
  if (InternalFSBL) {
    InternalFSBL.Clients.LinkerClient.publish({
      dataType: intentType,
      data: payload,
    });
  }
}

/**
 * Catch a raised intent
 *
 * Note that this is added to avoid having to use any back-end App Discovery service, which would theoretically connect the raising of intents to applications that have been configured to accept them.
 *
 * @param intentType The type of Intent to catch when it is raised.
 * @param callback The callback which will be given the payload of a raised intent.
 */
export function catchIntent<T>(
  intentType: FDC3IntentType,
  callback: (payload: T) => void
) {
  if (InternalFSBL) {
    InternalFSBL.Clients.LinkerClient.subscribe(intentType, callback);
  }
}
