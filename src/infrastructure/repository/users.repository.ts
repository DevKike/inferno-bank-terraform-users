import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import { IUserSave, IUser } from '../../domain/entity/users.entity.interface';
import { environments } from '../environments/environments.dev';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export class UsersRepository implements IUsersRepository {
  private readonly _tableName: string;
  private readonly _dynamoDbClient: DynamoDBDocumentClient;

  constructor() {
    this._tableName = environments.usersTableName;
    this._dynamoDbClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({ region: environments.awsRegion }),
      {
        marshallOptions: {
          convertClassInstanceToMap: true,
          removeUndefinedValues: true,
        },
      }
    );
  }

  async save(user: IUserSave): Promise<IUser> {
    const userId: IUser['uuid'] = uuidv4();
    const item: IUser = { uuid: userId, ...user };

    const command = new PutCommand({
      TableName: this._tableName,
      Item: item,
    });

    try {
      const response = await this._dynamoDbClient.send(command);
      console.log('🚀 ~ UsersRepository ~ save ~ response:', response);

      return item;
    } catch (error) {
      console.error('Error at Dynamo service', error);
      throw error;
    }
  }
}
