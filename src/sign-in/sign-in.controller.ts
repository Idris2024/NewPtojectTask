import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignUpDto } from 'src/Dto/dto'; 
import { SignInDto } from 'src/Dto/dto'; 

@Controller('auth')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string; token: string }> {
    const { username, firstname, lastname, email, password } = signUpDto;
    return this.signInService.signUp(username, firstname, lastname, email, password);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<string> {
    const { email, password, token } = signInDto;
    return this.signInService.signIn(email, password, token);
  }
}
