import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CoreModel } from 'src/core/CoreModel';

@Injectable()
export class ConsentModel extends CoreModel {
  override table = 'consent';
  override numberFields = ['id', 'value'];
  constructor(protected db: PrismaService) {
    super(db);
  }
}
