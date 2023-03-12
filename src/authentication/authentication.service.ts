import { BadRequestException, Injectable } from "@nestjs/common"
import { UserService } from "src/user/user.service"
import { LoginDto } from "./requests/login.dto"
import { SignupDto } from "./requests/signup.dto"
import { JwtService } from "@nestjs/jwt"
import { compare, genSalt, hash } from "bcrypt"
@Injectable()
export class AuthenticationService {
  constructor (
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login (loginData: LoginDto) {
    const user = await this.userService.findOneByEmail(loginData.email)

    if (!user) {
      throw new BadRequestException("Invalid credentials")
    }
    const isPasswordValid = await compare(loginData.password, user.password)

    if (!isPasswordValid) {
      throw new BadRequestException("Invalid credentials")
    }
    const token = this.jwtService.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      { secret: process.env.JWT_SECRET_KEY },
    )

    return {
      token,
      userId: user.id,
      username:user.username
    }
  }

  async signup (signupData: SignupDto) {
    const userWithEmailExists = await this.userService.findOneByEmail(
      signupData.email,
    )

    if (userWithEmailExists) {
      throw new BadRequestException("Email already exists")
    }

    const userWithUsernameExists = await this.userService.findOneByUsername(
      signupData.username,
    )

    if (userWithUsernameExists) {
      throw new BadRequestException("Username already exists")
    }

    if (signupData.password !== signupData.retypePassword) {
      throw new BadRequestException(
        "Password and retyped password are not match",
      )
    }

    const salt = await genSalt(12)
    const hashedPassword = await hash(signupData.password, salt)

    await this.userService.createUser({
      ...signupData,
      password: hashedPassword,
    })

    return {
      message: "Your account has been created successfully",
    }
  }
}
