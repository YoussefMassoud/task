import * as mongoose from 'mongoose';

export const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export interface Topic extends mongoose.Document {
  id: string;
  title: string;
  description: string;
}
