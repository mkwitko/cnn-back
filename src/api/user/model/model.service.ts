import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CoreModel } from 'src/core/CoreModel';

@Injectable()
export class UsersModel extends CoreModel {
  override table = 'users';
  override numberFields = ['id'];
  constructor(protected db: PrismaService) {
    super(db);
  }
}
