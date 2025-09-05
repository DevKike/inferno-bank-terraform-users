import { IUser, IUserSave } from '../entity/users.entity.interface';

export interface IUsersRepository {
  findByEmail(email: IUser['email']): Promise<IUser | null>;
  findByPhone(phone: IUser['phone']): Promise<IUser | null>;
  findByDocument(document: IUser['document']): Promise<IUser | null>;
  save(user: IUserSave): Promise<void>;
}
