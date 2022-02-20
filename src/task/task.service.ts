import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.repository.find();
  }

  async getTasks(filterDto: FilterDto): Promise<Task[]> {
    return await this.repository.find(filterDto);
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { description, title } = dto;
    const task = this.repository.create({
      description,
      status: TaskStatus.OPEN,
      title,
    });
    return await this.repository.save(task);
  }

  async updateTask(
    dto: CreateTaskDto,
    id: string,
    status: TaskStatus,
  ): Promise<Task> {
    const task: Task = await this.repository.findOneOrFail({ id: id });
    this.repository.merge(task, dto);
    return await this.repository.save(task);
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.repository.findOneOrFail(id);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
