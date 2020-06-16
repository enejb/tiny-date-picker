/**
 * @file Manages the calendar / day-picker view.
 */

import {Key} from '../lib/dom';
import {now, datesEq, shiftMonth, shiftDay} from '../lib/date-manip';
import { IDatePicker, IPicker } from '../interfaces';

export default {
  onKeyDown: keyDown,
  onClick: {
    'dp-day': selectDay,
    'dp-next': gotoNextMonth,
    'dp-prev': gotoPrevMonth,
    'dp-today': selectToday,
    'dp-clear': clear,
    'dp-close': close,
    'dp-cal-month': showMonthPicker,
    'dp-cal-year': showYearPicker,
  },
  render: render
} as IPicker

/**
 * view renders the calendar (day picker) as an HTML string.
 *
 * @param {DatePickerContext} context the date picker being rendered
 * @returns {string}
 */
function render(dp: IDatePicker) {
  const opts = dp.opts;
  const lang = opts.lang;
  const state = dp.state;
  const dayNames = lang.days;
  const dayOffset = opts.dayOffset || 0;
  const selectedDate = state.selectedDate;
  const hilightedDate = state.hilightedDate;
  const hilightedMonth = hilightedDate!.getMonth();
  const today = now().getTime();

  return (
    '<div class="dp-cal">' +
      '<header class="dp-cal-header">' +
        '<button tabindex="-1" type="button" class="dp-prev">Prev</button>' +
        '<button tabindex="-1" type="button" class="dp-cal-month">' +
          lang.months[hilightedMonth] +
        '</button>' +
        '<button tabindex="-1" type="button" class="dp-cal-year">' +
          hilightedDate!.getFullYear() +
        '</button>' +
        '<button tabindex="-1" type="button" class="dp-next">Next</button>' +
      '</header>' +
      '<div class="dp-days">' +
        dayNames.map(function (name: string, i: number) {
          return (
            '<span class="dp-col-header">' + dayNames[(i + dayOffset) % dayNames.length] + '</span>'
          );
        }).join('') +
        mapDays(hilightedDate!, dayOffset, function (date) {
          const isNotInMonth = date.getMonth() !== hilightedMonth;
          const isDisabled = !opts.inRange(date);
          const isToday = date.getTime() === today;
          let className = 'dp-day';
          className += (isNotInMonth ? ' dp-edge-day' : '');
          className += (datesEq(date, hilightedDate) ? ' dp-current' : '');
          className += (datesEq(date, selectedDate) ? ' dp-selected' : '');
          className += (isDisabled ? ' dp-day-disabled' : '');
          className += (isToday ? ' dp-day-today' : '');
          className += ' ' + opts.dateClass(date);

          return (
            '<button tabindex="-1" type="button" class="' + className + '" data-date="' + date.getTime() + '">' +
              date.getDate() +
            '</button>'
          );
        }) +
      '</div>' +
      '<footer class="dp-cal-footer">' +
        '<button tabindex="-1" type="button" class="dp-today">' + lang.today + '</button>' +
        '<button tabindex="-1" type="button" class="dp-clear">' + lang.clear + '</button>' +
        '<button tabindex="-1" type="button" class="dp-close">' + lang.close + '</button>' +
      '</footer>' +
    '</div>'
  );
}

/**
 * keyDown handles the key down event for the day-picker
 *
 * @param {Event} e
 * @param {DatePickerContext} dp
 */
function keyDown(e: KeyboardEvent, dp: any) {
  const key = e.code || e.keyCode;
  const shiftBy =
    (key === Key.left) ? -1 :
    (key === Key.right) ? 1 :
    (key === Key.up) ? -7 :
    (key === Key.down) ? 7 :
    0;

  if (key === Key.esc) {
    dp.close();
  } else if (shiftBy) {
    e.preventDefault();
    dp.setState({
      hilightedDate: shiftDay(dp.state.hilightedDate, shiftBy)
    });
  }
}

function selectToday(e: Event, dp: any) {
  dp.setState({
    selectedDate: now(),
  });
}

function clear(e: Event, dp: any) {
  dp.setState({
    selectedDate: null,
  });
}

function close(e: Event, dp: any) {
  dp.close();
}

function showMonthPicker(e: Event, dp: any) {
  dp.setState({
    view: 'month'
  });
}

function showYearPicker(e: Event, dp: any) {
  dp.setState({
    view: 'year'
  });
}

function gotoNextMonth(e: Event, dp: any) {
  const hilightedDate = dp.state.hilightedDate;
  dp.setState({
    hilightedDate: shiftMonth(hilightedDate, 1)
  });
}

function gotoPrevMonth(e: Event, dp: any) {
  const hilightedDate = dp.state.hilightedDate;
  dp.setState({
    hilightedDate: shiftMonth(hilightedDate, -1)
  });
}

function selectDay(e: KeyboardEvent, dp: any) {
  if (!e.target) {
    return
  }
  
  const evTarget = e.target as HTMLElement
  
  dp.setState({
    selectedDate: new Date(parseInt(evTarget.getAttribute('data-date') as string)),
  });
}

function mapDays(currentDate: Date, dayOffset: number, fn: (iter: Date) => string) {
  let result = '';
  const iter = new Date(currentDate);
  iter.setDate(1);
  iter.setDate(1 - iter.getDay() + dayOffset);

  // If we are showing monday as the 1st of the week,
  // and the monday is the 2nd of the month, the sunday won't
  // show, so we need to shift backwards
  if (dayOffset && iter.getDate() === dayOffset + 1) {
    iter.setDate(dayOffset - 6);
  }

  // We are going to have 6 weeks always displayed to keep a consistent
  // calendar size
  for (let day = 0; day < (6 * 7); ++day) {
    result += fn(iter);
    iter.setDate(iter.getDate() + 1);
  }

  return result;
}
