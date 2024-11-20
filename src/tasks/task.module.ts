import {Module} from '@nestjs/common';
import {TasksService} from './task.service';
import {TasksController} from './task.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Task, TaskSchema} from "./schemas/task.schema";

@Module({
    controllers: [TasksController],
    providers: [TasksService],
    imports: [MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])],
})
export class TaskModule {
}
