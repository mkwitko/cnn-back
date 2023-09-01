import { Module } from '@nestjs/common';
import { ConsentModel } from './model/model.service';
import { ConsentController } from './consent.controller';
import { ConsentService } from './consent.service';
import { PrismaService } from 'prisma/prisma.service';
import { LocalCacheModule } from 'src/services/LocalCache/LocalCache.module';

@Module({
  imports: [LocalCacheModule],
  controllers: [ConsentController],
  providers: [ConsentService, ConsentModel, PrismaService],
  exports: [ConsentModel, ConsentService],
})
export class ConsentModule {}
