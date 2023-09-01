import { AsyncLocalStorage } from 'node:async_hooks';
import { Injectable } from '@nestjs/common';

export const storage = new AsyncLocalStorage();
@Injectable()
export class LocalCacheService {
  async get(key?: string) {
    return key ? await storage.getStore()[key] : await storage.getStore();
  }

  async set(key, value) {
    const store = {};
    if (await storage.getStore())
      Object.keys(storage.getStore()).forEach((key) => {
        store[key] = storage.getStore()[key];
      });
    store[key] = value;
    return storage.run(store, () => {
      return store;
    });
  }
}
