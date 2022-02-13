import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class FilterDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
