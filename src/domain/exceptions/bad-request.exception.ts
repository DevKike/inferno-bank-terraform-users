import { HTTP_STATUS_CODE } from '../enums/http-status-code.enum';
import { CustomException } from './custom.exception';

export class BadRequestException extends CustomException {
  constructor(message?: string) {
    super(HTTP_STATUS_CODE.BAD_REQUEST, message ?? 'Bad request');
  }
}
