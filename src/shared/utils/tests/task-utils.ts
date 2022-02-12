import { Task, TaskStatus } from './../../../task/task.model';
export abstract class TaskUtils {
  public static getTask(): Task {
    return {
      id: 'd1308ba8-50d7-416c-bf42-e0b53e1f70b3',
      description: 'its a work that someone wash and cleaning the stuffs',
      title: 'clean',
      status: TaskStatus.OPEN,
    };
  }

  public static getTasks(quantity: number): Task[] {
    const tasks: Task[] = [];
    while (quantity > 0) {
      tasks.push(this.getTask());
      quantity--;
    }
    return tasks;
  }
}
