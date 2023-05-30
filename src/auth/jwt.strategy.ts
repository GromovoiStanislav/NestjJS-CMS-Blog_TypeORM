import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }])
    });
  }

  async validate(payload: any, req: Request) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.authService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
