import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  tasks: string[] = ['work', 'clean', 'cook', 'study'];

  getAllTasks(): string[] {
    return this.tasks;
  }
}
