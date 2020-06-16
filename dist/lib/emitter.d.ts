/**
 * @file Defines simple event emitter behavior.
 */
declare type TEmitterFn = (name: string, arg: any) => void;
/**
 * Emitter constructs a new emitter object which has on/off methods.
 *
 * @returns {EventEmitter}
 */
export default function Emitter(): {
    on: (name: string | Array<TEmitterFn>, handler: TEmitterFn) => any;
    emit: (name: string, arg: any) => void;
    off: (name: string, handler: TEmitterFn) => any;
};
export {};
//# sourceMappingURL=emitter.d.ts.map