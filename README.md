# NORMAN & SONS Finsemble Adapter

The NORMAN & SONS Finsemble library provides a few things that we need again and again on Finsemble projects:-

1. Convenience methods to make browser deployment of Finsemble applications more straightforward.
2. Convenience methods for broadcasting and subscribing to FDC3 messages.
3. React and Angular adapters to make waiting for FSBL to be ready (and for the FSBL header to be injected) more straightforward.

## Installation and Usage

Install by running:

```bash
npm install finsemble-adapter
```

Import the core functions into your project:

```ts
import { raiseIntent, FDC3IntentType, FDC3Instrument } from 'finsemble-adapter';

const instrument: FDC3Instrument = {
  id: {
    ric: 'FTSE',
  },
  meta: {
    maturity: '2021-01-07',
  },
};
raiseIntent(FDC3IntentType.ViewInstrument, instrument);
```

## API

```ts
raiseIntent(intentType: FDC3IntentType, payload: FDC3Context);
```

This function accepts any spec-complient `intentType` and `payload`, and there are also TypeScript overloads to help with intent and context pairings as specified by FDC3 (e.g, `ViewInstrument` and `ViewQuote` are both acceptable intents for an `FDC3Instrument`).

**Note** We don't support the third parameter for `raiseIntent` from the FDC3 specification which is intended to raise the intent with a _specific_ application, since we drop down to the Finsemble `LinkerClient` under the hood which does not support that capability yet.

```ts
catchIntent(intentType: FDC3IntentType, callback: (payload: FDC3Context, fsblData: any) => void);
```

Theoretically according to the FDC3 specification, matching up `raiseIntent` to an application capable of handling it should be done by configuring an application with an "App Discovery" server. This library side-steps this issue by allowing applications to imperatively catch intents raised elsewhere.

We also include the Finsemble event data as a second parameter to the callback, this allows you to inspect, for example, where the intent was raised, which is very useful if you don't want a
window to respond to it's own intents.

```ts
broadcastInstrument(payload: FaInstrument);
```

A shortcut method on top of `raiseIntent` for raising a `ViewInstrument` intent with an `FDC3Instrument` payload.

```ts
subscribeInstrument(callback(payload: FaInstrument, fsblEvent: any) => void, allowFromSelf = false);
```

A shortcut method on top of `catchIntent` for catching a `ViewInstrument` intent. The `fsblEvent` is also included, but for convience this method will default to disallowing a window to catch it's own intents.

## Framework Adapters

### React

We provide a React adapter to make waiting for FSBL to be ready and for the FSBL header to be injected straightforward. As with the above methods, this is "safe" to use when running in a browser - it will have no effect.

Since this library may be used without React, you will need to import the adapter file directly, it is not exported with the main module.

```tsx
import React from 'react';
import { FSBLLoader } from 'fsbl-adapter/framework-adapters/react';

export const DemoMinimal: React.FC = () => {
  return (
    <FSBLLoader>
      <div>Your App Goes Here</div>
    </FSBLLoader>
  );
};

export const DemoCustom: React.FC = () => {
  return (
    <FSBLLoader
      fallback={<div>LOADING</div>}
      onReady={() => {
        // tslint:disable-next-line: no-console
        console.log(
          'Finsemble is ready, but in this case we cannot be sure about the header, and we will not definitely trigger a resize event'
        );
      }}
      forceResize={false}
      waitForFinsembleToolbar={false}
    >
      <div>Your App Goes Here</div>
    </FSBLLoader>
  );
};
```
