import { Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

const saltOrRounds = 10;
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Create One User
   *
   * @param username
   * @param password
   */
  async createOneUser(username: string, password: string) {
    const checkUserName = await this.userModel.find({ username }).exec();
    if (checkUserName.length !== 0) {
      const isMatch = await bcrypt.compare(password, checkUserName[0].password);
      if (isMatch) {
        return { ok: 'Login success' };
      }
    }

    const hash = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      username,
      password: hash,
    });
    await newUser.save();
    return { ok: 'Register success' };
  }

  /**
   * Get All Users
   */
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
    }));
  }

  /**
   * Get One User
   * @param userId
   */
  async getOneUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      username: user.username,
      password: user.password,
    };
  }
  private async findUser(id: string): Promise<User> {
    let user: any;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
  generateJwt(payload: string) {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });
  }
}
