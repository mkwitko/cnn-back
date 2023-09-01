import { StatesService } from './states.service';
import { Controller } from '@nestjs/common';
import { CoreController } from 'src/core/CoreController';

@Controller('states')
export class StatesController extends CoreController {
  constructor(public service: StatesService) {
    super(service);
  }
}
