import { IUserRegisterBody } from '../../domain/entity/users.entity.interface';
import { AlreadyExistsException } from '../../domain/exceptions/already-exists.exception';
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

  async register(user: IUserRegisterBody): Promise<void> {
    try {
      const existingUserByEmail = await this._usersRepository.findByEmail(
        user.email
      );

      if (existingUserByEmail)
        throw new AlreadyExistsException(
          `User with email: ${user.email} already is registered`
        );

      const secret = await this._secretsManagerProvider.get<{ key: string }>(
        environments.usersSecretsManagerName!
      );

      const hashedPassword = await this._hashProvider.hash(
        user.password,
        secret.key
      );

      await this._usersRepository.save({
        ...user,
        password: hashedPassword,
      });
    } catch (error) {
      throw error;
    }
  }
}
