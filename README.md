# NORMAN & SONS Finsemble Adapter

This adapter for finsemble has the following main purposes:

- Making it easy to continue to support the browser as a target for deployment.
- Providing adapters for specific frameworks (i.e. React and Angular) to respond to Finsemble loading events.
- Convenience methods for broadcasting and subscribing to FDC3-compliant messages.

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
