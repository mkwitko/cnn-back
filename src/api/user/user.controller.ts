import { UsersService } from './user.service';
import { Controller } from '@nestjs/common';
import { CoreController } from 'src/core/CoreController';

@Controller('users')
export class UsersController extends CoreController {
  constructor(public service: UsersService) {
    super(service);
  }
}
