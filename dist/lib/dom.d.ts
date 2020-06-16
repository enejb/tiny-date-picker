/**
 * @file Helper functions for dealing with dom elements.
 */
export declare var Key: {
    left: number;
    up: number;
    right: number;
    down: number;
    enter: number;
    esc: number;
};
/**
 * on attaches an event handler to the specified element, and returns an
 * off function which can be used to remove the handler.
 *
 * @param {string} evt the name of the event to handle
 * @param {HTMLElement} el the element to attach to
 * @param {function} handler the event handler
 * @returns {function} the off function
 */
export declare function on(evt: string, el: HTMLElement, handler: EventListenerOrEventListenerObject): () => void;
//# sourceMappingURL=dom.d.ts.map