import { CacheModule, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import {
  SunbirdUserToken,
  UserService,
} from "../adapters/sunbirdrc/user.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  EsamwadUserService,
  EsamwadUserToken,
} from "src/adapters/esamwad/user.adapter";
import {
  FusionAuthUserService,
  FusionAuthUserToken,
} from "../adapters/hasura/user.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    EsamwadUserService,
    FusionAuthUserService,
    { provide: SunbirdUserToken, useClass: UserService },
    { provide: EsamwadUserToken, useClass: EsamwadUserService },
    { provide: FusionAuthUserToken, useClass: FusionAuthUserService },
  ],
})
export class UserModule {}
