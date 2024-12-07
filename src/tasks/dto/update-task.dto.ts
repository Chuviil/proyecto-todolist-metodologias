import { TaskStatus } from '../schemas/task.schema';

export class UpdateTaskDto {
  status: TaskStatus;
}
