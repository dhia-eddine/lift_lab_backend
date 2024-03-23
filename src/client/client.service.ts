import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/client.dto';
import { Client } from './client.entity';
import { Subscription } from './subscription.entity';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async createClint(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.subscriptions', 'subscription') // Change 'subscription' to 'subscriptions'
      .where('client.id = :id', { id })
      .getOne();
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    this.clientRepository.merge(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: number): Promise<string> {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    await this.clientRepository.remove(client);
    return `Client with ID ${id} has been successfully deleted.`;
  }

  async createSubscription(
    clientId: number,
    subscriptionData: Subscription,
  ): Promise<Subscription> {
    const client = await this.findOne(clientId);
    const subscription = this.subscriptionRepository.create({
      date: subscriptionData.date,
      fees: subscriptionData.fees,
      active: subscriptionData.active,
      client,
    });
    client.subscriptions.push(subscription);
    return this.subscriptionRepository.save(subscription);
  }

  async deleteSubscription(id: number, subscriptionId: number): Promise<void> {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    const subscription = client.subscriptions.find(
      (s) => s.id === subscriptionId,
    );

    await this.clientRepository.save(client);

    await this.subscriptionRepository.remove(subscription);
  }

  async firstDateSubscription(clientId: number): Promise<Date | null> {
    const client = await this.findOne(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    const subscriptions = client.subscriptions;
    if (subscriptions.length === 0) {
      return null; // Return null if the client has no subscriptions
    }

    // Sort subscriptions by date in ascending order
    subscriptions.sort((a, b) => a.date.getTime() - b.date.getTime());

    return subscriptions[0].date; // Return the start date of the first subscription
  }

  async totalFees(clientId: number): Promise<number> {
    const client = await this.findOne(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    return client.subscriptions.reduce(
      (total, subscription) => total + subscription.fees,
      0,
    );
  }
}
