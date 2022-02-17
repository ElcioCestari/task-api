import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('TaskController', () => {
  let controller: TaskController;
  const serviceMock = {
    fazAlgumaCoisa: jest.fn().mockResolvedValue('testando'),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskController,
        { provide: TaskService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
