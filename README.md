# NORMAN & SONS Finsemble Adapter

This adapter for finsemble has the following main purposes:

- Making it easy to continue to support the browser as a target for deployment.
- Convenience methods for broadcasting and subscribing to FDC3 Intent-compliant messages.
- Providing adapters for specific frameworks (i.e. React and Angular) to respond to Finsemble loading events.

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

This function accepts any spec-complient `intentType` and `contextData`, and there are also TypeScript overloads to help with intent and context pairings as specified by FDC3 (e.g, `ViewInstrument` and `ViewQuote` are both acceptable intents for an `FDC3Instrument`).

**Note** We don't support the third parameter for `raiseIntent` from the FDC3 specification which is intended to raise the intent with a _specific_ application, since we drop down to the Finsemble `LinkerClient` under the hood which does not have that capability.

```ts
catchIntent(intentType: FDC3IntentType, callback: (payload: FDC3Context) => void);
```

Theoretically according to the FDC3 specification, matching up `raiseIntent` to an application capable of handling it should be done by configuring an application with an "App Discovery" server. This library side-steps this issue by allowing applications to imperatively catch intents raised elsewhere.

```ts
broadcastInstrument(payload: FDC3Instrument);
```

A shortcut method on top of `raiseIntent` for raising a `ViewInstrument` intent with an `FDC3Instrument` payload.

```ts
subscribeInstrument(callback(payload: FDC3Context) => void);
```

A shortcut method on top of `catchIntent` for catching a `ViewInstrument` intent.

## Framework Adapters

Work-in-progress.
