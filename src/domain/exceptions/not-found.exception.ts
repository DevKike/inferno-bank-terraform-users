import { HTTP_STATUS_CODE } from '../enums/http-status-code.enum';
import { CustomException } from './custom.exception';

export class NotFoundException extends CustomException {
  constructor(message?: string) {
    super(HTTP_STATUS_CODE.NOT_FOUND, message ?? 'Resource not found');
  }
}
