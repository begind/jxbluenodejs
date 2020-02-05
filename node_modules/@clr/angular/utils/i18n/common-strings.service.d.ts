import { ClrCommonStrings } from './common-strings.interface';
export declare class ClrCommonStringsService {
    private _strings;
    /**
     * Allows you to pass in new overrides for localization
     */
    localize(overrides: ClrCommonStrings): void;
    /**
     * Access to all of the keys as strings
     */
    readonly keys: Readonly<ClrCommonStrings>;
    /**
     * Parse a string with a set of tokens to replace
     */
    parse(source: string, tokens?: {
        [key: string]: string;
    }): string;
}
