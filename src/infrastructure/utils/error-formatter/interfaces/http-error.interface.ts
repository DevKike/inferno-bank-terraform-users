export interface IHttpError extends Error {
  message: string;
  statusCode: number;
  cause: {
    data: [];
  };
}
