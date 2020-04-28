import { FSBL } from './types';

// @ts-ignore
const InternalFSBL = 'FSBL' in window ? (window.FSBL as FSBL) : undefined;

export { InternalFSBL };
