/**
 * @file Defines the various date picker modes (modal, dropdown, permanent)
 */

import ModalMode from './modal-mode';
import DropdownMode from './dropdown-mode';
import PermanentMode from './permanent-mode';
import { IDatePickerOptions } from '../interfaces';


export default function Mode(input: HTMLInputElement | string, emit: any, opts: IDatePickerOptions) {
    const el = input instanceof HTMLInputElement ? input : document.querySelector(input)

    if (!el) {
        throw new Error(`The provided input '${input}' could not be found.`)
    }

    switch(opts.mode) {
        case 'dp-modal':
            return ModalMode(el as HTMLInputElement, emit, opts);
        
        case 'dp-below':
            return DropdownMode(el as HTMLInputElement, emit, opts);

        case 'dp-permanent':
            return PermanentMode(el as HTMLInputElement, emit, opts);
        
        default:
            throw new Error(`Unknown mode: '${opts.mode}`)

    }
}
