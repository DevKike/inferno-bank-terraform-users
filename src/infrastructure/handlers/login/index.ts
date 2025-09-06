import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IUserLoginBody } from '../../../domain/entity/users.entity.interface';
import { HTTP_STATUS_CODE } from '../../../domain/enums/http-status-code.enum';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { validateSchemaMiddleware } from '../../middlewares/validate-schema.middleware';
import { usersLoginSchema } from '../../schemas/login/login.schema';
import { UsersLoginUseCase } from '../../../application/use-cases/login/users-login.use-case';
import { UsersService } from '../../service/users.service';
import { HashProvider } from '../../providers/hash/hash.provider';
import { UsersRepository } from '../../repository/users.repository';
import { ConfigurationProvider } from '../../providers/configuration/configuration.provider';
import { JwtProvider } from '../../providers/jwt/jwt.provider';
import { errorFormatter } from '../../utils/error-formatter/error-formatter.util';

const loginHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userData = event.body as unknown as IUserLoginBody;

    const configurationInstance = ConfigurationProvider.getInstance();

    const response = await new UsersLoginUseCase(
      new UsersService(new UsersRepository(configurationInstance)),
      new HashProvider(),
      new JwtProvider(configurationInstance)
    ).execute(userData);

    return {
      statusCode: HTTP_STATUS_CODE.OK,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User logged in with success!',
        data: response,
      }),
    };
  } catch (error) {
    console.error('Error logging user: ', error);
    throw error;
  }
};

export const handler = middy(loginHandler)
  .use(jsonBodyParser())
  .use(validateSchemaMiddleware(usersLoginSchema))
  .use(errorFormatter())
  .use(httpErrorHandler());
