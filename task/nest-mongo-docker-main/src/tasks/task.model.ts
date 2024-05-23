import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    dueDate: { type: Number, required: true, default: Date.now() },
    userEmail: { type: String, required: false },
  },
  { collection: 'tasks' },
);

export interface Task extends mongoose.Document {
  id: string;
  title: string;
  isDone: boolean;
  description: string;
  userEmail: string;
  dueDate: number;
}
