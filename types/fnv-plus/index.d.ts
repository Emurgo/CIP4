declare class FnvHash {
  str(): string
  hex(): string
  dec(): string
}

declare module 'fnv-plus' {
  export function hash(
    message: string | object,
    keyspace?: number
  ): FnvHash;

  export function setKeyspace(
    keyspace: number
  ): void;

  export function setVersion(
    _version: '1a' | '1'
  ): void;

  export function seed(
    message: string
  ): void;

  export function useUTF8(
    utf8: boolean
  ): void;

  export function fast1a32(str: string): number;
  export function fast1a32hex(str: string): string;
  export function fast1a52(str: string): number;
  export function fast1a52hex(str: string): string;
  export function fast1a64(str: string): string;
  export function fast1a32utf(str: string): number;
  export function fast1a32hexutf(str: string): string;
  export function fast1a52utf(str: string): number;
  export function fast1a52hexutf(str: string): string;
  export function fast1a64utf(str: string): string;
}
