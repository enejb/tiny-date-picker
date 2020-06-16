/**
 * @file Responsible for sanitizing and creating date picker options.
 */

import { IDatePickerOptions } from './interfaces'
import { now, shiftYear, dateOrParse } from './lib/date-manip';
import { cp } from './lib/fns';

var english = {
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
};

/**
 * DatePickerOptions constructs a new date picker options object, overriding
 * default values with any values specified in opts.
 *
 * @param {DatePickerOptions} opts
 * @returns {DatePickerOptions}
 */
export function DatePickerOptions(opts: IDatePickerOptions) {
    opts = opts || {};
    opts = cp(defaults(), opts);
    var parse = dateOrParse(opts.parse);
    opts.lang = cp(english, opts.lang);
    opts.parse = parse;
    opts.inRange = makeInRangeFn(opts);
    opts.min = parse(opts.min || shiftYear(now(), -100));
    opts.max = parse(opts.max || shiftYear(now(), 100));
    opts.hilightedDate = opts.parse(opts.hilightedDate);
    opts.alignment = opts.alignment || 'left'

    return opts;
}

function defaults(): any {
    return {
        lang: english,

        // Possible values: dp-modal, dp-below, dp-permanent
        mode: 'dp-modal',

        // The date to hilight initially if the date picker has no
        // initial value.
        hilightedDate: now(),

        format: function (dt: Date) {
            return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        },

        parse: function (candidate: Date | string): Date {
            var date = new Date(candidate);
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
    var inRange = opts.inRange; // Cache this version, and return a variant

    return function (dt: Date, dp: any) {
        const earlierThanMin = opts.min ? opts.min <= dt : true
        const laterThanMax = opts.max ? opts.max >= dt: true
        return inRange(dt, dp) && earlierThanMin && laterThanMax;
    };
}
