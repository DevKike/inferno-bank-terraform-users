import { IUserRegisterBody } from '../../domain/entity/users.entity.interface';
import { IUsersService } from '../../domain/service/users.service.interface';
import { IUseCase } from '../../domain/use-case/use-case.interface';

export class UserRegisterUseCase implements IUseCase<IUserRegisterBody, void> {
  constructor(private readonly _usersService: IUsersService) {}

  async execute(input: IUserRegisterBody): Promise<void> {
    try {
      await this._usersService.register(input);
    } catch (error) {
      throw error;
    }
  }
}
