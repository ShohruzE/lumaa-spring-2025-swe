import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = this.taskRepository.create({ ...createTaskDto, user });
    return this.taskRepository.save(task);
  }

  async findAll(user: User) {
    return this.taskRepository.find({
      where: { user },
    });
  }

  async findOne(id: string, user: User) {
    const task = await this.taskRepository.findOne({
      where: { id, user },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {
    const result = await this.taskRepository.update(
      { id, user },
      updateTaskDto,
    );
    if (!result.affected) {
      throw new Error('Task not found');
    }
    return this.findOne(id, user);
  }

  async remove(id: string, user: User) {
    const result = await this.taskRepository.delete({ id, user });
    if (!result.affected) {
      throw new Error('Task not found');
    }
    return { message: 'Task removed successfully' };
  }
}
