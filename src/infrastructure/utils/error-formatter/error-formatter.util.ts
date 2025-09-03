import middy from '@middy/core';
import { CustomException } from '../../../domain/exceptions/custom.exception';
import { IHttpError } from './interfaces/http-error.interface';
import { HTTP_STATUS_CODE } from '../../../domain/enums/http-status-code.enum';
import { filteredErrorDetails } from './filtered-error-details.util';

export const errorFormatter = (): middy.MiddlewareObj => {
  const onError = async (request: middy.Request) => {
    const { error } = request;

    if (error instanceof CustomException) {
      request.response = {
        statusCode: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
        }),
      };

      return request.response;
    }

    const requestError = error as unknown as IHttpError;

    if (requestError.statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
      const formattedError = {
        message: 'Validation error at request',
        details: filteredErrorDetails(requestError),
      };

      request.response = {
        statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedError),
      };

      return request.response;
    }

    request.response = {
      statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Internal server error',
        details: [
          {
            message: `An unexpected error occurred: ${
              requestError.message || JSON.stringify(requestError)
            }`,
          },
        ],
      }),
    };

    return request.response;
  };

  return {
    onError,
  };
};
