import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await this.taskModel.create(createTaskDto);
    return createdTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate({ _id: id }, updateTaskDto, { new: true })
      .exec();
    return updatedTask;
  }

  async delete(id: string) {
    const deletedTask = await this.taskModel
      .findByIdAndDelete({ _id: id })
      .exec();

    if (!deletedTask) {
      throw new NotFoundException();
    }

    return deletedTask;
  }
}
