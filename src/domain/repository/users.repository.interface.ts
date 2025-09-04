import { IUser, IUserSave } from '../entity/users.entity.interface';

export interface IUsersRepository {
  findByEmail(email: IUser['email']): Promise<IUser | null>;
  save(user: IUserSave): Promise<void>;
}
