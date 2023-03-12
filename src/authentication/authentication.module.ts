import { Module } from "@nestjs/common"
import { AuthenticationController } from "./authentication.controller"
import { AuthenticationService } from "./authentication.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule, JwtService } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserService } from "src/user/user.service"
import { User } from "src/database/models/user.model"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,UserService,JwtStrategy,JwtService],
  exports:[JwtService]
})
export class AuthenticationModule {}
