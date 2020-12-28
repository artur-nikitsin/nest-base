import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { Users } from './users';
import { Tasks } from './tasks';

@Module({
  imports: [UsersModule, TasksModule],
  controllers: [AppController],
  providers: [AppService, Users, Tasks],
})
export class AppModule {}
