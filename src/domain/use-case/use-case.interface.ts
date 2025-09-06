export interface IUseCase<T, K> {
  execute(input: T): Promise<K>;
}
