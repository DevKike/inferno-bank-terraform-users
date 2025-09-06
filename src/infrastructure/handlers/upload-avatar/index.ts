import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { HTTP_STATUS_CODE } from '../../../domain/enums/http-status-code.enum';
import middy from '@middy/core';
import { errorFormatter } from '../../utils/error-formatter/error-formatter.util';
import httpErrorHandler from '@middy/http-error-handler';
import httpMultipartBodyParser from '@middy/http-multipart-body-parser';
import { IS3Payload } from '../../../domain/providers/s3/interface/s3-payload.interface';
import { UsersUploadAvatarUseCase } from '../../../application/use-cases/upload-avatar/users-upload-avatar.use-case';
import { S3Provider } from '../../providers/s3/s3.provider';
import { ConfigurationProvider } from '../../providers/configuration/configuration.provider';
import { UsersRepository } from '../../repository/users.repository';

const usersUploadAvatarHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { userId } = event.requestContext.authorizer?.lambda;
  const { avatar } = event.body as unknown as { avatar: IS3Payload };

  const response = await new UsersUploadAvatarUseCase(
    ConfigurationProvider.getInstance(),
    new S3Provider(ConfigurationProvider.getInstance()),
    new UsersRepository(ConfigurationProvider.getInstance())
  ).execute({
    avatar,
    uuid: userId,
  });

  try {
    return {
      statusCode: HTTP_STATUS_CODE.CREATED,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Avatar uploaded with success!',
        data: {
          url: response,
        },
      }),
    };
  } catch (error) {
    console.error('Error at uploading user', error);
    throw error;
  }
};

export const handler = middy(usersUploadAvatarHandler)
  .use(httpMultipartBodyParser())
  .use(errorFormatter())
  .use(httpErrorHandler());
