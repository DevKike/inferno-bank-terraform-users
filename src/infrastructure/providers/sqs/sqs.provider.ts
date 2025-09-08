import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { ISqsProvider } from '../../../domain/providers/sqs/interface/sqs.provider.interface';
import { IConfigurationProvider } from '../../../domain/providers/configuration/interface/configuration.provider.interface';
import { ISqsPayload } from '../../../domain/providers/sqs/interface/sqs-payload.interface';

export class SqsProvider implements ISqsProvider {
  private readonly _sqsProvider: SQSClient;

  constructor(private readonly _configurationProvider: IConfigurationProvider) {
    this._sqsProvider = new SQSClient({
      region: this._configurationProvider.getAwsRegion(),
    });
  }

  async send(payload: ISqsPayload): Promise<void> {
    try {
      const command = new SendMessageCommand({
        QueueUrl: payload.queueUrl,
        MessageBody: JSON.stringify(payload.data),
      });

      await this._sqsProvider.send(command);
    } catch (error) {
      console.error('🚀 ~ SqsProvider ~ send ~ error:', error);
      throw error;
    }
  }
}
