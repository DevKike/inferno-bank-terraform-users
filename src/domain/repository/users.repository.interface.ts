import { IUser, IUserSave } from '../entity/users.entity.interface';

export interface IUsersRepository {
  findByPhone(phone: IUser['phone']): Promise<IUser | null>;
  findByEmail(email: IUser['email']): Promise<IUser | null>;
  save(user: IUserSave): Promise<void>;
}
