import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRoot(
      'mongodb://admin:admin@localhost:27017/NestTodo?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
