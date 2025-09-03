import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';

export const validateSchemaMiddleware = (schema: Record<string, any>) => {
  const inputSchema = {
    type: 'object',
    properties: {
      body: schema,
    },
  };

  return validator({
    eventSchema: transpileSchema(inputSchema),
  });
};
