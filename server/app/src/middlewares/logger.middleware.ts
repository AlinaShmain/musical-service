import { Injectable, InternalServerErrorException, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

// interface AuthRequest extends Request {
//   token: string,
// }

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');

    if (!req.headers && !req.headers.authorization) {
      // return res.status(500).send("Authorization header isn't set");
      throw new InternalServerErrorException("Authorization header isn't set");
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log("token", token);

    if (!token) {
      // return res.status(401).send("No token provided");
      throw new UnauthorizedException("No token provided");
    }

    try {
      const decoded = this.jwtService.verify(token);
      console.log("decoded", decoded);
      // req.token = token;
      req.body = { token };
      next();
    } catch (e) {
      // return res.status(401).send("Access is denied");
      // console.log(e.message);

      throw new UnauthorizedException("Access is denied");
    }
  }
}
