export interface ISecretsManagerProvider {
  get<T>(secretName: string): Promise<T>;
}
