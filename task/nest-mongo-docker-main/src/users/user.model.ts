import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: 'users' },
);

export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
}
