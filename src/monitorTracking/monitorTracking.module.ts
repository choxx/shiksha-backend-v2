import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { MonitorTrackingService } from "src/adapters/hasura/monitorTracking.adapter";

import { MonitorTrackingController } from "./monitorTracking.controller";
import { AppService } from "../app.service";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [MonitorTrackingController],
  providers: [MonitorTrackingService, AppService],
})
export class MonitorTrackingModule {}
