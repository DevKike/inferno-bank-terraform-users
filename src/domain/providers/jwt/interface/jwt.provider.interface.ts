export interface IJwtProvider {
  sign(payload: object): string;
  verify<T>(token: string): T;
}
