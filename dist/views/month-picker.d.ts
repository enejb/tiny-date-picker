/**
 * @file Manages the month-picker view.
 */
declare const _default: {
    onKeyDown: typeof keyDown;
    onClick: {
        'dp-month': typeof onChooseMonth;
    };
    render: typeof render;
};
export default _default;
declare function onChooseMonth(e: Event, dp: any): void;
/**
 * render renders the month picker as an HTML string
 *
 * @param {DatePickerContext} dp the date picker context
 * @returns {string}
 */
declare function render(dp: any): string;
/**
 * keyDown handles keydown events that occur in the month picker
 *
 * @param {Event} e
* @param {DatePickerContext} dp
 */
declare function keyDown(e: KeyboardEvent, dp: any): void;
//# sourceMappingURL=month-picker.d.ts.map