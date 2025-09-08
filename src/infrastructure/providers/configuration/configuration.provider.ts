import { IConfigurationProvider } from '../../../domain/providers/configuration/interface/configuration.provider.interface';
import { environments } from '../../environments/environments.dev';

export class ConfigurationProvider implements IConfigurationProvider {
  private static _instance: ConfigurationProvider;

  private constructor() {}

  public static getInstance(): ConfigurationProvider {
    if (!ConfigurationProvider._instance)
      ConfigurationProvider._instance = new ConfigurationProvider();

    return ConfigurationProvider._instance;
  }

  getAwsRegion(): string {
    return environments.awsRegion!;
  }

  getUsersTableName(): string {
    return environments.usersTableName!;
  }

  getUsersTablePartitionKey(): string {
    return environments.usersTablePartitionKey!;
  }

  getSecretsManagerName(): string {
    return environments.usersSecretsManagerName!;
  }

  getEmailIndexKey(): string {
    return environments.emailIndexKey!;
  }

  getEmailIndexName(): string {
    return environments.emailIndexName!;
  }

  getPhoneIndexKey(): string {
    return environments.phoneIndexKey!;
  }

  getPhoneIndexName(): string {
    return environments.phoneIndexName!;
  }

  getDocumentIndexName(): string {
    return environments.documentIndexName!;
  }

  getDocumentIndexKey(): string {
    return environments.documentIndexKey!;
  }

  getJwtSecretKey(): string {
    return environments.jwtSecretKey!;
  }

  getJwtTokenExpiration(): number {
    return environments.jwtTokenExpiration;
  }

  getS3BucketName(): string {
    return environments.bucketName!;
  }

  getS3SignedUrlExpiration(): number {
    return environments.signedUrlExpiration!;
  }

  getUsersCreatedQueueUrl(): string {
    return environments.usersCreatedQueueUrl!;
  }

  notificationsQueueUrl(): string {
    return environments.notificationsQueueUrl!;
  }
}
