import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { RoleService } from "src/adapters/sunbirdrc/role.adapter";
import { RoleController } from "./role.controller";
import { RoleService as HasuraRoleService } from "../adapters/hasura/role.adapter";
import { AppService } from "../app.service";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService, HasuraRoleService, AppService],
})
export class RoleModule {}
