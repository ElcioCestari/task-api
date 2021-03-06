import { GetUser } from './../auth/get-user.decorator';
import { User } from './../auth/user.entity';
import { FilterDto } from './dto/filter.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskStatus } from './task-status';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { identity } from 'rxjs';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(@Query() filterDto: FilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasks(filterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.createTask(dto, user);
  }

  @Put('/:id/:status')
  uptadeTask(
    @Body() dto: UpdateTaskDto,
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTask(dto, id, status);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
