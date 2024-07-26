
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);  

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      request.user = payload;
      
    } catch(error) {
      console.log(error)
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {

    const authHeader = request.headers.authorization;
    // console.log(request.headers.authorization)
    const [bearer, token] = authHeader.split(' ')
    if(!authHeader)
    {
      throw new BadRequestException()
    }
    return token;
  }
}