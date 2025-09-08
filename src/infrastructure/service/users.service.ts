import {
  IUser,
  IUserRegisterBody,
  IUserUpdate,
  IUserUpdateRes,
} from '../../domain/entity/users.entity.interface';
import { AlreadyExistsException } from '../../domain/exceptions/already-exists.exception';
import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import { IUsersService } from '../../domain/service/users.service.interface';

export class UsersService implements IUsersService {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async getById(id: IUser['uuid']): Promise<IUser | null> {
    try {
      return this._usersRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

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

  async create(user: IUserRegisterBody): Promise<IUser> {
    try {
      return this._usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: IUser['uuid'],
    userData: IUserUpdate
  ): Promise<IUserUpdateRes> {
    try {
      if (userData.phone) {
        const existingUserByPhone = await this._usersRepository.findByPhone(
          userData.phone
        );
        if (existingUserByPhone)
          throw new AlreadyExistsException('Phone already exists');
      }

      const updatedUser = await this._usersRepository.update(id, userData);

      const { uuid, password, ...updatedData } = updatedUser;

      return updatedData;
    } catch (error) {
      throw error;
    }
  }
}
