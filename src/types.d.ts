declare type FSBL = {
  Clients: {
    LinkerClient: {
      publish: ({ dataType, data }: { dataType: string; data: any }) => void;
      subscribe: (dataType: string, callback: (data: any) => void) => void;
    };
  };
};

declare const FSBL: FSBL;
