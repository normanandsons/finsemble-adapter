export enum FDC3ContextType {
  Contact = 'fdc3.contact',
  ContactList = 'fdc3.contactList',
  Country = 'fdc3.country',
  Instrument = 'fdc3.instrument',
  InstrumentList = 'fdc3.instrumentList',
  Organization = 'fdc3.organization',
  Position = 'fdc3.position',
  Portfolio = 'fdc3.portfolio',
}

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

export declare type FDC3Context = {
  type: FDC3ContextType;
  name?: string;
  id: {
    [key: string]: string;
  };
};

export declare type FDC3Contact = FDC3Context & {
  id: {
    email?: string;
    FDS_ID?: string;
  };
};

export declare type FDC3Organization = FDC3Context & {
  id: {
    LEI?: string;
    PERMID?: string;
    FDS_ID?: string;
  };
};

export declare type FDC3Instrument = FDC3Context & {
  type: FDC3ContextType.Instrument;
  id: {
    ticker?: string;
    BBG?: string;
    CUSIP?: string;
    FDS_ID?: string;
    FIGI?: string;
    ISIN?: string;
    PERMID?: string;
    RIC?: string;
    SEDOL?: string;
  };
};

export declare type FDC3InstrumentList = {
  type: FDC3ContextType.InstrumentList;
  instruments: FDC3Instrument[];
};

export declare type FDC3Position = FDC3Context & {
  type: FDC3ContextType.Position;
  id: {
    positionId: string;
  };
  holding: number;
  instrument: FDC3Instrument;
};

export declare type FDC3Portfolio = FDC3Context & {
  type: FDC3ContextType.Portfolio;
  id: {
    portfolioId: string;
  };
  positions: FDC3Position[];
};

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
  intentType: FDC3IntentType.ViewQuote | FDC3IntentType.ViewInstrument,
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
  if (FSBL) {
    FSBL.Clients.LinkerClient.publish({ dataType: intentType, data: payload });
  }
}

export function catchIntent<T>(
  intentType: FDC3IntentType,
  callback: (payload: T) => void
) {
  if (FSBL) {
    FSBL.Clients.LinkerClient.subscribe(intentType, callback);
  }
}

export function broadcastInstrument(instrument: FDC3Instrument) {
  return raiseIntent(FDC3IntentType.ViewInstrument, instrument);
}

export function subscribeInstrument(
  callback: (payload: FDC3Instrument) => void
) {
  return catchIntent<FDC3Instrument>(FDC3IntentType.ViewInstrument, callback);
}
