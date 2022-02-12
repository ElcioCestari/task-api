import { TaskRepository } from './task.repository';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskUtils } from 'src/shared/utils/tests/task-utils';

describe('TaskService', () => {
  let service: TaskService;
  const repositoryMock = { getAllTasks: jest.fn() };

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
});
