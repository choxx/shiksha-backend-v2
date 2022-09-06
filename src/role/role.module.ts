import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { RoleService } from "src/adapters/sunbirdrc/role.adapter";
import { RoleController } from "./role.controller";
import { HpSamarthRoleService } from "../adapters/hasura/role.adapter";
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
  providers: [RoleService, HpSamarthRoleService, AppService],
})
export class RoleModule {}
