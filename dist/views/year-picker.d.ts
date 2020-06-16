/**
 * @file Manages the year-picker view.
 */
declare const _default: {
    render: typeof render;
    onKeyDown: typeof keyDown;
    onClick: {
        'dp-year': typeof onChooseYear;
    };
};
export default _default;
/**
 * view renders the year picker as an HTML string.
 *
 * @param {DatePickerContext} dp the date picker context
 * @returns {string}
 */
declare function render(dp: any): string;
declare function onChooseYear(e: Event, dp: any): void;
declare function keyDown(e: KeyboardEvent, dp: any): void;
//# sourceMappingURL=year-picker.d.ts.map