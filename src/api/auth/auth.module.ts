import { SessionSerializer } from './Passport/Session/session.serializer';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './Passport/Strategy/local-strategy';
import { EncryptModule } from 'src/services/Encrypt/encrypt.module';
import { PrismaService } from 'prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    EncryptModule,
    UsersModule,
    SessionModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
