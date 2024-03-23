import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subscription } from './subscription.entity'; // Import Subscription entity

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  picture: string;

  @OneToMany(() => Subscription, (subscription) => subscription.client)
  subscriptions: Subscription[];
}
