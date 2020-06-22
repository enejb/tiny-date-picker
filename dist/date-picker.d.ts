/**
 * @file The root date picker file, defines public exports for the library.
 */
import { IDatePickerOptions } from './interfaces';
/**
 * DatePicker constructs a new date picker for the specified input
 *
 * @param {HTMLElement | string} input The input or CSS selector associated with the datepicker
 * @param {DatePickerOptions} opts The options for initializing the date picker
 * @returns {DatePicker}
 */
export declare function DatePicker(input: HTMLInputElement | string, opts: Partial<IDatePickerOptions>): {
    readonly state: import("./interfaces").IState;
    on: (name: string | {
        [key: string]: (name: string, arg: any) => void;
    }, handler?: ((name: string, arg: any) => void) | undefined) => {
        on: any;
        emit: (name: string, arg?: any) => void;
        off: (name?: string | undefined, handler?: ((name: string, arg: any) => void) | undefined) => any;
    };
    off: (name?: string | undefined, handler?: ((name: string, arg: any) => void) | undefined) => {
        on: (name: string | {
            [key: string]: (name: string, arg: any) => void;
        }, handler?: ((name: string, arg: any) => void) | undefined) => any;
        emit: (name: string, arg?: any) => void;
        off: any;
    };
    setState: (state: any) => void;
    open: () => void;
    close: (becauseOfBlur?: boolean | undefined) => void;
    destroy: () => void;
};
//# sourceMappingURL=date-picker.d.ts.map