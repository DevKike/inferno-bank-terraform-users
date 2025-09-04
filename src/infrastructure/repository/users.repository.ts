import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import {
  IUserSave,
  IUser,
  IUserStored,
} from '../../domain/entity/users.entity.interface';
import { environments } from '../environments/environments.dev';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export class UsersRepository implements IUsersRepository {
  private readonly _tableName: string;
  private readonly _dynamoDbClient: DynamoDBDocumentClient;

  constructor() {
    this._tableName = environments.usersTableName!;
    this._dynamoDbClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({ region: environments.awsRegion! }),

      {
        marshallOptions: {
          convertClassInstanceToMap: true,
          removeUndefinedValues: true,
        },
      }
    );
  }

  async findByPhone(phone: IUser['phone']): Promise<IUser | null> {
    const command = new QueryCommand({
      TableName: this._tableName,
      IndexName: environments.phoneIndexName,
      KeyConditionExpression: `${environments.phoneIndexKey} = :phone`,
      ExpressionAttributeValues: {
        ':phone': phone,
      },
    });

    try {
      const response = await this._dynamoDbClient.send(command);

      if (!response.Items || response.Items.length === 0) return null;

      return response.Items[0] as IUser;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const command = new QueryCommand({
      TableName: this._tableName,
      IndexName: environments.emailIndexName,
      KeyConditionExpression: `${environments.emailIndexKey} = :email`,
      ExpressionAttributeValues: {
        ':email': email,
      },
    });

    try {
      const response = await this._dynamoDbClient.send(command);

      if (!response.Items || response.Items.length === 0) return null;

      return response.Items[0] as IUser;
    } catch (error) {
      throw error;
    }
  }

  async save(user: IUserSave): Promise<void> {
    const userId: IUser['uuid'] = uuidv4();
    const storedUser: IUserStored = { uuid: userId, ...user };

    const command = new PutCommand({
      TableName: this._tableName,
      Item: storedUser,
    });

    try {
      await this._dynamoDbClient.send(command);
    } catch (error) {
      throw error;
    }
  }
}
