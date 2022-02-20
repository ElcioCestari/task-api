import { TaskStatus } from './task-status';
import { FilterDto } from './dto/filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { Test, TestingModule } from '@nestjs/testing';
import { notContains } from 'class-validator';

const tasksFakes: Task[] = [];
const task1 = new Task();
const task2 = new Task();
tasksFakes.push(task1);
tasksFakes.push(task2);

describe('TaskService', () => {
  let service: TaskService;
  const repositoryMock = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetAllTasks', () => {
    it('should be ruturn all tasks', async () => {
      repositoryMock.find.mockResolvedValue(tasksFakes);
      const result = await service.getAllTasks();
      expect(result).toHaveLength(2);
      expect(result).toEqual(tasksFakes);
    });
  });

  describe('getTasks', () => {
    it('should be return all tasks', async () => {
      repositoryMock.find.mockResolvedValue(tasksFakes);
      const filter: FilterDto = new FilterDto();
      const result = await service.getTasks(filter);
      expect(result).toHaveLength(tasksFakes.length);
      expect(result).toEqual(tasksFakes);
    });
  });

  describe('createTask', () => {
    it('should be create a task', async () => {
      const task: Task = new Task();
      task.id = '123';
      task.title = 'new title';
      task.description = 'make some title';
      task.status = TaskStatus.DONE;
      repositoryMock.save.mockResolvedValue(task);
      const dto = {
        id: '123',
        title: 'new title',
        description: 'make some title',
        status: TaskStatus.DONE,
      };
      const result = await service.createTask(dto);
      expect(result).toEqual(dto);
    });
  });
});
