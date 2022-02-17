import { Task } from './task.entity';

describe('task', () => {
  const task: Task = new Task();
  it('should be true', () => {
    expect(task).toBeDefined();
  });
});
