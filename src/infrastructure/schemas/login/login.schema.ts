import { outputSchema } from '../../../domain/schema/output-schema.interface';

export const usersLoginSchema: outputSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};
