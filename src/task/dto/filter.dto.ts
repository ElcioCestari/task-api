import { TaskStatus } from '../task.model';

export class FilterDto {
  description?: string;
  title?: string;
  status?: TaskStatus;
}
