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
  user: Omit<IUser, 'uuid' | 'email' | 'password' | 'document'>;
  token: string;
}
