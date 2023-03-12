import { Module } from "@nestjs/common"
import { MessagingGateway } from "./messaging.gateway"
import { AuthenticationModule } from "src/authentication/authentication.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/database/models/user.model"
import { UserService } from "src/user/user.service"


@Module({
  providers: [MessagingGateway, UserService],
  imports: [AuthenticationModule, TypeOrmModule.forFeature([User])],
})
export class MessagingModule {}
