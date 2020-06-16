/**
 * @file The root date picker file, defines public exports for the library.
 */
import { IDatePickerOptions } from './interfaces';
/**
 * TinyDatePicker constructs a new date picker for the specified input
 *
 * @param {HTMLElement | string} input The input or CSS selector associated with the datepicker
 * @param {DatePickerOptions} opts The options for initializing the date picker
 * @returns {DatePicker}
 */
export declare function TinyDatePicker(input: HTMLInputElement | string, opts: IDatePickerOptions): {
    readonly state: import("./interfaces").IState;
    on: (name: string | ((name: string, arg: any) => void)[], handler: (name: string, arg: any) => void) => {
        on: any;
        emit: (name: string, arg: any) => void;
        off: (name: string, handler: (name: string, arg: any) => void) => any;
    };
    off: (name: string, handler: (name: string, arg: any) => void) => {
        on: (name: string | ((name: string, arg: any) => void)[], handler: (name: string, arg: any) => void) => any;
        emit: (name: string, arg: any) => void;
        off: any;
    };
    setState: (state: any) => void;
    open: () => void;
    close: (becauseOfBlur?: boolean | undefined) => void;
    destroy: () => void;
};
//# sourceMappingURL=date-picker.d.ts.map