import { CacheModule, Module } from "@nestjs/common";
import { ConfigController } from "./config.controller";
import { ConfigService } from "../adapters/sunbirdrc/config.adapter";
import { HttpModule } from "@nestjs/axios";
import { ConfigService as HasuraConfigService } from "../adapters/hasura/config.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [ConfigController],
  providers: [ConfigService, HasuraConfigService],
})
export class ConfigurationModule {}
