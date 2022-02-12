import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  getAllTasks(): Task[] {
    return this.repository.getAllTasks();
  }

  getTasks(filterDto: FilterDto): Task[] {
    return this.repository.getTasks(filterDto);
  }

  createTask(dto: CreateTaskDto): Task {
    return this.repository.createTask(dto);
  }

  updateTask(dto: CreateTaskDto, id: string, status: TaskStatus): Task {
    return this.repository.updateTask(dto, id, status);
  }

  getTaskById(id: string): Task {
    return this.repository.getTaskById(id);
  }

  delete(id: string): void {
    this.repository.delete(id);
  }
}
