import { Module } from '@nestjs/common';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';
import { Coach } from './coach.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  controllers: [CoachController],
  providers: [CoachService],
})
export class CoachModule {}
