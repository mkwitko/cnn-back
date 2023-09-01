import { CoreService } from 'src/core/CoreService';
import { ConsentModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsentService extends CoreService {
  constructor(public model: ConsentModel) {
    super(model);
  }
}
