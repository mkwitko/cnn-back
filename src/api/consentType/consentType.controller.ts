import { ConsentTypeService } from './consentType.service';
import { Controller } from '@nestjs/common';
import { CoreController } from 'src/core/CoreController';

@Controller('consentType')
export class ConsentTypeController extends CoreController {
  constructor(public service: ConsentTypeService) {
    super(service);
  }
}
