import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/models/user.model';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
