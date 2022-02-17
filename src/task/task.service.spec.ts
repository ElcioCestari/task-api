import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { Test, TestingModule } from '@nestjs/testing';

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
