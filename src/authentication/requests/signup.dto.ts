import { IsEmail, IsString, Matches } from "class-validator"

export class SignupDto {
  @IsString()
  username: string
  @IsString()
  firstname: string
  @IsString()
  lastname: string
  @IsEmail()
  email: string
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/, {
    message:
      "Password should contain uppercase,lowercase,numbers and special characters",
  })
  password: string
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/, {
    message:
      "Password should contain uppercase,lowercase,numbers and special characters",
  })
  retypePassword: string
}
