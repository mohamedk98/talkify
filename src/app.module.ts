import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MessagingModule } from "./messaging/messaging.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./database/models/user.model"
import { Room } from "./database/models/room.model"
import { RoomMessage } from "./database/models/roomMessage.model"
import { Message } from "./database/models/message.model"
import { Participant } from "./database/models/participant.model"
import { AuthenticationModule } from "./authentication/authentication.module"
import { UserModule } from './user/user.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
 
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV == "production",
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.getOrThrow("PG_HOST"),
        port: config.getOrThrow("PG_PORT"),
        username: config.getOrThrow("PG_USER"),
        password: config.getOrThrow("PG_PASS"),
        database: config.getOrThrow("PG_DATABASE"),
        autoLoadEntities:true,
        entities: [User,Room,RoomMessage,Message,Participant],
        synchronize: true,
        migrations: ["src/migration/**/*.ts"],
      }),
    }),
    MessagingModule,
    AuthenticationModule,
    UserModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
