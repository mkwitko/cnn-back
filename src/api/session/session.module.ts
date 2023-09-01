import { Module } from '@nestjs/common';
import { SessionModel } from './model/model.service';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [SessionController],
  providers: [SessionService, SessionModel, PrismaService],
  exports: [SessionModel, SessionService],
})
export class SessionModule {}
