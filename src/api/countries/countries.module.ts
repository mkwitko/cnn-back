import { Module } from '@nestjs/common';
import { CountriesModel } from './model/model.service';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesModel, PrismaService],
  exports: [CountriesModel, CountriesService],
})
export class CountriesModule {}
