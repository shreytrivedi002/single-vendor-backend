import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/models/users.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
