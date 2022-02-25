import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'secrect_message',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log(`validate with payload: ${payload}`);
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException(
        'You dont have authorization to access this',
      );
    }
    return user;
  }
}
