declare type FSBL = {
  addEventListener: (eventType: string, callback: () => void) => void;
  Clients: {
    LinkerClient: {
      publish: ({ dataType, data }: { dataType: string; data: any }) => void;
      subscribe: (dataType: string, callback: (data: any) => void) => void;
    };
  };
};

declare const FSBL: FSBL;
