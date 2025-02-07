/**
 * @file Manages the year-picker view.
 */

import {Key} from '../lib/dom';
import {setYear, shiftYear, constrainDate} from '../lib/date-manip';

export default {
  render: render,
  onKeyDown: keyDown,
  onClick: {
    'dp-year': onChooseYear
  },
};

/**
 * view renders the year picker as an HTML string.
 *
 * @param {DatePickerContext} dp the date picker context
 * @returns {string}
 */
function render(dp: IDatePicker) {
  const state = dp.state;
  const currentYear = state.highlightedDate.getFullYear();
  const selectedYear = state.selectedDate.getFullYear();

  return (
    '<div class="dp-years" aria-label="'+ dp.opts.lang.ariaLabel.monthPicker +'">' +
      mapYears(dp, function (year: number) {
        let className = 'dp-year';
        className += (year === currentYear ? ' dp-current' : '');
        className += (year === selectedYear ? ' dp-selected' : '');

        return (
          '<button tabindex="-1" type="button" class="' + className + '" data-year="' + year + '">' +
            year +
          '</button>'
        );
      }) +
    '</div>'
  );
}

function onChooseYear(e: Event, dp: any) {
  dp.setState({
    highlightedDate: setYear(dp.state.highlightedDate, parseInt((e.target as HTMLElement).getAttribute('data-year') as string)),
    view: 'day',
  });
}

function keyDown(ke: KeyboardEvent, dp: IDatePicker) {
  const key = ke.code;
  const opts = dp.opts;
  let shiftBy =
    (key === Key.left || key === Key.up) ? 1 :
    (key === Key.right || key === Key.down) ? -1 :
    0;

  if (key === Key.esc) {
    dp.setState({
      view: 'day',
    });
  } else if (shiftBy) {
    ke.preventDefault();
	if( ke.shiftKey ) {
		shiftBy = shiftBy * 10;
	}
	const shiftedYear = shiftYear(dp.state.highlightedDate, shiftBy);
    dp.setState({
      highlightedDate: constrainDate(shiftedYear, opts.min, opts.max),
    });
  }
}

function mapYears(dp: any, fn: (iter: number) => string) {
  let result = '';
  const max = dp.opts.max.getFullYear();

  for (let i = max; i >= dp.opts.min.getFullYear(); --i) {
    result += fn(i);
  }

  return result;
}
