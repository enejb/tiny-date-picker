export interface IDatePickerOptions {
    lang: ILanguage
    mode: 'dp-modal' | 'dp-below' | 'dp-permanent'
    highlightedDate: Date | undefined | null
    format: (dt: Date) => string
    parse: (candidate: Date | string) => Date
    dateClass: (dt: Date) => string
    inRange: (dt: Date, dp?: any) => boolean
    appendTo: HTMLElement
    alignment: 'left' | 'right'
    min: Date
    max: Date
    shouldFocusOnBlur?: boolean
    shouldFocusOnRender?: boolean
    dayOffset?: number
}

export interface IDateRangePickerOptions extends IDatePickerOptions {
    startOpts: any
    endOpts: any
}

export interface IDatePicker {
    el: HTMLElement | undefined
    opts: IDatePickerOptions
    shouldFocusOnBlur: boolean
    shouldFocusOnRender: boolean
    state: IState
    adjustPosition: () => void
    containerHTML: string
    attachToDom: () => void
    updateInput: (selectedDate: Date) => void
    computeSelectedDate: () => Date
    currentView: () => IPicker
    open: () => void
    isVisible: () => boolean
    hasFocus: () => boolean
    shouldHide: () => boolean
    close: (becauseOfBlur?: boolean) => void
    destroy: () => void
    render: () => void
    setState: (state: any) => void
}

export interface IState {
    selectedDate: Date
    view: 'day' | 'month' | 'year'
    highlightedDate?: Date
}

export interface IDateRangePickerState {
    start: Date | undefined
    end: Date | undefined
}

export type IAlignment = 'left' | 'right'

export interface ILanguage {
    days: string[],
    months: string[],
    today: string,
    clear: string,
    close: string
	ariaLabel: {
		dayPicker: string,
		monthPicker: string,
		yearPicker: string,
		monthPickerButton: string,
		yearPickerButton: string,
		dayButton: string,
		todayButton: string,
		clearButton: string,
		closeButton: string,
	}
}

export interface IPicker {
    onKeyDown: (evt: KeyboardEvent, dp: any) => void
    onClick: {
        [key: string]: (e: Event | KeyboardEvent, dp: any) => void
    }
    render: (dp: IDatePicker) => string
}
