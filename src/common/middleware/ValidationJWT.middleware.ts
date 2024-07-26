import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { LoginService } from '../../login/login.service';
import { UsersService } from '../../users/users.service';



@Injectable()
export class ValidationJWT implements NestMiddleware {
  constructor(
    private readonly userServices: UsersService,
    private readonly loginService: LoginService,
  ) {}

  async use(req, res: Response, next: NextFunction) {
    try {
      const token: string = req.headers.authorization?.split(' ')[1];
      await this.loginService.verifyToken(token);

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}