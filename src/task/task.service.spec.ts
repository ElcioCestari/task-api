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
  const repositoryMock = { find: jest.fn() };

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
});
