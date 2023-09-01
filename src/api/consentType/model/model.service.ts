import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CoreModel } from 'src/core/CoreModel';

@Injectable()
export class ConsentTypeModel extends CoreModel {
  override table = 'consent_types';
  override numberFields = ['id'];
  constructor(protected db: PrismaService) {
    super(db);
  }
}
