import {
  IUser,
  IUserGetProfileRes,
} from '../../../domain/entity/users.entity.interface';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { IUsersService } from '../../../domain/service/users.service.interface';
import { IUseCase } from '../../../domain/use-case/use-case.interface';

export class UsersGetProfile
  implements IUseCase<IUser['uuid'], IUserGetProfileRes>
{
  constructor(private readonly _usersService: IUsersService) {}

  async execute(input: IUser['uuid']): Promise<IUserGetProfileRes> {
    try {
      const user = await this._usersService.getById(input);

      if (!user) throw new NotFoundException('User not found');

      const { uuid, password, ...userData } = user;

      return userData;
    } catch (error) {
      throw error;
    }
  }
}
