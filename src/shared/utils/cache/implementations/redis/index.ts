import Redis, { Redis as RedisClient } from 'ioredis'

import ICache from '@shared/utils/cache/models/cache.interface'
import RedisConfig from '@config/redis.config'

class RedisCache implements ICache {
  private client: RedisClient

  constructor() {
    this.client = new Redis(RedisConfig)
  }

  public async save(key: string, value: unknown): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  public async recover<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key)

    if (value) {
      return JSON.parse(value)
    }

    return null
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidadePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)

    const pipeline = this.client.pipeline()

    keys.forEach((key) => {
      pipeline.del(key)
    })

    await pipeline.exec()
  }
}

export default RedisCache
