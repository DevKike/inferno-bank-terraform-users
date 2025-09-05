export interface IHashProvider {
  hash(plainText: string, salt: string): Promise<string>;
  compare(plainText: string, hashed: string): Promise<boolean>;
}
