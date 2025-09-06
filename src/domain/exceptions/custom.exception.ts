import { HTTP_STATUS_CODE } from '../enums/http-status-code.enum';

export abstract class CustomException extends Error {
  statusCode: HTTP_STATUS_CODE;

  constructor(statusCode: number, message?: string) {
    super(message ?? 'Error');
    this.statusCode = statusCode;
  }
}
