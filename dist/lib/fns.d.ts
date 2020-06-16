/**
 * @file Utility functions for function manipulation.
 */
/**
 * bufferFn buffers calls to fn so they only happen every ms milliseconds
 *
 * @param {number} ms number of milliseconds
 * @param {function} fn the function to be buffered
 * @returns {function}
 */
export declare function bufferFn(ms: number, fn: (...args: any) => any): () => void;
/**
 * noop is a function which does nothing at all.
 */
export declare function noop(): void;
/**
 * copy properties from object o2 to object o1.
 *
 * @params {Object} o1
 * @params {Object} o2
 * @returns {Object}
 */
export declare function cp(...args: any[]): any;
//# sourceMappingURL=fns.d.ts.map