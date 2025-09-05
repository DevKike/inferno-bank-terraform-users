import { IUser, IUserRegisterBody } from '../entity/users.entity.interface';

export interface IUsersService {
  getByEmail(email: IUser['email']): Promise<IUser | null>;
  getByPhone(phone: IUser['phone']): Promise<IUser | null>;
  getByDocument(document: IUser['document']): Promise<IUser | null>;
  create(user: IUserRegisterBody): Promise<void>;
}
