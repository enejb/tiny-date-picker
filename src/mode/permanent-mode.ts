/**
 * @file Defines the permanent date picker behavior.
 */
import { noop } from '../lib/fns';
import BaseMode from './base-mode';
import { IDatePickerOptions } from '../interfaces';


export default function PermanentMode(root: HTMLInputElement, emit: any, opts: IDatePickerOptions) {
    const dp = BaseMode(root, emit, opts);

    dp.close = noop;
    dp.updateInput = noop;
    dp.shouldFocusOnRender = opts.shouldFocusOnRender || false;

    dp.computeSelectedDate = function () {
        return opts.hilightedDate;
    };

    dp.attachToDom = function () {
        if (dp.el) {
            root.appendChild(dp.el);
        }
    };

    dp.open();

    return dp;
}
