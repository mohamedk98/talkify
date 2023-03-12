import { Body, Controller, Post } from "@nestjs/common"
import { AuthenticationService } from "./authentication.service"
import { LoginDto } from "./requests/login.dto"
import { SignupDto } from "./requests/signup.dto"

@Controller("auth")
export class AuthenticationController {
  constructor (private authenticationService: AuthenticationService) {}

  @Post("/login")
  async login (@Body() loginData: LoginDto) {
    return await this.authenticationService.login(loginData)
  }

  @Post("/signup")
  async signup (@Body() signupData: SignupDto) {
    return await this.authenticationService.signup(signupData)
  }
}
