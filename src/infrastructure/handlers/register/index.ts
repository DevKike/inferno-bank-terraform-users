import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import { validateSchemaMiddleware } from '../../middlewares/validate-schema.middleware';
import { userRegisterSchema } from '../../schemas/user-register/user-register.schema';
import { errorFormatter } from '../../utils/error-formatter/error-formatter.util';
import httpErrorHandler from '@middy/http-error-handler';
import { IUserRegisterBody } from '../../../domain/entity/users.entity.interface';
import { UserRegisterUseCase } from '../../../application/use-cases/user-register.use-case';
import { UsersService } from '../../service/users.service';
import { UsersRepository } from '../../repository/users.repository';
import { HTTP_STATUS_CODE } from '../../../domain/enums/http-status-code.enum';

const userRegisterHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userData = event.body as unknown as IUserRegisterBody;

    const response = await new UserRegisterUseCase(
      new UsersService(new UsersRepository())
    ).execute(userData);

    return {
      statusCode: HTTP_STATUS_CODE.CREATED,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User registered with success!',
        data: response,
      }),
    };
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error;
  }
};

export const handler = middy(userRegisterHandler)
  .use(jsonBodyParser())
  .use(validateSchemaMiddleware(userRegisterSchema))
  .use(errorFormatter())
  .use(httpErrorHandler());
