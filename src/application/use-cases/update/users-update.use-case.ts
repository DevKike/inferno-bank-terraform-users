import {
  IUser,
  IUserUpdate,
  IUserUpdateInput,
  IUserUpdateRes,
} from '../../../domain/entity/users.entity.interface';
import { IUsersService } from '../../../domain/service/users.service.interface';
import { IUseCase } from '../../../domain/use-case/use-case.interface';

export class UsersUpdateUseCase
  implements IUseCase<IUserUpdateInput, IUserUpdateRes>
{
  constructor(private readonly _usersService: IUsersService) {}

  async execute(input: IUserUpdateInput): Promise<IUserUpdateRes> {
    try {
      const { id, ...updateData } = input;

      return this._usersService.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }
}
