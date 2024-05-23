import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from './topic.model';

@Injectable()
export class TopicService {
  constructor(@InjectModel('Topic') private readonly topicModel: Model<Topic>) {}

  /**
   * Create One Topic
   *
   * @param title
   * @param description
   */
  async createOneTopic(title: string, description: string) {
    const newTopic = new this.topicModel({
      title,
      description,
    });
    const result = await newTopic.save();
    return result.id as string;
  }

  /**
   * Get All Topics
   */
  async getAllTopics() {
    const topics = await this.topicModel.find().exec();
    return topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      description: topic.description,
    }));
  }

  /**
   * Get One Topic
   * @param topicId
   */
  async getOneTopic(topicId: string) {
    const topic = await this.findTopic(topicId);
    return {
      id: topic.id,
      title: topic.title,
      description: topic.description,
    };
  }

  /**
   * Update One Topic
   * @param topicId
   * @param title
   * @param description
   */
  async updateTopic(topicId: string, title: string, description: string) {
    const modTopic = await this.findTopic(topicId);

    // Only modify values passed
    if (title) modTopic.title = title;
    if (description) modTopic.description = description;

    const result = await modTopic.save();
    return {
      id: result.id,
      title: result.title,
      description: result.description,
    };
  }

  /**
   * Delete One Topic
   * @param topicId
   */
  async deleteTopic(topicId: string) {
    const result = await this.topicModel.deleteOne({ _id: topicId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find topic.');
    }
  }

  private async findTopic(id: string): Promise<Topic> {
    let topic: Topic;
    try {
      topic = await this.topicModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find topic.');
    }
    if (!topic) {
      throw new NotFoundException('Could not find topic.');
    }
    return topic;
  }
}
