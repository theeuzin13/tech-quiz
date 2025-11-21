import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.entity';

@Entity('users')
export class UserEntity extends BaseModel {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;
}
