/**
 * @file Defines the dropdown date picker behavior.
 */

import BaseMode from './base-mode';

export default function DropdownMode(input, emit, opts) {
    const dp = BaseMode(input, emit, opts);

    dp.shouldFocusOnBlur = false;

    Object.defineProperty(dp, 'shouldFocusOnRender', {
        get: function () {
            return input !== document.activeElement;
        },
    });

    dp.adjustPosition = function () {
        autoPosition(input, dp, opts.alignment);
    };

    return dp;
}

function autoPosition(input, dp, alignment) {
    const inputPos = input.getBoundingClientRect();
    const win = window;

    adjustCalY(dp, inputPos, win);
    adjustCalX(dp, inputPos, win, alignment);

    dp.el.style.visibility = '';
}

function adjustCalX(dp, inputPos, win, alignment) {
    const cal = dp.el;
    const scrollLeft = win.pageXOffset;
    const inputLeft = inputPos.left + scrollLeft;
    const maxRight = win.innerWidth + scrollLeft;
    const offsetWidth = cal.offsetWidth;
    const calRight = inputLeft + offsetWidth;
    const shiftedLeft = maxRight - offsetWidth;
    const left = calRight > maxRight && shiftedLeft > 0 ? shiftedLeft : inputLeft;

    if (alignment === 'right') {
        cal.style.left = left + (inputPos.width - offsetWidth) + 'px';
    } else {
        cal.style.left = left + 'px';
    }
}

function adjustCalY(dp, inputPos, win) {
    const cal = dp.el;
    const scrollTop = win.pageYOffset;
    const inputTop = scrollTop + inputPos.top;
    const calHeight = cal.offsetHeight;
    const belowTop = inputTop + inputPos.height + 8;
    const aboveTop = inputTop - calHeight - 8;
    const isAbove = (aboveTop > 0 && belowTop + calHeight > scrollTop + win.innerHeight);
    const top = isAbove ? aboveTop : belowTop;

    if (cal.classList) {
        cal.classList.toggle('dp-is-above', isAbove);
        cal.classList.toggle('dp-is-below', !isAbove);
    }
    cal.style.top = top + 'px';
}
