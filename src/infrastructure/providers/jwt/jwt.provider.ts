import { IJwtProvider } from '../../../domain/providers/jwt/interface/jwt.provider.interface';
import jwt, { SignOptions } from 'jsonwebtoken';
import { IConfigurationProvider } from '../../../domain/providers/configuration/interface/configuration.provider.interface';

export class JwtProvider implements IJwtProvider {
  constructor(
    private readonly _configurationProvider: IConfigurationProvider
  ) {}

  sign(payload: object): string {
    const options: SignOptions = {
      expiresIn: this._configurationProvider.getJwtTokenExpiration(),
    };

    return jwt.sign(
      payload,
      this._configurationProvider.getJwtSecretKey(),
      options
    );
  }

  verify<T>(token: string): T {
    return jwt.verify(
      token,
      this._configurationProvider.getJwtSecretKey()
    ) as T;
  }
}
