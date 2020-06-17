import { IDateRangePickerOptions, IDateRangePickerState } from './interfaces';
/**
* The state values for the date range picker
*
* @typedef {Object} DateRangeState
* @property {Date} start - The start date (can be null)
* @property {Date} end - The end date (can be null)
*/
/**
* An instance of DatePicker
*
* @typedef {Object} DateRangePickerInst
* @property {DateRangeState} state - The start / end dates
* @property {function} on - Adds an event handler
* @property {function} off - Removes an event handler
* @property {function} setState - Changes the current state of the date picker
*/
/**
 * DatePicker constructs a new date picker for the specified input
 *
 * @param {HTMLElement} input The input associated with the datepicker
 * @returns {DateRangePickerInst}
 */
export declare function DateRangePicker(container: HTMLElement, opts: IDateRangePickerOptions): {
    state: IDateRangePickerState;
    setState: (newState: IDateRangePickerState) => void;
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
};
//# sourceMappingURL=date-range-picker.d.ts.map