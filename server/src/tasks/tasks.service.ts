import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: string) {
    return this.taskRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: string) {
    return this.taskRepository.delete(id);
  }
}
