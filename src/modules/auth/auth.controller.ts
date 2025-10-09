import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  //constructor(private authService: AuthSerivce) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'user sign-up' })
  @ApiResponse({
    status: 201,
    description: 'Conta cadastrada com sucesso!',
  })
  signUp(@Body() payload: { email: string; password: string }): string {
    console.log(payload);
    return '';
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'user sign-in' })
  @ApiResponse({
    status: 200,
  })
  signIn(@Body() payload: { email: string; password: string }): string {
    console.log(payload);
    return '';
  }
}
