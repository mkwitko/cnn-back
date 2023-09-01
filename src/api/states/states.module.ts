import { Module } from '@nestjs/common';
import { StatesModel } from './model/model.service';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [StatesController],
  providers: [StatesService, StatesModel, PrismaService],
  exports: [StatesModel, StatesService],
})
export class StatesModule {}
