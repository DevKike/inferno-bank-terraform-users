import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { NotFoundException } from '../../domain/exceptions/not-found.exception';

export class SecretsManagerProvider {
  private readonly _secretsManagerClient: SecretsManagerClient;

  constructor() {
    this._secretsManagerClient = new SecretsManagerClient({});
  }

  async get<T>(secretName: string): Promise<T> {
    console.log('🚀 ~ SecretsManagerProvider ~ get ~ secretName:', secretName);
    try {
      const command = new GetSecretValueCommand({
        SecretId: secretName,
      });

      const secret = await this._secretsManagerClient.send(command);

      if (!secret.SecretString)
        throw new NotFoundException(`Secret: ${secretName} not found`);

      return JSON.parse(secret.SecretString);
    } catch (error) {
      console.error('🚀 ~ SecretsManagerProvider ~ get ~ error:', error);
      throw error;
    }
  }
}
