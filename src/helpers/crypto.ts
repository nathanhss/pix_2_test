import { privateDecrypt, publicEncrypt } from 'crypto';

import { readFileSync } from 'fs';
import { resolve } from 'path';

const encrypt = (toEncrypt: string): string => {
  const absolutePath = resolve('src/auth/keys/rsa_4096_pub.pem');
  const publicKey = readFileSync(absolutePath, 'utf8');
  const buffer = Buffer.from(toEncrypt, 'utf8');
  const encrypted = publicEncrypt(publicKey, buffer);

  return encrypted.toString('base64');
};

const decrypt = (toDecrypt: any) => {
  const absolutePath = resolve('src/auth/keys/rsa_4096_priv.pem');
  const privateKey = readFileSync(absolutePath, 'utf8');
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: '',
    },
    buffer,
  );

  return decrypted.toString('utf8');
};

export default {
  encrypt,
  decrypt,
};
