import { IS3Payload } from './s3-payload.interface';

export interface IS3Provider {
  upload(bucketName: string, payload: IS3Payload): Promise<void>;
  getUrl(bucketName: string, key: string): Promise<string>;
}
