import { KeyCodes, IEKeyCodes } from './../key-codes.enum';
export declare function preventArrowKeyScroll(event: KeyboardEvent): void;
export declare function getKeyCodes(event: KeyboardEvent): typeof IEKeyCodes | typeof KeyCodes;
