export interface IConfigurationProvider {
  getAwsRegion(): string;
  getUsersTableName(): string;
  getUsersTablePartitionKey(): string;
  getSecretsManagerName(): string;
  getEmailIndexName(): string;
  getEmailIndexKey(): string;
  getPhoneIndexName(): string;
  getPhoneIndexKey(): string;
  getDocumentIndexName(): string;
  getDocumentIndexKey(): string;
  getJwtSecretKey(): string;
  getJwtTokenExpiration(): number;
}
