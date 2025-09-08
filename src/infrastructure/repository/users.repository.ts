import { IUsersRepository } from '../../domain/repository/users.repository.interface';
import {
  IUserSave,
  IUser,
  IUserStored,
  IUserUpdate,
} from '../../domain/entity/users.entity.interface';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { IConfigurationProvider } from '../../domain/providers/configuration/interface/configuration.provider.interface';
import { NotFoundException } from '../../domain/exceptions/not-found.exception';
import { BadRequestException } from '../../domain/exceptions/bad-request.exception';

export class UsersRepository implements IUsersRepository {
  private readonly _dynamoDbClient: DynamoDBDocumentClient;
  private readonly _tableName: string;
  private readonly _partitionKey!: string;

  constructor(private readonly _configurationProvider: IConfigurationProvider) {
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
    this._tableName = this._configurationProvider.getUsersTableName();
    this._partitionKey =
      this._configurationProvider.getUsersTablePartitionKey();
  }

  async findById(id: IUser['uuid']): Promise<IUser | null> {
    const command = new GetCommand({
      TableName: this._tableName,
      Key: {
        [this._partitionKey]: id,
      },
    });

    try {
      const response = await this._dynamoDbClient.send(command);

      if (!response.Item) return null;

      return response.Item as IUser;
    } catch (error) {
      throw error;
    }
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

  async save(user: IUserSave): Promise<IUser> {
    const userId: IUser['uuid'] = uuidv4();
    const storedUser: IUserStored = { uuid: userId, ...user };

    const command = new PutCommand({
      TableName: this._tableName,
      Item: storedUser,
    });

    try {
      await this._dynamoDbClient.send(command);

      return storedUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id: IUser['uuid'], userData: IUserUpdate): Promise<IUser> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = value;
      }
    });

    if (updateExpressions.length === 0)
      throw new BadRequestException('No valid fields to update');

    try {
      const command = new UpdateCommand({
        TableName: this._tableName,
        Key: { [this._partitionKey]: id },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      });

      const response = await this._dynamoDbClient.send(command);

      if (!response.Attributes)
        throw new NotFoundException(`User with id: ${id} was not found`);

      return response.Attributes as IUser;
    } catch (error) {
      throw error;
    }
  }
}
