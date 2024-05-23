import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { topicSchema } from './topic.model';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Topic', schema: topicSchema }])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicsModule {}
