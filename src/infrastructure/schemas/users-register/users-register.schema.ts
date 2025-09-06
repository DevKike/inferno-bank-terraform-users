import { outputSchema } from '../../../domain/schema/output-schema.interface';

export const usersRegisterSchema: outputSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    lastName: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
    document: { type: 'string', minLength: 10 },
  },
  required: ['name', 'lastName', 'email', 'password', 'document'],
  additionalProperties: false,
};
