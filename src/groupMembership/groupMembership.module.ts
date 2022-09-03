import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { GroupMembershipController } from "./groupMembership.controller";
import { GroupMembershipService } from "src/adapters/hasura/groupMembership.adapter";
import { AppService } from "../app.service";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [GroupMembershipController],
  providers: [GroupMembershipService, AppService],
})
export class GroupMembershipModule {}
