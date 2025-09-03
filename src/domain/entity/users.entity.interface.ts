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

export interface IUserSave extends Omit<IUser, 'uuid'> {}

export interface IUserRegisterBody
  extends Pick<
    IUser,
    'name' | 'lastName' | 'email' | 'password' | 'document'
  > {}

export interface IUserRegisterResponse
  extends Omit<
    IUser,
    'uuid' | 'password' | 'document' | 'address' | 'phone' | 'image'
  > {}
