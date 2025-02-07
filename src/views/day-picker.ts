/**
 * @file Manages the calendar / day-picker view.
 */

import {Key} from '../lib/dom';
import {now, datesEq, shiftMonth, shiftDay} from '../lib/date-manip';
import { IDatePicker, IPicker } from '../interfaces';
import { bufferFn } from '../lib/fns';

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
  const highlightedDate = state.highlightedDate;
  const hilightedMonth = highlightedDate!.getMonth();
  const today = now().getTime();

  return (
    '<div tabindex="0" class="dp-cal" aria-label="You are currently inside the date picker, use the arrow keys to navigate between the dates. Use tab key to jump to more controls.">' +
      '<header class="dp-cal-header">' +

        '<button tabindex="-1" type="button" aria-label="' + lang.months[hilightedMonth] + '. Month picker. Use the space key to enter the month picker." class="dp-focusable dp-cal-month">' +
          lang.months[hilightedMonth] +
        '</button>' +
        '<button tabindex="-1" type="button" aria-label="' + highlightedDate!.getFullYear() + 'Year Picker. Use the space key to enter the year picker." class="dp-focusable dp-cal-year">' +
          highlightedDate!.getFullYear() +
        '</button>' +
		'<button tabindex="-1" type="button" class="dp-focusable dp-prev">Previous Month</button>' +
        '<button tabindex="-1" type="button" class="dp-focusable dp-next">Next Month</button>' +
      '</header>' +
      '<div class="dp-days">' +
        dayNames.map(function (name: string, i: number) {
          return (
            '<span class="dp-col-header">' + dayNames[(i + dayOffset) % dayNames.length] + '</span>'
          );
        }).join('') +
        mapDays(highlightedDate!, dayOffset, function (date) {
          const isNotInMonth = date.getMonth() !== hilightedMonth;
          const isDisabled = !opts.inRange(date);
          const isToday = date.getTime() === today;
          let className = 'dp-day';
          className += (isNotInMonth ? ' dp-edge-day' : '');
          className += (datesEq(date, highlightedDate) ? ' dp-current' : '');
          className += (datesEq(date, selectedDate) ? ' dp-selected' : '');
          className += (isDisabled ? ' dp-day-disabled' : '');
          className += (isToday ? ' dp-day-today' : '');
          className += ' ' + opts.dateClass(date);

          return (
            '<button tabindex="-1" type="button" aria-role="button" aria-label="'+date.toDateString()+'. use the space key to select it." class="' + className + '" data-date="' + date.getTime() + '">' +
              date.getDate() +
            '</button>'
          );
        }) +
      '</div>' +
      '<footer class="dp-cal-footer">' +
        '<button tabindex="-1" type="button" class="dp-focusable dp-today" aria-label="' + lang.today + ' Button. Use the space key to pick today\'s date">' + lang.today + '</button>' +
        '<button tabindex="-1" type="button" class="dp-focusable dp-clear" aria-label="' + lang.clear + ' Button. Use the space key to clear the selection and exit the picker.">' + lang.clear + '</button>' +
        '<button tabindex="-1" type="button" class="dp-focusable dp-close" aria-label="' + lang.close + ' Button. Use the space key to close the date picker.">' + lang.close + '</button>' +
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
function keyDown(ke: KeyboardEvent, dp: IDatePicker) {
  const key = ke.code;
  const shiftBy =
    (key === Key.left) ? -1 :
    (key === Key.right) ? 1 :
    (key === Key.up) ? -7 :
    (key === Key.down) ? 7 :
    0;

  if (key === Key.esc) {
    dp.close();
  } else if (shiftBy) {
    ke.preventDefault();
	if( ke.shiftKey ) {
		// shift month
		if ( shiftBy > 0 ) {
			dp.setState({
				highlightedDate: shiftMonth( dp?.state?.highlightedDate, 1)
			});
		} else {
			dp.setState({
				highlightedDate:shiftMonth( dp?.state?.highlightedDate, -1)
			});
		}
	} else {
		dp.setState({
			highlightedDate: shiftDay( dp?.state?.highlightedDate, shiftBy)
		});
	}

  } else if ( key === Key.tab ) {
	moveFocusToNextButton( ke, dp );
  }
}
/**
 * Allows the user to move focus between buttons with the tab.
 *
 * @param {Event} e
 * @param {DatePickerContext} dp
 */
function moveFocusToNextButton( ke: KeyboardEvent, dp: IDatePicker ) {
	ke.preventDefault();
	const buttons = dp.el?.querySelectorAll( ".dp-focusable" );

    const focusedIndex = Array.from(buttons).indexOf( document.activeElement );
	if (focusedIndex !== -1) {
        let nextIndex = ke.shiftKey ? focusedIndex - 1 : focusedIndex + 1;
        // Loop around if at the start or end
        if (nextIndex >= buttons.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = buttons.length - 1;

        buttons[nextIndex].focus();
	} else {
		buttons[0].focus();
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
  const highlightedDate = dp.state.highlightedDate;
  dp.setState({
    highlightedDate: shiftMonth(highlightedDate, 1)
  });
  dp.el.querySelector( '.dp-next' ).focus();
}

function gotoPrevMonth(e: Event, dp: any) {
  const highlightedDate = dp.state.highlightedDate;
  dp.setState({
    highlightedDate: shiftMonth(highlightedDate, -1)
  });
  dp.el.querySelector( '.dp-prev' ).focus();
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
