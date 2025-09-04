import { compare, hash } from 'bcryptjs';

export class HashProvider {
  constructor() {}

  async hash(plainText: string, salt: string): Promise<string> {
    return hash(plainText, salt);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return compare(plainText, hashed);
  }
}
