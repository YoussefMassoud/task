import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  /**
   * Create One Task
   *
   */
  async createOneTask(
    title: string,
    description: string,
    dueDate: number,
    isDone: boolean,
    userEmail: string,
  ) {
    const newTask = new this.taskModel({
      title,
      description,
      dueDate,
      isDone,
      userEmail,
    });
    const result = await newTask.save();
    return result.id as string;
  }

  /**
   * Get All Tasks
   */
  async getAllTasks() {
    const Tasks = await this.taskModel.find().exec();
    return Tasks.map((Task) => ({
      id: Task.id,
      title: Task.title,
      description: Task.description,
      userEmail: Task.userEmail,
      dueDate: Task.dueDate,
      isDone: Task.isDone,
    }));
  }

  /**
   * Get One Task
   * @param TaskId
   */
  async getOneTask(TaskId: string) {
    const Task = await this.findTask(TaskId);
    return {
      id: Task.id,
      title: Task.title,
      description: Task.description,
      userEmail: Task.userEmail,
      dueDate: Task.dueDate,
      isDone: Task.isDone,
    };
  }

  async updateTask(
    TaskId: string,
    title: string,
    description: string,
    dueDate: number,
    isDone: boolean,
    userEmail: string,
  ) {
    const modTask = await this.findTask(TaskId);

    //Only modify Values passed
    if (title) modTask.title = title;
    if (description) modTask.description = description;
    if (dueDate) modTask.dueDate = dueDate;
    if (isDone) modTask.isDone = isDone;

    modTask.save();
  }

  async deleteTask(TaskId: string) {
    const result = await this.taskModel.deleteOne({ _id: TaskId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Task.');
    }
  }

  private async findTask(id: string): Promise<Task> {
    let task: any;
    try {
      task = await this.taskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Task.');
    }
    if (!task) {
      throw new NotFoundException('Could not find Task.');
    }
    return task;
  }
}
