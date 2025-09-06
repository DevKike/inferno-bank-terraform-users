import {
  IUser,
  IUserUpdate,
  IUserUpdateInput,
  IUserUpdateRes,
} from '../../../domain/entity/users.entity.interface';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { IUsersService } from '../../../domain/service/users.service.interface';
import { IUseCase } from '../../../domain/use-case/use-case.interface';

export class UsersUpdateUseCase
  implements IUseCase<IUserUpdateInput, IUserUpdateRes>
{
  constructor(private readonly _usersService: IUsersService) {}

  async execute(input: IUserUpdateInput): Promise<IUserUpdateRes> {
    try {
      const { id, ...updateData } = input;

      const user = await this._usersService.getById(id);

      if (!user) throw new NotFoundException('User not found');

      return this._usersService.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }
}
