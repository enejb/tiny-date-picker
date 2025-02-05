/**
 * @file A generic set of mutation-free date functions.
 */

/**
 * now returns the current date without any time values
 *
 * @returns {Date}
 */
export function now() {
  var dt = new Date();
  dt.setHours(0, 0, 0, 0);
  return dt;
}

/**
 * dateEq compares two dates
 *
 * @param {Date} date1 the first date
 * @param {Date} date2 the second date
 * @returns {boolean}
 */
export function datesEq(date1?: Date, date2?: Date) {
  return (date1 && date1.toDateString()) === (date2 && date2.toDateString());
}

/**
 * shiftDay shifts the specified date by n days
 *
 * @param {Date} dt
 * @param {number} n
 * @returns {Date}
 */
export function shiftDay(dt: Date, n: number) {
  dt = new Date(dt);
  dt.setDate(dt.getDate() + n);
  return dt;
}

/**
 * shiftMonth shifts the specified date by a specified number of months
 *
 * @param {Date} dt
 * @param {number} n
 * @param {boolean} wrap optional, if true, does not change year
 *                       value, defaults to false
 * @returns {Date}
 */
export function shiftMonth(dt: Date, n: number, wrap = false) {
  dt = new Date(dt);

  var dayOfMonth = dt.getDate();
  var month = dt.getMonth() + n;

  dt.setDate(1);
  dt.setMonth(wrap ? (12 + month) % 12 : month);
  dt.setDate(dayOfMonth);

  // If dayOfMonth = 31, but the target month only has 30 or 29 or whatever...
  // head back to the max of the target month
  if (dt.getDate() < dayOfMonth) {
    dt.setDate(0);
  }

  return dt;
}

/**
 * shiftYear shifts the specified date by n years
 *
 * @param {Date} dt
 * @param {number} n
 * @returns {Date}
 */
export function shiftYear(dt: Date, n: number) {
  dt = new Date(dt);
  dt.setFullYear(dt.getFullYear() + n);
  return dt;
}

/**
 * setYear changes the specified date to the specified year
 *
 * @param {Date} dt
 * @param {number} year
 */
export function setYear(dt: Date, year: number) {
  dt = new Date(dt);
  dt.setFullYear(year);
  return dt;
}

/**
 * setMonth changes the specified date to the specified month
 *
 * @param {Date} dt
 * @param {number} month
 */
export function setMonth(dt: Date, month: number) {
  return shiftMonth(dt, month - dt.getMonth());
}

/**
 * dateOrParse creates a function which, given a date or string, returns a date
 *
 * @param {function} parse the function used to parse strings
 * @returns {function}
 */
export function dateOrParse(parse: (candidate: Date | string) => Date) {
  return function (dt: Date | string) {
    return dropTime(typeof dt === 'string' ? parse(dt) : dt);
  };
}

/**
 * constrainDate returns dt or min/max depending on whether dt is out of bounds (inclusive)
 *
 * @export
 * @param {Date} dt
 * @param {Date} min
 * @param {Date} max
 * @returns {Date}
 */
export function constrainDate(dt: Date, min: Date, max: Date) {
  return (dt < min) ? min :
         (dt > max) ? max :
         dt;
}
/**
 * Removes the time from a date.
 *
 * @param {Date} dt

 * @returns {Date}
 */
function dropTime(dt: Date | string) {
  dt = new Date(dt);
  dt.setHours(0, 0, 0, 0);
  return dt;
}
