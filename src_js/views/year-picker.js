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
function render(dp) {
  const state = dp.state;
  const currentYear = state.hilightedDate.getFullYear();
  const selectedYear = state.selectedDate.getFullYear();

  return (
    '<div class="dp-years">' +
      mapYears(dp, function (year) {
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

function onChooseYear(e, dp) {
  dp.setState({
    hilightedDate: setYear(dp.state.hilightedDate, parseInt(e.target.getAttribute('data-year'))),
    view: 'day',
  });
}

function keyDown(e, dp) {
  const key = e.code || e.keyCode;
  const opts = dp.opts;
  const shiftBy =
    (key === Key.left || key === Key.up) ? 1 :
    (key === Key.right || key === Key.down) ? -1 :
    0;

  if (key === Key.esc) {
    dp.setState({
      view: 'day',
    });
  } else if (shiftBy) {
    e.preventDefault();
    const shiftedYear = shiftYear(dp.state.hilightedDate, shiftBy);

    dp.setState({
      hilightedDate: constrainDate(shiftedYear, opts.min, opts.max),
    });
  }
}

function mapYears(dp, fn) {
  let result = '';
  const max = dp.opts.max.getFullYear();

  for (let i = max; i >= dp.opts.min.getFullYear(); --i) {
    result += fn(i);
  }

  return result;
}
