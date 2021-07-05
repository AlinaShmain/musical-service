import * as forge from "node-forge";
import * as CryptoJS from "crypto-js";
import * as bcrypt from "bcryptjs";

export class SecurityService {

  private keySize: number;
  private iterationCount: number;

  private keyPair: forge.pki.rsa.KeyPair;

  constructor(keySize: number, iterationCount: number) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
    this.keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  }

  generateKey(salt: CryptoJS.lib.WordArray, passPhrase: string): CryptoJS.lib.WordArray {
    const key: CryptoJS.lib.WordArray = CryptoJS.PBKDF2(
      passPhrase,
      salt,
      { keySize: this.keySize, iterations: this.iterationCount });
    return key;
  }

  encrypt(passPhrase: string): string {
    const privateKeyPem = forge.pki.privateKeyToPem(this.keyPair.privateKey);
    const salt: CryptoJS.lib.WordArray = this.getWordArray(128 / 8);
    const iv: CryptoJS.lib.WordArray = this.getWordArray(128 / 8);

    const key: CryptoJS.lib.WordArray = this.generateKey(salt, passPhrase);

    const encJson: string = CryptoJS.AES.encrypt(
      JSON.stringify(privateKeyPem),
      key,
      { iv }).toString();
    const encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
    const encryptedPrivateKey: string = "-----BEGIN ENCRYPTED PRIVATE KEY-----\r\n" +
      iv.toString(CryptoJS.enc.Base64) + ":" + salt.toString(CryptoJS.enc.Base64) + ":" + encData +
      "-----END ENCRYPTED PRIVATE KEY-----\r\n";

    const publicKeyPem = forge.pki.publicKeyToPem(this.keyPair.publicKey);

    const dbKeyEnc: string = encryptedPrivateKey + "\r\n----\r\n" + publicKeyPem;

    return dbKeyEnc;
  }

  decryptPrivateKey(encrypted: string, passPhrase: string): forge.pki.rsa.PrivateKey {

    const splitted = encrypted.split(":");

    const ivWordArr: CryptoJS.lib.WordArray = CryptoJS.enc.Base64.parse(splitted[0]);
    const saltWordArr: CryptoJS.lib.WordArray = CryptoJS.enc.Base64.parse(splitted[1]);

    const encryptedText = splitted[2];

    const key128Bits: CryptoJS.lib.WordArray = this.generateKey(saltWordArr, passPhrase);

    const decData = CryptoJS.enc.Base64.parse(encryptedText).toString(CryptoJS.enc.Utf8);
    const bytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(
      decData,
      key128Bits,
      { iv: ivWordArr },
    );

    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const privateKey: forge.pki.rsa.PrivateKey = forge.pki.privateKeyFromPem(decrypted);

    return privateKey;
  }

  decryptRND(privateKey: forge.pki.rsa.PrivateKey, encryptedRND: string): string {
    return privateKey.decrypt(encryptedRND);
  }

  getHash(str: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(str, salt);

    return salt + ":" + hash;
  }

  public getWordArray(wordLength: number): CryptoJS.lib.WordArray {
    return CryptoJS.lib.WordArray.random(wordLength);
  }

}
