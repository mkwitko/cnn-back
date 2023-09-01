import { CoreService } from 'src/core/CoreService';
import { ConsentTypeModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsentTypeService extends CoreService {
  constructor(public model: ConsentTypeModel) {
    super(model);
  }
}
