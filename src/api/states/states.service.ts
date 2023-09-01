import { CoreService } from 'src/core/CoreService';
import { StatesModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatesService extends CoreService {
  constructor(public model: StatesModel) {
    super(model);
  }
}
