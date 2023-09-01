import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CoreModel } from 'src/core/CoreModel';

@Injectable()
export class CountriesModel extends CoreModel {
  override table = 'country';
  override numberFields = ['id'];
  constructor(protected db: PrismaService) {
    super(db);
  }
}
