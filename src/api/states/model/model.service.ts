import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CoreModel } from 'src/core/CoreModel';

@Injectable()
export class StatesModel extends CoreModel {
  override table = 'states';
  override numberFields = ['id', 'countryId'];
  constructor(protected db: PrismaService) {
    super(db);
  }
}
