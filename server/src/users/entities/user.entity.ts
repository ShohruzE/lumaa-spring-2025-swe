import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column() // hashed password
  password: string;

  //   @OneToMany(() => Task, (task) => task.userId)
  //   tasks: Task[];
}
