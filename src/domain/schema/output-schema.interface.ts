export interface outputSchema {
  type: 'object';
  properties: Record<string, any>;
  required?: Array<string>;
  additionalProperties?: boolean;
}
