import { IUseCase } from '../../../domain/use-case/use-case.interface';
import { IUserRegisterBody } from '../../../domain/entity/users.entity.interface';
import { IUsersService } from '../../../domain/service/users.service.interface';
import { ISecretsManagerProvider } from '../../../domain/providers/secret-manager/interface/secrets-manager.provider.interface';
import { IHashProvider } from '../../../domain/providers/hash/interface/hash.provider.interface';
import { IConfigurationProvider } from '../../../domain/providers/configuration/interface/configuration.provider.interface';
import { AlreadyExistsException } from '../../../domain/exceptions/already-exists.exception';

export class UserRegisterUseCase implements IUseCase<IUserRegisterBody, void> {
  constructor(
    private readonly _usersService: IUsersService,
    private readonly _secretsManagerProvider: ISecretsManagerProvider,
    private readonly _hashProvider: IHashProvider,
    private readonly _configurationProvider: IConfigurationProvider
  ) {}

  async execute(input: IUserRegisterBody): Promise<void> {
    try {
      const existingUserByEmail = await this._usersService.getByEmail(
        input.email
      );

      if (existingUserByEmail)
        throw new AlreadyExistsException(
          `User with email: ${input.email} already is registered`
        );

      const existingUserByDocument = await this._usersService.getByDocument(
        input.document
      );

      if (existingUserByDocument)
        throw new AlreadyExistsException(
          `User with document: ${input.document} already is registered`
        );

      const secret = await this._secretsManagerProvider.get<{ key: string }>(
        this._configurationProvider.getSecretsManagerName()
      );

      const hashedPassword = await this._hashProvider.hash(
        input.password,
        secret.key
      );

      await this._usersService.create({ ...input, password: hashedPassword });
    } catch (error) {
      throw error;
    }
  }
}
