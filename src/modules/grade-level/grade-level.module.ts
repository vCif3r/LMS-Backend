import { Module } from '@nestjs/common';
import { GradeLevelService } from './grade-level.service';
import { GradeLevelController } from './grade-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeLevel } from './entities/grade-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeLevel])],
  controllers: [GradeLevelController],
  providers: [GradeLevelService],
})
export class GradeLevelModule {}
