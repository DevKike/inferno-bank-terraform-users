import { compare, hash } from 'bcryptjs';
import { environments } from '../../environments/environments.dev';

export const encrypter = {
  hash: async (data: string): Promise<string> => {
    return hash(data, environments.saltRounds);
  },

  compare: async (data: string, encrypted: string): Promise<boolean> => {
    return compare(data, encrypted);
  },
};
