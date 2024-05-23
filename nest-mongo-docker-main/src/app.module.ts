import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsModule } from './topic/topices.module';

@Module({
  imports: [
    UsersModule,
    TopicsModule,
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/Cleopatra?authSource=admin'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
