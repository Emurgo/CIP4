import blake2b from 'blake2b';
import crc32 from 'buffer-crc32';
import fnv1a from '@sindresorhus/fnv1a';

export type WalletChecksum = {
  ImagePart: string,
  TextPart: string,
};

export function legacyWalletChecksum(publicKeyHash: string /* note: lowercase hex representation */) {
  // ImagePart
  const output = new Uint8Array(64)
  const input = Buffer.from(publicKeyHash)
  const ImagePart = blake2b(output.length).update(input).digest('hex');

  // TextPart
  const [a, b, c, d] = crc32(ImagePart);
  const alpha = `ABCDEJHKLNOPSTXZ`;
  const letters = (x: number): string => `${alpha[Math.floor(x / 16)]}${alpha[x % 16]}`;
  const numbers = `${((c << 8) + d) % 10000}`.padStart(4, '0');
  const TextPart = `${letters(a)}${letters(b)}-${numbers}`;

  return { ImagePart, TextPart };
}

function toBytesInt32(int32: number): [number, number, number, number] {
  const byteArray: [number, number, number, number] = [0, 0, 0, 0];

  for (let index = 0; index < byteArray.length; index ++ ) {
      const byte = int32 & 0xff;
      byteArray [ index ] = byte;
      int32 = (int32 - byte) / 256 ;
  }

  return byteArray;
}

export function walletChecksum(publicKeyHash: string /* note: lowercase hex representation */) {
  // ImagePart
  const output = new Uint8Array(64)
  const input = Buffer.from(publicKeyHash)
  const ImagePart = blake2b(
    output.length,
    undefined,
    undefined,
    Buffer.from('wallets checksum') // personal
  ).update(input).digest('hex');

  // TextPart
  const [a, b, c, d] = toBytesInt32(fnv1a(ImagePart));
  const alpha = `ABCDEJHKLNOPSTXZ`;
  const letters = (x: number): string => `${alpha[Math.floor(x / 16)]}${alpha[x % 16]}`;
  const numbers = `${((c << 8) + d) % 10000}`.padStart(4, '0');
  const TextPart = `${letters(a)}${letters(b)}-${numbers}`;

  return { ImagePart, TextPart };
}
