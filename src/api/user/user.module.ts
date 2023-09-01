import { Module } from '@nestjs/common';
import { UsersModel } from './model/model.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersModel, PrismaService],
  exports: [UsersModel, UsersService],
})
export class UsersModule {}
