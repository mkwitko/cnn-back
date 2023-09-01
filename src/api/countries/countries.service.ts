import { CoreService } from 'src/core/CoreService';
import { CountriesModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService extends CoreService {
  constructor(public model: CountriesModel) {
    super(model);
  }
}
