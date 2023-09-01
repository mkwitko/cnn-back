import { SessionService } from './session.service';
import { Controller } from '@nestjs/common';
import { CoreController } from 'src/core/CoreController';

@Controller('session')
export class SessionController extends CoreController {
  constructor(public service: SessionService) {
    super(service);
  }
}
