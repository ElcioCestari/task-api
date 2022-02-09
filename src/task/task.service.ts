import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasks(filterDto: FilterDto): Task[] {
    return this.tasks.filter(
      (task) =>
        task.description === filterDto.description ||
        task.status === filterDto.status ||
        task.title === filterDto.title,
    );
  }

  createTask(dto: CreateTaskDto): Task {
    const { description, title } = dto;
    const task: Task = {
      id: uuid(),
      description,
      title,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(dto: CreateTaskDto, id: string, status: TaskStatus): Task {
    const { description, title } = dto;
    const task: Task = this.getTaskById(id);
    task.description = description;
    task.title = title;
    task.status = status;
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
