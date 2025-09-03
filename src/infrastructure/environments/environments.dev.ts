export const environments = {
  awsRegion: process.env.AWS_REGION || 'us-west-1',
  usersTableName: process.env.USERS_TABLE_NAME || 'users',
  saltRounds: process.env.SALT_ROUNDS || 10,
};
