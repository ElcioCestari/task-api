import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() authDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signup(authDto);
  }

  @Post('/signin')
  async signin(
    @Body() authDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authDto);
  }
}
