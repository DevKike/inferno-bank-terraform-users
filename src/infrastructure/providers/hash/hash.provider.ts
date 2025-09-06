import { IHashProvider } from '../../../domain/providers/hash/interface/hash.provider.interface';
import { compare, hash } from 'bcryptjs';

export class HashProvider implements IHashProvider {
  constructor() {}

  async hash(plainText: string, salt: string): Promise<string> {
    return hash(plainText, salt);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return compare(plainText, hashed);
  }
}
