import blake2b from 'blake2b';
import crc32 from 'buffer-crc32';
import {fast1a32} from 'fnv-plus';

export type WalletChecksum = {
  ImagePart: string;
  TextPart: string;
};

const ALPHA = `ABCDEJHKLNOPSTXZ`;

function textPartFromBytes([a, b, c, d]: [number, number, number, number]): string {
  const letters = (x: number): string => `${ALPHA[Math.floor(x / 16)]}${ALPHA[x % 16]}`;
  const numbers = `${((c << 8) + d) % 10000}`.padStart(4, '0');
  return `${letters(a)}${letters(b)}-${numbers}`;
}

export function legacyWalletChecksum(publicKeyHash: string /* note: lowercase hex representation */): WalletChecksum {
  // ImagePart
  const output = new Uint8Array(64);
  const input = Buffer.from(publicKeyHash);
  const ImagePart = blake2b(output.length).update(input).digest('hex');

  // TextPart
  const [a, b, c, d] = crc32(ImagePart);
  const TextPart = textPartFromBytes([a, b, c, d]);

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

export function textPartFromWalletChecksumImagePart(walletChecksum: string): string {
  return textPartFromBytes(toBytesInt32(fast1a32(walletChecksum)))
}

function hash(len: number, inp: string, msg: string): string {
  return blake2b(
    len,
    undefined,
    undefined,
    Buffer.from(msg) // personal
  ).update(Buffer.from(inp)).digest('hex');
}

export function hash44(s: string): string {
  const shortHash = hash(33, s, 'shorten checksum');
  const buff1 = Array.from(Buffer.from(shortHash, 'hex').toString('base64'));
  const requiredReplacementPositions = buff1
    .map((c, i) => c === '+' || c === '/' ? i : -1)
    .filter(i => i >= 0);
  const reverse = s.split('').reverse().join('');
  for (let i = 0; i < 100; i++) {
    const shortHash2 = hash(39, `${reverse}${i}`, 'shorten checksum');
    const buff2 = Array.from(Buffer.from(shortHash2, 'hex').toString('base64'));
    const availableReplacements = buff2.filter(c => c !== '+' && c !== '/');
    if (availableReplacements.length >= requiredReplacementPositions.length) {
      requiredReplacementPositions.forEach((position, i) => {
        buff1[position] = availableReplacements[i];
      });
      return buff1.join('');
    }
  }
  return buff1.map(c => c === '+' ? 'a' : (c === '/' ? 'b' : c)).join('');
}

export function walletChecksum(publicKeyHash: string /* note: lowercase hex representation */): WalletChecksum {
  // ImagePart
  const ImagePart = hash(64, publicKeyHash, 'wallets checksum');
  // TextPart
  const TextPart = textPartFromWalletChecksumImagePart(ImagePart);
  return { ImagePart, TextPart };
}
