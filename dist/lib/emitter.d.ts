/**
 * @file Defines simple event emitter behavior.
 */
declare type TEmitterFn = (name: string, arg: any) => void;
declare type TEmitterFns = {
    [key: string]: TEmitterFn;
};
/**
 * Emitter constructs a new emitter object which has on/off methods.
 *
 * @returns {EventEmitter}
 */
export default function Emitter(): {
    on: (name: string | TEmitterFns, handler?: TEmitterFn | undefined) => any;
    emit: (name: string, arg?: any) => void;
    off: (name?: string | undefined, handler?: TEmitterFn | undefined) => any;
};
export {};
//# sourceMappingURL=emitter.d.ts.map