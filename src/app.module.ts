import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { Users } from './users';
import { Tasks } from './tasks';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, TasksModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService, Users, Tasks],
})
export class AppModule {}
