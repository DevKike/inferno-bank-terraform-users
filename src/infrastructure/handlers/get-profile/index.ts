import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UsersGetProfile } from '../../../application/use-cases/get-profile/users-get-profile.use-case';
import { UsersService } from '../../service/users.service';
import { UsersRepository } from '../../repository/users.repository';
import { ConfigurationProvider } from '../../providers/configuration/configuration.provider';
import { HTTP_STATUS_CODE } from '../../../domain/enums/http-status-code.enum';
import { errorFormatter } from '../../utils/error-formatter/error-formatter.util';
import httpErrorHandler from '@middy/http-error-handler';

const usersGetProfileHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { userId } = event.requestContext.authorizer?.lambda;

    const response = await new UsersGetProfile(
      new UsersService(new UsersRepository(ConfigurationProvider.getInstance()))
    ).execute(userId);

    return {
      statusCode: HTTP_STATUS_CODE.OK,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User data retrieved successfully!',
        data: response,
      }),
    };
  } catch (error) {
    throw error;
  }
};

export const handler = middy(usersGetProfileHandler)
  .use(errorFormatter())
  .use(httpErrorHandler());
