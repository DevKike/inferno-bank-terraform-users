import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { IS3Provider } from '../../../domain/providers/s3/interface/s3.provider.interface';
import { IConfigurationProvider } from '../../../domain/providers/configuration/interface/configuration.provider.interface';
import { IS3Payload } from '../../../domain/providers/s3/interface/s3-payload.interface';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3Provider implements IS3Provider {
  private readonly _s3Client: S3Client;

  constructor(private readonly _configurationProvider: IConfigurationProvider) {
    this._s3Client = new S3Client({
      region: this._configurationProvider.getAwsRegion(),
    });
  }

  async upload(bucketName: string, payload: IS3Payload): Promise<void> {
    try {
      const params = new PutObjectCommand({
        Bucket: bucketName,
        Key: this.generateUniqueKey(payload.filename),
        Body: payload.content,
        ContentEncoding: 'base64',
        ContentType: payload.mimetype,
      });

      await this._s3Client.send(params);
    } catch (error) {
      throw error;
    }
  }

  async getUrl(bucketName: string, key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({ Bucket: bucketName, Key: key });

      return getSignedUrl(this._s3Client, command, {
        expiresIn: this._configurationProvider.getS3SignedUrlExpiration(),
      });
    } catch (error) {
      throw error;
    }
  }

  private generateUniqueKey(key: string): string {
    return key;
  }
}
