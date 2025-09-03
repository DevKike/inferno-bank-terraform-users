import {
  IUserRegisterResponse,
  IUserRegisterBody,
} from '../../domain/entity/users.entity.interface';
import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import { IUsersService } from '../../domain/service/users.service.interface';

export class UsersService implements IUsersService {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async register(user: IUserRegisterBody): Promise<IUserRegisterResponse> {
    try {
      const newUser = await this._usersRepository.save({
        ...user,
        address: null,
        phone: null,
        image: null,
      });

      const {
        uuid,
        password,
        document,
        address,
        phone,
        image,
        ...userResponse
      } = newUser;

      return userResponse;
    } catch (error) {
      throw error;
    }
  }
}
