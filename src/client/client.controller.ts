import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './client.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Subscription } from './subscription.entity';

@Controller('clients')
@UseGuards(AuthGuard) // Apply the AuthGuard to all routes in this controller
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.createClint(createClientDto);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException(`Invalid id: ${id}`);
    }

    const client = await this.clientService.findOne(parsedId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.clientService.remove(+id);
  }

  @Post('subscriptions/:clientId')
  async createSubscription(
    @Param('clientId') clientId: string,
    @Body() subscriptionData: Subscription, // Use the Subscription entity type for the request body
  ): Promise<Subscription> {
    return this.clientService.createSubscription(+clientId, subscriptionData);
  }

  @Delete('subscriptions/:clientId/:subscriptionId')
  async deleteSubscription(
    @Param('clientId') id: string,
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<void> {
    const clientId = +id;
    const subId = +subscriptionId;

    const client = await this.clientService.findOne(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    const subscription = client.subscriptions.find((s) => s.id === subId);
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${subId} not found`);
    }

    await this.clientService.deleteSubscription(clientId, subId);
  }

  @Get('first-subscription-date/:id')
  async firstDateSubscription(@Param('id') id: string): Promise<Date | null> {
    const clientId = +id;

    try {
      const startDate =
        await this.clientService.firstDateSubscription(clientId);
      if (!startDate) {
        throw new NotFoundException(
          `No subscriptions found for client with ID ${clientId}`,
        );
      }
      return startDate;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('total-fees/:id')
  async totalFees(@Param('id') id: string): Promise<number> {
    const clientId = +id;

    try {
      const totalFees = await this.clientService.totalFees(clientId);
      return totalFees;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
