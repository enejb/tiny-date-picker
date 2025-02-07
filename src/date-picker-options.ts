/**
 * @file Responsible for sanitizing and creating date picker options.
 */

import { IDatePickerOptions } from './interfaces'
import { now, shiftYear, dateOrParse } from './lib/date-manip';
import { cp } from './lib/fns';

const english = {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    today: 'Today',
    clear: 'Clear',
    close: 'Close',
	ariaLabel: {
		enterPicker: 'You are on a date picker input. Use the down key to focus into the date picker. Or type the date in the format MM/DD/YYYY',
		dayPicker: 'You are currently inside the date picker, use the arrow keys to navigate between the dates. Use tab key to jump to more controls.',
		monthPicker: 'You are currently inside the month picker, use the arrow keys to navigate between the months. Use the space key to select it.',
		yearPicker: 'You are currently inside the year picker, use the up and down arrow keys to navigate between the years. Use the space key to select it.',
		monthPickerButton: 'Month picker. Use the space key to enter the month picker.',
		yearPickerButton: 'Year picker. Use the space key to enter the month picker.',
		dayButton: 'Use the space key to select the date.',
		todayButton: 'Today button. Use the space key to select the current date.',
		clearButton: 'Clear button. Use the space key to clear the date picker.',
		closeButton: 'Close button. Use the space key to close the date picker.',
	}
};

/**
 * DatePickerOptions constructs a new date picker options object, overriding
 * default values with any values specified in opts.
 *
 *  @param _options
 *
 * @returns {DatePickerOptions}
 */
export function DatePickerOptions(_options: Partial<IDatePickerOptions> = {}) {
    const options = cp(defaults(), _options);
    const parse = dateOrParse(options.parse);
    options.lang = cp(english, options.lang);
    options.parse = parse;
    options.inRange = makeInRangeFn(options);
    options.min = parse(options.min || shiftYear(now(), -100));
    options.max = parse(options.max || shiftYear(now(), 100));
    options.highlightedDate = options.parse(options.highlightedDate);
    options.alignment = options.alignment || 'left'

    return options;
}
/**
 *
 * @returns {IDatePickerOptions}
 */
function defaults(): IDatePickerOptions {
    return {
        lang: english,

        // Possible values: dp-modal, dp-below, dp-permanent
        mode: 'dp-below',

        // The date to hilight initially if the date picker has no
        // initial value.
        highlightedDate: now(),

        format: function (dt: Date) {
            return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        },

        parse: function (candidate: Date | string): Date {
            const date = new Date(candidate);
            return isNaN(date.valueOf()) ? now() : date;
        },

        dateClass: function (date: Date) {
            return ''
        },

        inRange: function () {
            return true;
        },

        appendTo: document.body,
        alignment: 'left'
    };
}

function makeInRangeFn(opts: IDatePickerOptions) {
    const inRange = opts.inRange; // Cache this version, and return a variant

    return function (dt: Date, dp: any) {
        const earlierThanMin = opts.min ? opts.min <= dt : true
        const laterThanMax = opts.max ? opts.max >= dt: true
        return inRange(dt, dp) && earlierThanMin && laterThanMax;
    };
}
