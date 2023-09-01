import { LocalCacheService } from './../../services/LocalCache/LocalCache';
import { ConsentService } from './consent.service';
import { Controller } from '@nestjs/common';
import { CoreController } from 'src/core/CoreController';

@Controller('consent')
export class ConsentController extends CoreController {
  constructor(
    public service: ConsentService,
    private localCache: LocalCacheService,
  ) {
    super(service);
  }

  override async where() {
    const user = await this.localCache.get('user');
    console.log(user);
    return {
      userId: user[0].id,
    };
  }

  override include() {
    return {
      include: {
        consentType: true,
      },
    };
  }
}
