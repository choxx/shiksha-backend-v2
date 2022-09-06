import { CacheModule, Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import {
  StudentService,
  SunbirdStudentToken,
} from "../adapters/sunbirdrc/student.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  EsamwadStudentService,
  EsamwadStudentToken,
} from "src/adapters/esamwad/student.adapter";
import {
  StudentService as HasuraStudentService,
  HasuraStudentToken,
} from "../adapters/hasura/student.adapter";
import { AppService } from "../app.service";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [StudentController],
  providers: [
    AppService,
    StudentService,
    EsamwadStudentService,
    HasuraStudentService,
    { provide: SunbirdStudentToken, useClass: StudentService },
    { provide: EsamwadStudentToken, useClass: EsamwadStudentService },
    { provide: HasuraStudentToken, useClass: HasuraStudentService },
  ],
})
export class StudentModule {}
