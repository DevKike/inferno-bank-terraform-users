import {
  IUserRegisterBody,
  IUserRegisterResponse,
} from '../../domain/entity/users.entity.interface';
import { IUsersService } from '../../domain/service/users.service.interface';
import { IUseCase } from '../../domain/use-case/use-case.interface';

export class UserRegisterUseCase
  implements IUseCase<IUserRegisterBody, IUserRegisterResponse>
{
  constructor(private readonly _usersService: IUsersService) {}

  async execute(input: IUserRegisterBody): Promise<IUserRegisterResponse> {
    try {
      return this._usersService.register(input);
    } catch (error) {
      throw error;
    }
  }
}
