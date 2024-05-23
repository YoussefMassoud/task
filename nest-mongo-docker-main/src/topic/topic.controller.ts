import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async createOneTopic(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const generatedId = await this.topicService.createOneTopic(title, description);
    return { id: generatedId };
  }

  @Get()
  getAllTopics() {
    return this.topicService.getAllTopics();
  }

  @Get(':id')
  getOneTopic(@Param('id') topicId: string) {
    return this.topicService.getOneTopic(topicId);
  }

  @Patch(':id')
  async updateTopic(
    @Param('id') topicId: string,
    @Body('title') topictitle: string,
    @Body('description') topicdescription: string,
  ) {
    const updatedTopic = await this.topicService.updateTopic(topicId, topictitle, topicdescription);
    return updatedTopic;
  }

  @Delete(':id')
  async deleteTopic(@Param('id') topicId: string) {
    await this.topicService.deleteTopic(topicId);
    return { message: 'Topic deleted successfully' };
  }
}
