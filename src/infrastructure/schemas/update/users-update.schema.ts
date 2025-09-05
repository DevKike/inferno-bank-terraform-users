import { outputSchema } from '../../../domain/schema/output-schema.interface';

export const usersUpdateSchema: outputSchema = {
  type: 'object',
  properties: {
    address: { type: 'string', minLength: 8 },
    phone: { type: 'string', minLength: 10 },
  },
  additionalProperties: false,
};
