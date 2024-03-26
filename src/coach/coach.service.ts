import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoachDto } from './dto/coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './coach.entity';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(Coach)
    private readonly coachRepository: Repository<Coach>,
  ) {}

  async addCoach(createCoachDto: CreateCoachDto): Promise<Coach> {
    const coach = this.coachRepository.create(createCoachDto);
    return this.coachRepository.save(coach);
  }

  async updateCoach(
    id: number,
    updateCoachDto: UpdateCoachDto,
  ): Promise<Coach> {
    const coach = await this.coachRepository.findOne({ where: { id } });
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    Object.assign(coach, updateCoachDto);
    return this.coachRepository.save(coach);
  }

  async displayOneCoach(id: number): Promise<Coach> {
    const coach = await this.coachRepository.findOne({ where: { id } });
    if (!coach) {
      throw new NotFoundException(`Coach with ID ${id} not found`);
    }
    return coach;
  }

  async displayAllCoaches(): Promise<Coach[]> {
    return this.coachRepository.find();
  }
}
