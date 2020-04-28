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

export declare type FDC3Context = {
  type: FDC3ContextType;
  name?: string;
  id: {
    [key: string]: string;
  };
  [key: string]: any;
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
