import * as CryptoJS from "crypto-js";

export class CacheService {
  internalAppKey: string = "@kjsdlfYRKNJ##4|ApiKey";

  addData<T>(data: T, key: string): void {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.internalAppKey.toString()
    );
    localStorage.setItem(key, encryptedData.toString());
  }
  getData<T>(key: string): T {
    try {
      let data = localStorage.getItem(key);
      if (!data) return undefined as T;
      const decryptedData = CryptoJS.AES.decrypt(
        data,
        this.internalAppKey.toString()
      ).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData) as T;
    } catch {
      return undefined as T;
    }
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
