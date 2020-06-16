/**
 * @file Helper functions for dealing with dom elements.
 */

export var Key = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  enter: 13,
  esc: 27,
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
export function on(evt: string, el: HTMLElement, handler: EventListenerOrEventListenerObject) {
  el.addEventListener(evt, handler, true);

  return function () {
    el.removeEventListener(evt, handler, true);
  };
}