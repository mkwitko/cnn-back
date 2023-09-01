import { CountriesService } from './countries.service';
import { Controller } from '@nestjs/common';
import { CoreController } from 'src/core/CoreController';

@Controller('countries')
export class CountriesController extends CoreController {
  constructor(public service: CountriesService) {
    super(service);
  }
}
