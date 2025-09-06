import { IUser } from '../../../entity/users.entity.interface';

export interface IJwtPayload {
  id: IUser['uuid'];
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
