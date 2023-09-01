import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { LocalCacheService } from './LocalCache';

@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
    LocalCacheService,
  ],
  exports: [AsyncLocalStorage, LocalCacheService],
})
export class LocalCacheModule {}
