// A date range picker built on top of TinyDatePicker;
import { TinyDatePicker } from './date-picker';
import Emitter from './lib/emitter';
import { shiftMonth, datesEq } from './lib/date-manip';
import { cp } from './lib/fns';
import { IDateRangePickerOptions, IDatePicker, IDateRangePickerState } from './interfaces';

/**
* The state values for the date range picker
*
* @typedef {Object} DateRangeState
* @property {Date} start - The start date (can be null)
* @property {Date} end - The end date (can be null)
*/

/**
* An instance of TinyDatePicker
*
* @typedef {Object} DateRangePickerInst
* @property {DateRangeState} state - The start / end dates
* @property {function} on - Adds an event handler
* @property {function} off - Removes an event handler
* @property {function} setState - Changes the current state of the date picker
*/

/**
 * TinyDatePicker constructs a new date picker for the specified input
 *
 * @param {HTMLElement} input The input associated with the datepicker
 * @returns {DateRangePickerInst}
 */
export function DateRangePicker(container: HTMLElement, opts: IDateRangePickerOptions) {
  opts = opts || {};
  const emitter = Emitter();
  const root = renderInto(container);
  let hoverDate: Date;
  let state = {
    start: undefined,
    end: undefined,
  } as IDateRangePickerState

  const startEl = root.querySelector('.dr-cal-start')
  const endEl = root.querySelector('.dr-cal-end')

  if (!startEl) {
    throw new Error(`Could not find DateRangePicker startElement: '${startEl}`)
  }

  if (!endEl) {
    throw new Error(`Could not find DateRangePicker endElement: '${endEl}`)
  }

  const start = TinyDatePicker(startEl as HTMLInputElement, cp({}, opts.startOpts, {
    mode: 'dp-permanent',
    dateClass: dateClass,
  }));
  const end = TinyDatePicker(endEl as HTMLInputElement, cp({}, opts.endOpts, {
    mode: 'dp-permanent',
    hilightedDate: shiftMonth(start.state.hilightedDate as Date, 1),
    dateClass: dateClass,
  }));

  const me = {
    state: state,
    setState: setState,
    on: emitter.on,
    off: emitter.off,
  };

  start.on('statechange', onStateChange);
  start.on('select', dateSelected);

  end.on('statechange', onStateChange);
  end.on('select', dateSelected);

  function onStateChange(_: any, dp: any) {
    const d1 = start.state.hilightedDate as Date;
    const d2 = end.state.hilightedDate as Date;
    const diff = diffMonths(d1, d2);

    if (diff === 1) {
      return;
    }

    if (dp === start) {
      end.setState({
        hilightedDate: shiftMonth(dp.state.hilightedDate, 1),
      });
    } else {
      start.setState({
        hilightedDate: shiftMonth(dp.state.hilightedDate, -1),
      });
    }
  }

  function dateSelected(_: any, dp: IDatePicker) {
    const dt = dp.state.selectedDate;

    if (!state.start || state.end) {
      setState({
        start: dt,
        end: undefined,
      });
    } else {
      setState({
        start: dt > state.start ? state.start : dt,
        end: dt > state.start ? dt : state.start,
      });
    }
  };

  function setState(newState: IDateRangePickerState) {
    state = { ...newState }

    emitter.emit('statechange', me);
    rerender();
  }

  function rerender() {
    start.setState({});
    end.setState({});
  }

  // Hack to avoid a situation where iOS requires double-clicking to select
  if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    root.addEventListener('mouseover', function mouseOverDate(e) {
      if (!e || !e.target) {
        return
      }

      const elTarget = e.target as HTMLElement

      if (elTarget.classList.contains('dp-day')) {
        const dt = new Date(parseInt(elTarget.dataset.date as string));
        const changed = !datesEq(dt, hoverDate);

        if (changed) {
          hoverDate = dt;
          rerender();
        }
      }
    });
  }

  function dateClass(dt: Date) {
    const rangeClass = (state.end || hoverDate) &&
      state.start &&
      inRange(dt, state.end || hoverDate, state.start);
    const selectedClass = datesEq(dt, state.start) || datesEq(dt, state.end);

    return (rangeClass ? 'dr-in-range ' : '') +
      (selectedClass ? 'dr-selected ' : '');
  }

  return me;
}

function renderInto(container: string | HTMLElement) {
  if (typeof container === 'string') {
    const candidate = document.querySelector(container);
    if (!candidate) {
      throw new Error(`Could not find container: '${container}'`)
    }
    container = candidate as HTMLElement
  }

  container.innerHTML = '<div class="dr-cals">' +
    '<div class="dr-cal-start"></div>' +
    '<div class="dr-cal-end"></div>' +
    '</div>';

  return container.querySelector('.dr-cals') as HTMLElement;
}

function toMonths(dt: Date) {
  return (dt.getFullYear() * 12) + dt.getMonth();
}

function diffMonths(d1: Date, d2: Date) {
  return toMonths(d2) - toMonths(d1);
}

function inRange(dt: Date, start: Date, end: Date) {
  return (dt < end && dt >= start) || (dt <= start && dt > end);
}
