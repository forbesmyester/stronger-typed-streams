/// <reference types="node" />
import * as NodeStream from 'stream';
export declare abstract class Readable<Out> extends NodeStream.Readable {
    constructor(opts?: {});
    abstract _read(): any;
    push(chunk: Out | null, encoding?: string): boolean;
    pipe<NextDuplexOut>(destination: Duplex<Out, NextDuplexOut>, options?: {
        end?: boolean;
    }): Duplex<Out, NextDuplexOut>;
    pipe<NextTransformOut>(destination: Transform<Out, NextTransformOut>, options?: {
        end?: boolean;
    }): Transform<Out, NextTransformOut>;
    pipe(destination: Writable<Out>, options?: {
        end?: boolean;
    }): Writable<Out>;
}
export declare abstract class Duplex<In, Out> extends NodeStream.Duplex {
    constructor(opts?: {});
    push(chunk: Out | null, encoding?: string): boolean;
    pipe<NextDuplexOut>(destination: Duplex<Out, NextDuplexOut>, options?: {
        end?: boolean;
    }): Duplex<Out, NextDuplexOut>;
    pipe<NextTransformOut>(destination: Transform<Out, NextTransformOut>, options?: {
        end?: boolean;
    }): Transform<Out, NextTransformOut>;
    pipe(destination: Writable<Out>, options?: {
        end?: boolean;
    }): Writable<Out>;
}
export declare abstract class Transform<In, Out> extends NodeStream.Transform {
    constructor(opts?: {});
    push(chunk: Out | null, encoding?: string): boolean;
    pipe<NextDuplexOut>(destination: Duplex<Out, NextDuplexOut>, options?: {
        end?: boolean;
    }): Duplex<Out, NextDuplexOut>;
    pipe<NextTransformOut>(destination: Transform<Out, NextTransformOut>, options?: {
        end?: boolean;
    }): Transform<Out, NextTransformOut>;
    pipe(destination: Writable<Out>, options?: {
        end?: boolean;
    }): Writable<Out>;
}
export declare abstract class Writable<In> extends NodeStream.Writable {
    constructor(opts?: {});
    abstract _write(chunk: In, encoding: string, callback: Function): void;
}
