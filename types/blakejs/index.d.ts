declare module "blakejs" {

  type Ctx = {
    b: Uint8Array,
    h: Uint32Array,
    t: number, // input count
    c: number, // pointer within buffer
    outlen: number // output length in bytes
  };

  export function blake2b(input: string | Uint8Array, key?: Uint8Array | undefined, outlen?: number): Uint8Array;
  export function blake2bHex(input: string | Uint8Array, key?: Uint8Array | undefined, outlen?: number): string;
  export function blake2bInit(outlen: number, key?: Uint8Array | undefined): Ctx;
  export function blake2bUpdate(ctx: Ctx, input: Uint8Array): void;
  export function blake2bFinal(ctx: Ctx): Uint8Array;
}
