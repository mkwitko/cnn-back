import { CoreService } from 'src/core/CoreService';
import { UsersModel } from './model/model.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService extends CoreService {
  constructor(public model: UsersModel) {
    super(model);
  }
}
