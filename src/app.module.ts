import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LocalCacheModule } from './services/LocalCache/LocalCache.module';
import { HttpModule } from '@nestjs/axios';
import { EncryptModule } from './services/Encrypt/encrypt.module';
import { PrismaService } from 'prisma/prisma.service';
import { StatesModule } from './api/states/states.module';
import { AuthModule } from './api/auth/auth.module';
import { CountriesModule } from './api/countries/countries.module';
import { UsersModule } from './api/user/user.module';
import { SessionModule } from './api/session/session.module';
import { ConsentModule } from './api/consent/consent.module';
import { ConsentTypeModule } from './api/consentType/consentType.module';
import { storage } from './services/LocalCache/LocalCache';
import { UsersService } from './api/user/user.service';

@Module({
  imports: [
    LocalCacheModule,
    HttpModule,
    AuthModule,
    EncryptModule,
    StatesModule,
    CountriesModule,
    UsersModule,
    ConsentModule,
    ConsentTypeModule,
    SessionModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {
  constructor(private user: UsersService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(async (req, res, next) => {
        const id = +req.headers.userid;
        const user = id
          ? await this.user.get({
              where: {
                id,
              },
            })
          : null;
        const store = {
          user,
        };
        storage.run(store, () => next());
      })
      .exclude({ path: '/auth/login', method: RequestMethod.ALL })
      .exclude({ path: '/auth/register', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
