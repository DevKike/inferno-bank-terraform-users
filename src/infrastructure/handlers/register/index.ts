import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import { validateSchemaMiddleware } from '../../middlewares/validate-schema.middleware';
import { usersRegisterSchema } from '../../schemas/users-register/users-register.schema';
import { errorFormatter } from '../../utils/error-formatter/error-formatter.util';
import httpErrorHandler from '@middy/http-error-handler';
import { IUserRegisterBody } from '../../../domain/entity/users.entity.interface';
import { UserRegisterUseCase } from '../../../application/use-cases/register/user-register.use-case';
import { UsersService } from '../../service/users.service';
import { UsersRepository } from '../../repository/users.repository';
import { HTTP_STATUS_CODE } from '../../../domain/enums/http-status-code.enum';
import { SecretsManagerProvider } from '../../providers/secrets-manager/secrets-manager.provider';
import { HashProvider } from '../../providers/hash/hash.provider';
import { ConfigurationProvider } from '../../providers/configuration/configuration.provider';
import { SqsProvider } from '../../providers/sqs/sqs.provider';

const userRegisterHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userData = event.body as unknown as IUserRegisterBody;

    await new UserRegisterUseCase(
      new UsersService(
        new UsersRepository(ConfigurationProvider.getInstance())
      ),
      new SecretsManagerProvider(),
      new HashProvider(),
      new SqsProvider(ConfigurationProvider.getInstance()),
      ConfigurationProvider.getInstance()
    ).execute(userData);

    return {
      statusCode: HTTP_STATUS_CODE.CREATED,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User registered with success!',
      }),
    };
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error;
  }
};

export const handler = middy(userRegisterHandler)
  .use(jsonBodyParser())
  .use(validateSchemaMiddleware(usersRegisterSchema))
  .use(errorFormatter())
  .use(httpErrorHandler());
