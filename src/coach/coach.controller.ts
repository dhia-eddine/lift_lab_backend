import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './coach.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('coaches')
@UseGuards(AuthGuard)
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  @Post()
  async addCoach(@Body() createCoachDto: CreateCoachDto): Promise<Coach> {
    return this.coachService.addCoach(createCoachDto);
  }

  @Put(':id')
  async updateCoach(
    @Param('id') id: string,
    @Body() updateCoachDto: UpdateCoachDto,
  ): Promise<Coach> {
    const coachId = +id;
    return this.coachService.updateCoach(coachId, updateCoachDto);
  }

  @Get(':id')
  async displayOneCoach(@Param('id') id: string): Promise<Coach> {
    const coachId = +id;
    return this.coachService.displayOneCoach(coachId);
  }

  @Get()
  async displayAllCoaches(): Promise<Coach[]> {
    return this.coachService.displayAllCoaches();
  }
}
