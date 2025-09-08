export interface ISqsPayload {
  queueUrl: string;
  data: Record<string, any>;
}
