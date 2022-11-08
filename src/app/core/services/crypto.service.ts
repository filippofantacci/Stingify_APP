import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  public static encrypt(input: any): string {
    input = input instanceof String ? input : JSON.stringify(input);
    const _key = CryptoJS.enc.Base64.parse(environment.cryptRequestResponse.aes_key);
    const _iv = CryptoJS.enc.Base64.parse(environment.cryptRequestResponse.aes_iv);
    const encryptedAES = CryptoJS.AES.encrypt(input, _key, { iv: _iv });
    const ret = encryptedAES.ciphertext.toString(CryptoJS.enc.Base64);
    return ret;
  }

  public static decrypt(input: string): any {
    const _key = CryptoJS.enc.Base64.parse(environment.cryptRequestResponse.aes_key);
    const _iv = CryptoJS.enc.Base64.parse(environment.cryptRequestResponse.aes_iv);
    const decrypted = CryptoJS.AES.decrypt(input, _key, { iv: _iv }).toString(CryptoJS.enc.Latin1);
    return JSON.parse(decrypted);
  }

  public static get enableCrypto(): boolean {
    return environment.cryptRequestResponse.enable;
  }
}
