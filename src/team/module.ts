import { Module } from '@nestjs/common';
import { TeamService } from './service';
import { TeamController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService],
})
export class TeamModule {}
