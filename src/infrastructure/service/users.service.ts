import {
  IUserRegisterResponse,
  IUserRegisterBody,
} from '../../domain/entity/users.entity.interface';
import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import { IUsersService } from '../../domain/service/users.service.interface';
import { environments } from '../environments/environments.dev';

import { HashProvider } from '../providers/hash.provider';
import { SecretsManagerProvider } from '../providers/secrets-manager.provider';

export class UsersService implements IUsersService {
  private readonly _secretsManagerProvider: SecretsManagerProvider;
  private readonly _hashProvider: HashProvider;

  constructor(private readonly _usersRepository: IUsersRepository) {
    this._secretsManagerProvider = new SecretsManagerProvider();
    this._hashProvider = new HashProvider();
  }

  async register(user: IUserRegisterBody): Promise<IUserRegisterResponse> {
    try {
      const secret = await this._secretsManagerProvider.get<{ key: string }>(
        environments.usersSecretsManagerName!
      );

      const hashedPassword = await this._hashProvider.hash(
        user.password,
        secret.key
      );

      const newUser = await this._usersRepository.save({
        ...user,
        password: hashedPassword,
        address: null,
        phone: null,
        image: null,
      });

      const {
        uuid,
        password,
        document,
        address,
        phone,
        image,
        ...userResponse
      } = newUser;

      return userResponse;
    } catch (error) {
      throw error;
    }
  }
}
