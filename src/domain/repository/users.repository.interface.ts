import { IUser, IUserSave } from '../entity/users.entity.interface';

export interface IUsersRepository {
  save(user: IUserSave): Promise<IUser>;
}
