import { CoreService } from 'src/core/CoreService';
import { SessionModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService extends CoreService {
  constructor(public model: SessionModel) {
    super(model);
  }
}
