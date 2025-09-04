import { IUserRegisterBody } from '../../domain/entity/users.entity.interface';
import { AlreadyExistsException } from '../../domain/exceptions/already-exists.exception';
import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import { IUsersService } from '../../domain/service/users.service.interface';
import { environments } from '../environments/environments.dev';
import { IHashProvider } from '../providers/hash/interface/hash.provider.interface';
import { ISecretsManagerProvider } from '../providers/secrets-manager/interface/secrets-manager.provider.interface';

export class UsersService implements IUsersService {
  constructor(
    private readonly _secretsManagerProvider: ISecretsManagerProvider,
    private readonly _hashProvider: IHashProvider,
    private readonly _usersRepository: IUsersRepository
  ) {}

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
