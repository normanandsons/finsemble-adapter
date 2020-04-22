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

```js
import { broadcastFDC3 } from "finsemble-adapter";

const instrument = {
  id: {
    ric: "FTSE",
  },
  meta: {
    maturity: "2021-01-07",
  },
};
broadcastFDC3("showInstrument", { instrument });
```
