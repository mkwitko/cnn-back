import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ConsentTypeController } from './consentType.controller';
import { ConsentTypeService } from './consentType.service';
import { ConsentTypeModel } from './model/model.service';

@Module({
  imports: [],
  controllers: [ConsentTypeController],
  providers: [ConsentTypeService, ConsentTypeModel, PrismaService],
  exports: [ConsentTypeModel, ConsentTypeService],
})
export class ConsentTypeModule {}
