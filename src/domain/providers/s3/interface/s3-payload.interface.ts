export interface IS3Payload {
  filename: string;
  mimetype: string;
  encoding: string;
  truncated?: boolean;
  content: Buffer;
}
