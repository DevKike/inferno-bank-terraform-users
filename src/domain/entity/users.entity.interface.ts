import { IS3Payload } from '../providers/s3/interface/s3-payload.interface';

export interface IUser {
  uuid: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  document: string;
  address: string | null;
  phone: string | null;
  image: string | null;
}

export interface IUserSave
  extends Pick<
    IUser,
    'name' | 'lastName' | 'email' | 'password' | 'document'
  > {}

export interface IUserStored extends IUserSave {
  uuid: string;
}

export interface IUserRegisterBody extends IUserSave {}

export interface IUserLoginBody extends Pick<IUser, 'email' | 'password'> {}

export interface IUserLoginRes {
  user: Omit<IUser, 'uuid' | 'address' | 'email' | 'password' | 'document' | 'image'>;
  token: string;
}

export interface IUserUpdate
  extends Partial<Pick<IUser, 'address' | 'phone' | 'image'>> {}

export interface IUserUpdateInput extends IUserUpdate {
  id: IUser['uuid'];
}

export interface IUserUpdateRes extends Omit<IUser, 'uuid' | 'password'> {}

export interface IUserGetProfileRes extends IUserUpdateRes {}

export interface IUserUploadAvatarBody extends Pick<IUser, 'uuid'> {
  avatar: IS3Payload;
}
