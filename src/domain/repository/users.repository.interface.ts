import {
  IUser,
  IUserSave,
  IUserUpdate,
} from '../entity/users.entity.interface';

export interface IUsersRepository {
  findByEmail(email: IUser['email']): Promise<IUser | null>;
  findByPhone(phone: IUser['phone']): Promise<IUser | null>;
  findByDocument(document: IUser['document']): Promise<IUser | null>;
  save(user: IUserSave): Promise<void>;
  update(id: IUser['uuid'], userData: IUserUpdate): Promise<IUser>;
}
