import { legacyWalletChecksum, walletChecksum } from '../index';
import blake2b from 'blake2b';

test('Restore wallet', () => {
  var output = new Uint8Array(64)
  var input = Buffer.from('hello world')

  // 'eight country switch draw meat scout mystery blade tip drift useless good keep usage title'
  {
    const byronChecksum = legacyWalletChecksum(
      'c926351ca58e9a4575899968585f44a12d144df792d536f92aa07d37ffc7400baa3c34e291f9f1b4a3386445ab5430689034d5a2e30086197e5867f0a243a4b3'
    );
    expect(byronChecksum).toEqual({
      ImagePart: '311dc4ba4fb8887b0153fa1768727ceab59c247f5e64a6d11dc6f246a90752e6376d417654ea188a4e5eaad32320cc8fa941463818e5fc78a6c96712152cd2f7',
      TextPart: 'EAJD-7036'
    });

    const itnChecksum = legacyWalletChecksum(
      '84fd37565a1ba6482963478493de2057e40e740e69fc7d6abb0d0e30c5246626d186e94f31dc5d51e558aa732134689c11259668a1315afceeb0d5751eb2b0b8'
    );
    expect(itnChecksum).toEqual({
      ImagePart: '695e34eb25043b617f9ff7f3509aea9a4666747cb38e15c02874dd4dc1b8878c2c0c1b9d186da0568f9db068da010411ba5f00c984164eefbbbdc6e53d153855',
      TextPart: 'JSLX-5059'
    });

    const shelleyChecksum = walletChecksum(
      '84fd37565a1ba6482963478493de2057e40e740e69fc7d6abb0d0e30c5246626d186e94f31dc5d51e558aa732134689c11259668a1315afceeb0d5751eb2b0b8'
    );
    expect(shelleyChecksum).toEqual({
      ImagePart: 'df97618477d2386b7269eb662dfee3fc1a8e3743cffdeb0308df8cefd317823e9be569abf0a4d45e77fa8c307200bf20e904d126523501afeb64e6331bb02538',
      TextPart: 'LDSA-4898'
    });
  }

  // 'broken common spring toilet work safe decrease equal velvet cluster myth old toy hold rain'
  {
    const byronChecksum = legacyWalletChecksum(
      '84fd37565a1ba6482963478493de2057e40e740e69fc7d6abb0d0e30c5246626d186e94f31dc5d51e558aa732134689c11259668a1315afceeb0d5751eb2b0b8'
    );
    expect(byronChecksum).toEqual({
      ImagePart: '695e34eb25043b617f9ff7f3509aea9a4666747cb38e15c02874dd4dc1b8878c2c0c1b9d186da0568f9db068da010411ba5f00c984164eefbbbdc6e53d153855',
      TextPart: 'JSLX-5059'
    });

    const itnChecksum = legacyWalletChecksum(
      '8d2e76d31571bbde5293a517d5407baa922bb3dbefa785138d304cffb2ac5ad7fd3c2f14ed0a10344c8f3cb4a1c271bc01691a39718a022e77eaece699208870'
    );
    expect(itnChecksum).toEqual({
      ImagePart: 'bc64bb1a1db9506795a6433fdfb8c772da9172b3acb54b73df2667120c462f678c1921d1471d4ece7435454b0eac60e5ff9abc0cdec9cbea0dfb43349c481128',
      TextPart: 'HLAZ-1381'
    });

    const shelleyChecksum = walletChecksum(
      '8d2e76d31571bbde5293a517d5407baa922bb3dbefa785138d304cffb2ac5ad7fd3c2f14ed0a10344c8f3cb4a1c271bc01691a39718a022e77eaece699208870'
    );
    expect(shelleyChecksum).toEqual({
      ImagePart: 'f4d2cc2e2a439783cb6f325c288adf9ff5125de705445bd4f6e468ffe75a613f19765a67ec77ef38f5eeae494a5189c99f3f0975b30c35692a1fd0f6afcce050',
      TextPart: 'XEOO-3177'
    });
  }
});
