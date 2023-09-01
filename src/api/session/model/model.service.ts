import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CoreModel } from 'src/core/CoreModel';

@Injectable()
export class SessionModel extends CoreModel {
  override table = 'user_session';
  override numberFields = ['id'];
  constructor(protected db: PrismaService) {
    super(db);
  }
}
