import { CacheModule, Module } from "@nestjs/common";
import { SchoolController } from "./school.controller";
import {
  SchoolService,
  SunbirdSchoolToken,
} from "../adapters/sunbirdrc/school.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  EsamwadSchoolService,
  EsamwadSchoolToken,
} from "src/adapters/esamwad/school.adapter";
import {
  SchoolService as HasuraSchoolService,
  HasuraSchoolToken,
} from "../adapters/hasura/school.adapter";
import { AppService } from "../app.service";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [SchoolController],
  providers: [
    AppService,
    SchoolService,
    EsamwadSchoolService,
    HasuraSchoolService,
    { provide: SunbirdSchoolToken, useClass: SchoolService },
    { provide: EsamwadSchoolToken, useClass: EsamwadSchoolService },
    { provide: HasuraSchoolToken, useClass: HasuraSchoolService },
  ],
})
export class SchoolModule {}
