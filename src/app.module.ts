import { Module } from "@nestjs/common";
import { PostModule } from "./post/post.module";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessControlModule } from "nest-access-control";
import { roles } from "./auth/user-roles.models";
import { AuthModule } from "./auth/auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      //rootPath: join(process.cwd(), 'uploads'),
      serveRoot: "/public"
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "mydb",
      autoLoadEntities: true,
      synchronize: true
    }),
    AccessControlModule.forRoles(roles),
    PostModule,
    CategoryModule,
    AuthModule
  ]
})
export class AppModule {
}
