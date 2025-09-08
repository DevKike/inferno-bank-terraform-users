import {
  IUserUpdateInput,
  IUserUpdateRes,
} from '../../../domain/entity/users.entity.interface';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { IConfigurationProvider } from '../../../domain/providers/configuration/interface/configuration.provider.interface';
import { ISqsProvider } from '../../../domain/providers/sqs/interface/sqs.provider.interface';
import { IUsersService } from '../../../domain/service/users.service.interface';
import { IUseCase } from '../../../domain/use-case/use-case.interface';

export class UsersUpdateUseCase
  implements IUseCase<IUserUpdateInput, IUserUpdateRes>
{
  constructor(
    private readonly _usersService: IUsersService,
    private readonly _sqsProvider: ISqsProvider,
    private readonly _configurationProvider: IConfigurationProvider
  ) {}

  async execute(input: IUserUpdateInput): Promise<IUserUpdateRes> {
    try {
      const { id, ...updateData } = input;

      const user = await this._usersService.getById(id);

      if (!user) throw new NotFoundException('User not found');

      await this._sqsProvider.send({
        queueUrl: this._configurationProvider.notificationsQueueUrl(),
        data: {
          type: 'USER.UPDATE',
          data: {
            email: user.email,
            date: new Date().toISOString(),
          },
        },
      });

      return this._usersService.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }
}
