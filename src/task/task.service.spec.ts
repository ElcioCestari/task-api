import { Task } from './task.model';
import { TaskService } from './task.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('TaskService', () => {
  let service: TaskService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should be empty', () => {
      const emptyTasks: Task[] = [];
      expect(service.getAllTasks()).toStrictEqual(emptyTasks);
    });
  });
});
