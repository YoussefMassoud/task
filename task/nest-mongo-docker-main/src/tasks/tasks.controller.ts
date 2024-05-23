import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createOneTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('userEmail') userEmail: string,
    @Body('dueDate') dueDate: number,
    @Body('isDone') isDone: boolean,
  ) {
    const generatedId = await this.tasksService.createOneTask(
      title,
      description,
      dueDate,
      isDone,
      userEmail,
    );
    return { id: generatedId };
  }

  @Get()
  getAlltasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getOnetask(@Param('id') taskId: string) {
    return this.tasksService.getOneTask(taskId);
  }

  @Patch(':id')
  updatetask(
    @Param('id') taskId: string,
    @Body('title') tasktitle: string,
    @Body('description') taskdescription: string,
    @Body('userEmail') userEmail: string,
    @Body('dueDate') dueDate: number,
    @Body('isDone') isDone: boolean,
  ) {
    this.tasksService.updateTask(
      taskId,
      tasktitle,
      taskdescription,
      dueDate,
      isDone,
      userEmail,
    );
    return { ok: 'ok' };
  }

  @Delete(':id')
  deletetask(@Param('id') taskId: string) {
    this.tasksService.deleteTask(taskId);
    return null;
  }
}
