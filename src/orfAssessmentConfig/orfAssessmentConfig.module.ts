import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { OrfAssessmentConfigController } from "./orfAssessmentConfig.controller";
import { AppService } from "../app.service";
import { OrfAssessmentConfigService } from "../adapters/hasura/orfAssessmentConfig.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [OrfAssessmentConfigController],
  providers: [OrfAssessmentConfigService, AppService],
})
export class OrfAssessmentConfigModule {}
