import { IUserUploadAvatarBody } from '../../../domain/entity/users.entity.interface';
import { IConfigurationProvider } from '../../../domain/providers/configuration/interface/configuration.provider.interface';
import { IS3Provider } from '../../../domain/providers/s3/interface/s3.provider.interface';
import { IUsersRepository } from '../../../domain/repository/users.repository.interface';
import { IUseCase } from '../../../domain/use-case/use-case.interface';
import { generateUniqueKey } from '../../../domain/utils/s3/generate-unique-key.util';

export class UsersUploadAvatarUseCase
  implements IUseCase<IUserUploadAvatarBody, string>
{
  constructor(
    private readonly _configurationProvider: IConfigurationProvider,
    private readonly _s3Provider: IS3Provider,
    private readonly _usersRepository: IUsersRepository
  ) {}

  async execute(input: IUserUploadAvatarBody): Promise<string> {
    try {
      const uniqueKey = generateUniqueKey('avatars', input.avatar.filename);

      await this._s3Provider.upload(
        this._configurationProvider.getS3BucketName(),
        {
          ...input.avatar,
          filename: uniqueKey,
        }
      );

      const avatarUrl = await this._s3Provider.getUrl(
        this._configurationProvider.getS3BucketName(),
        uniqueKey
      );

      await this._usersRepository.update(input.uuid, {
        image: avatarUrl,
      });

      return avatarUrl;
    } catch (error) {
      throw error;
    }
  }
}
