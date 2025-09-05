import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import {
  IUserSave,
  IUser,
  IUserStored,
} from '../../domain/entity/users.entity.interface';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { IConfigurationProvider } from '../../domain/providers/configuration/interface/configuration.provider.interface';

export class UsersRepository implements IUsersRepository {
  private readonly _tableName: string;
  private readonly _dynamoDbClient: DynamoDBDocumentClient;

  constructor(private readonly _configurationProvider: IConfigurationProvider) {
    this._tableName = this._configurationProvider.getUsersTableName();
    this._dynamoDbClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: this._configurationProvider.getAwsRegion(),
      }),

      {
        marshallOptions: {
          convertClassInstanceToMap: true,
          removeUndefinedValues: true,
        },
      }
    );
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const command = new QueryCommand({
      TableName: this._tableName,
      IndexName: this._configurationProvider.getEmailIndexName(),
      KeyConditionExpression: `${this._configurationProvider.getEmailIndexKey()} = :email`,
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

  async findByPhone(phone: IUser['phone']): Promise<IUser | null> {
    const command = new QueryCommand({
      TableName: this._tableName,
      IndexName: this._configurationProvider.getPhoneIndexName(),
      KeyConditionExpression: `${this._configurationProvider.getPhoneIndexKey()} = :phone`,
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

  async findByDocument(document: IUser['document']): Promise<IUser | null> {
    const command = new QueryCommand({
      TableName: this._tableName,
      IndexName: this._configurationProvider.getDocumentIndexName(),
      KeyConditionExpression: `${this._configurationProvider.getDocumentIndexKey()} = :document`,
      ExpressionAttributeValues: {
        ':document': document,
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
