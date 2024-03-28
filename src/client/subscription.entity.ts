import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  fees: number;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Client, (client) => client.subscriptions)
  client: Client;
}
