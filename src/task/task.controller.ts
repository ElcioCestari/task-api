import { TaskService } from './task.service';
import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(): string[] {
    return this.taskService.getAllTasks();
  }
}
