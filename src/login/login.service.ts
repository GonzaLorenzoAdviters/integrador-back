import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtConstants } from '../auth/auth.constants';
import { hashPassword } from '../common/utils/hashPassword.utils';
import { User } from '../users/entities/user.entity';
import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createJWT(loginDto: CreateLoginDto) {
    const data = loginDto;
    data.password = hashPassword(data.password);

    const user = await this.userRepository.findOne({where:{email: data.email}})
    if (user?.password !== data.password) 
    {
      throw new UnauthorizedException()
    }
    else
    {
      const token = this.jwtService.sign(data, {secret: jwtConstants.secret, expiresIn: 99999 });
      return {
        token: token,
      };
    }
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verify(token);
      const decoded = await this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
