import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UsersUpdateUseCase } from '../../../application/use-cases/update/users-update.use-case';
import { UsersService } from '../../service/users.service';
import { UsersRepository } from '../../repository/users.repository';
import { ConfigurationProvider } from '../../providers/configuration/configuration.provider';
import { HTTP_STATUS_CODE } from '../../../domain/enums/http-status-code.enum';
import jsonBodyParser from '@middy/http-json-body-parser';
import { validateSchemaMiddleware } from '../../middlewares/validate-schema.middleware';
import { errorFormatter } from '../../utils/error-formatter/error-formatter.util';
import httpErrorHandler from '@middy/http-error-handler';
import { usersUpdateSchema } from '../../schemas/update/users-update.schema';
import { IUserUpdate } from '../../../domain/entity/users.entity.interface';
import { SqsProvider } from '../../providers/sqs/sqs.provider';

const usersUpdateHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { userId } = event.requestContext.authorizer?.lambda;

    const updateData = event.body as unknown as IUserUpdate;

    const response = await new UsersUpdateUseCase(
      new UsersService(
        new UsersRepository(ConfigurationProvider.getInstance())
      ),
      new SqsProvider(ConfigurationProvider.getInstance()),
      ConfigurationProvider.getInstance()
    ).execute({ ...updateData, id: userId });

    return {
      statusCode: HTTP_STATUS_CODE.OK,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User updated with success!',
        data: response,
      }),
    };
  } catch (error) {
    throw error;
  }
};

export const handler = middy(usersUpdateHandler)
  .use(jsonBodyParser())
  .use(validateSchemaMiddleware(usersUpdateSchema))
  .use(errorFormatter())
  .use(httpErrorHandler());
