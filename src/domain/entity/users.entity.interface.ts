export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  document: string;
  address: string;
  phone: string;
  image: string;
}

export interface IUserRegister
  extends Pick<
    IUser,
    'name' | 'lastName' | 'email' | 'password' | 'document'
  > {}
