import {
  IUser,
  IUserRegisterBody,
} from '../../domain/entity/users.entity.interface';
import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import { IUsersService } from '../../domain/service/users.service.interface';

export class UsersService implements IUsersService {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async getByEmail(email: IUser['email']): Promise<IUser | null> {
    try {
      return this._usersRepository.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async getByPhone(phone: IUser['phone']): Promise<IUser | null> {
    try {
      return await this._usersRepository.findByPhone(phone);
    } catch (error) {
      throw error;
    }
  }

  async getByDocument(document: IUser['document']): Promise<IUser | null> {
    try {
      return this._usersRepository.findByDocument(document);
    } catch (error) {
      throw error;
    }
  }

  async create(user: IUserRegisterBody): Promise<void> {
    try {
      await this._usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }
}
