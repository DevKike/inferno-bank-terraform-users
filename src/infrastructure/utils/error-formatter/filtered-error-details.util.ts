import { IHttpError } from './interfaces/http-error.interface';

export const filteredErrorDetails = (error: IHttpError) => {
  return error.cause.data.map(({ params, message }) => ({ params, message }));
};
