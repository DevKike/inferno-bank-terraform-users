import { ISqsPayload } from './sqs-payload.interface';

export interface ISqsProvider {
  send(payload: ISqsPayload): Promise<void>;
}
