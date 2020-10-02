interface ICache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(key: string, value: any): Promise<void>
  recover<T>(key: string): Promise<T | null>
  invalidate(key: string): Promise<void>
  invalidadePrefix(prefix: string): Promise<void>
}

export default ICache
