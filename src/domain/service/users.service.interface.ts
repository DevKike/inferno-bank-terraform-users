import {
  IUserRegisterBody,
  IUserRegisterResponse,
} from '../entity/users.entity.interface';

export interface IUsersService {
  register(user: IUserRegisterBody): Promise<IUserRegisterResponse>;
}
