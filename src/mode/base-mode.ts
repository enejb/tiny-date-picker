/**
 * @file Defines the base date picker behavior, overridden by constious modes.
 */
import dayPicker from '../views/day-picker';
import monthPicker from '../views/month-picker';
import yearPicker from '../views/year-picker';
import { bufferFn, noop } from '../lib/fns';
import { on, Key } from '../lib/dom';
import { constrainDate } from '../lib/date-manip';
import { IDatePickerOptions, IDatePicker, IState } from '../interfaces';

const views = {
    day: dayPicker,
    year: yearPicker,
    month: monthPicker,
};

export default function BaseMode(input: HTMLInputElement, emit: any, opts: IDatePickerOptions): IDatePicker {
    let detatchInputEvents: () => void; // A function that detaches all events from the input
    let closing = false; // A hack to prevent calendar from re-opening when closing.
    let selectedDate: Date; // The currently selected date
    const dp = {
        // The root DOM element for the date picker, initialized on first open.
        el: undefined,
        opts: opts,
        shouldFocusOnBlur: true,
        shouldFocusOnRender: true,
        state: initialState(),
        adjustPosition: noop,
        containerHTML: '<div class="dp"></div>',

        attachToDom: function () {
            opts.appendTo.appendChild(dp.el as unknown as Node);
        },

        updateInput: function (selectedDate: Date) {
            const e = new CustomEvent('change', { bubbles: true });
            input.value = selectedDate ? opts.format(selectedDate) : '';
            input.dispatchEvent(e);
        },

        computeSelectedDate: function () {
            return opts.parse(input.value);
        },

        currentView: function () {
            return views[dp.state.view];
        },

        open: function () {
            if (closing) {
                return;
            }

            if (!dp.el) {
                dp.el = createContainerElement(opts, dp.containerHTML);
                attachContainerEvents(dp);
            }

            selectedDate = constrainDate(dp.computeSelectedDate(), opts.min, opts.max);
            dp.state.highlightedDate = selectedDate || opts.highlightedDate;
            dp.state.view = 'day';

            dp.attachToDom();
            dp.render();

            emit('open');
        },

        isVisible: function () {
            return !!dp.el && !!dp.el.parentNode;
        },

        hasFocus: function () {
            const focused = document.activeElement;
            return dp.el &&
                dp.el.contains(focused) &&
                focused!.className.indexOf('dp-focuser') < 0;
        },

        shouldHide: function () {
            return dp.isVisible();
        },

        close: function (becauseOfBlur) {
            const el = dp.el;

            if (!dp.isVisible()) {
                return;
            }

            if (el) {
                const parent = el.parentNode;
                parent && parent.removeChild(el);
            }

            closing = true;

            if (becauseOfBlur && dp.shouldFocusOnBlur) {
                focusInput(input);
            }

            // When we close, the input often gains refocus, which
            // can then launch the date picker again, so we buffer
            // a bit and don't show the date picker within N ms of closing
            setTimeout(function () {
                closing = false;
            }, 100);

            emit('close');
        },

        destroy: function () {
            dp.close();
            detatchInputEvents();
        },

        render: function () {
            if (!dp.el) {
                return;
            }

            const hadFocus = dp.hasFocus();
            const html = dp.currentView().render(dp);
            
            if (html) {
                (dp.el.firstChild! as HTMLElement).innerHTML = html;
            }

            dp.adjustPosition();

            if (hadFocus || dp.shouldFocusOnRender) {
                focusCurrent(dp);
            }
        },

        // Conceptually similar to setState in React, updates
        // the view state and re-renders.
        setState: function (state: IState) {
            for (const key in state) {
                (dp.state as any)[key] = (state as any)[key]
            }

            emit('statechange');
            dp.render();
        },
    } as IDatePicker;

    detatchInputEvents = attachInputEvents(input, dp);

    // Builds the initial view state
    // selectedDate is a special case and causes changes to highlightedDate
    // highlightedDate is set on open, so remains undefined initially
    // view is the current view (day, month, year)
    function initialState(): IState {
        return {
            get selectedDate() {
                return selectedDate;
            },
            set selectedDate(dt: Date) {
                if (dt && !opts.inRange(dt)) {
                    return;
                }

                if (dt) {
                    selectedDate = new Date(dt);
                    dp.state.highlightedDate = selectedDate;
                } else {
                    selectedDate = dt;
                }

                dp.updateInput(selectedDate);
                emit('select');
                dp.close();
            },
            view: 'day',
        };
    }

    return dp;
}

function createContainerElement(opts: IDatePickerOptions, containerHTML: string) {
    const el = document.createElement('div');

    el.className = opts.mode;
    el.innerHTML = containerHTML;

    return el;
}

function attachInputEvents(input: HTMLElement, dp: IDatePicker) {
    const bufferShow = bufferFn(5, function () {
        if (dp.shouldHide()) {
            dp.close();
        } else {
            dp.open();
        }
    });

    const off = [
        on('blur', input, bufferFn(150, function () {
            if (!dp.hasFocus()) {
                dp.close(true);
            }
        })),

        on('mousedown', input, function () {
            if (input === document.activeElement) {
                bufferShow();
            }
        }),

        on('focus', input, bufferShow),

        on('input', input, function (e) {
            if (!e || !e.target) {
                return
            }
            const target = e.target as HTMLInputElement
            const date = dp.opts.parse(target.value);
            isNaN(date.valueOf()) || dp.setState({
                highlightedDate: date,
            });
        }),
    ];

    // Unregister all events that were registered above.
    return function () {
        off.forEach(function (f) {
            f();
        });
    };
}

function focusCurrent(dp: IDatePicker) {
    const current = dp.el!.querySelector('.dp-current') as HTMLElement
    return current && current.focus();
}

function attachContainerEvents(dp: IDatePicker) {
    const el = dp.el as HTMLElement;
    const calEl = el.querySelector('.dp') as HTMLElement;

    // Hack to get iOS to show active CSS states
    el!.ontouchstart = noop;

    function onClick(e: any) {
        if (!e) {
            return
        }

        e.target.className.split(' ').forEach(function (evt: string) {
            const handler = dp.currentView().onClick[evt];
            handler && handler(e, dp);
        });
    }

    // The calender fires a blur event *every* time we redraw
    // this means we need to buffer the blur event to see if
    // it still has no focus after redrawing, and only then
    // do we return focus to the input. A possible other approach
    // would be to set context.redrawing = true on redraw and
    // set it to false in the blur event.
    on('blur', calEl, bufferFn(150, function () {
        if (!dp.hasFocus()) {
            dp.close(true);
        }
    }));

    on('keydown', el, function (e) {
        const ke = e as KeyboardEvent
        const code = ke.code || ke.keyCode
        if (code === Key.enter) {
            onClick(ke);
        } else {
            dp.currentView().onKeyDown(ke, dp);
        }
    });

    // If the user clicks in non-focusable space, but
    // still within the date picker, we don't want to
    // hide, so we need to hack some things...
    on('mousedown', calEl, function (e) {
        //e.target.focus && e.target.focus(); // IE hack
        if (document.activeElement !== e.target) {
            e.preventDefault();
            focusCurrent(dp);
        }
    });

    on('click', el, onClick);
}

function focusInput(input: HTMLInputElement) {
    // When the modal closes, we need to focus the original input so the
    // user can continue tabbing from where they left off.
    input.focus();

    // iOS zonks out if we don't blur the input, so...
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        input.blur();
    }
}
