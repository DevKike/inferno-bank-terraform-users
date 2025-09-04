import { HTTP_STATUS_CODE } from '../enums/http-status-code.enum';
import { CustomException } from './custom.exception';

export class AlreadyExistsException extends CustomException {
  constructor(message?: string) {
    super(HTTP_STATUS_CODE.CONFLICT, message ?? 'Resource already exists');
  }
}
