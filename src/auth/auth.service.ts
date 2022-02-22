import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async signup(authDto: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authDto);
  }

  async signin(authDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authDto;
    const user = await this.usersRepository.findOne({ username });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    }
    throw new UnauthorizedException('check your email and password');
  }
}
