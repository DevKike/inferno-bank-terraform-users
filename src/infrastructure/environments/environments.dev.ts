export const environments = {
  awsRegion: process.env.awsRegion,
  usersTableName: process.env.tableName,
  usersTablePartitionKey: process.env.tablePartitionKey,
  usersSecretsManagerName: process.env.secretsManagerName,
  emailIndexName: process.env.emailIndexName,
  emailIndexKey: process.env.emailIndexKey,
  phoneIndexName: process.env.phoneIndexName,
  phoneIndexKey: process.env.phoneIndexKey,
  documentIndexName: process.env.documentIndexName,
  documentIndexKey: process.env.documentIndexKey,
  jwtSecretKey: process.env.jwtSecretKey,
  jwtTokenExpiration: Number(process.env.jwtTokenExpiration),
};
