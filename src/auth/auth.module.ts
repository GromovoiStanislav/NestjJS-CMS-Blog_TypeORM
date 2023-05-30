import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        algorithm: "HS512",
        expiresIn: "1d"
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})

export class AuthModule {

}
