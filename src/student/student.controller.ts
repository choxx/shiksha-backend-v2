import {
  StudentService,
  SunbirdStudentToken,
} from "../adapters/sunbirdrc/student.adapter";

import {
  CacheInterceptor,
  CACHE_MANAGER,
  Inject,
  Request, MethodNotAllowedException
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
} from "@nestjs/common";
import { StudentDto } from "./dto/student.dto";
import { StudentSearchDto } from "./dto/student-search.dto";
import {
  EsamwadStudentService,
  EsamwadStudentToken,
} from "src/adapters/esamwad/student.adapter";
import { IServicelocator } from "src/adapters/studentservicelocator";
import { Adapter } from "../global.status.enum";
import {
  HpSamarthStudentService,
  HpSamarthStudentToken,
} from "../adapters/hasura/student.adapter";
@ApiTags("Student")
@Controller("student")
export class StudentController {
  constructor(
    private service: StudentService,
    private esamwadService: EsamwadStudentService,
    private hpSamarthService: HpSamarthStudentService,
    @Inject(CACHE_MANAGER) private cacheManager,
    @Inject(EsamwadStudentToken) private eSamwadProvider: IServicelocator,
    @Inject(SunbirdStudentToken) private sunbirdProvider: IServicelocator,
    @Inject(HpSamarthStudentToken) private hpSamarthProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Student detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getStudent(@Param("id") studentId: string, @Req() request: Request) {
    if (process.env.ADAPTER === "sunbird") {
      return this.sunbirdProvider.getStudent(studentId, request);
    } else if (process.env.ADAPTER === "esamwad") {
      return this.eSamwadProvider.getStudent(studentId, request);
    } else if (process.env.ADAPTER === Adapter.HASURA) {
      return this.hpSamarthProvider.getStudent(studentId, request);
    }
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Student has been created successfully." })
  @ApiBody({ type: StudentDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createStudent(
    @Req() request: Request,
    @Body() studentDto: StudentDto
  ) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return this.service.createStudent(request, studentDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Student has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateStudent(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() studentDto: StudentDto
  ) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return await this.service.updateStudent(id, request, studentDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Student list." })
  @ApiBody({ type: StudentSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchStudent(
    @Req() request: Request,
    @Body() studentSearchDto: StudentSearchDto
  ) {
    if (process.env.ADAPTER === "sunbird") {
      return this.sunbirdProvider.searchStudent(request, studentSearchDto);
    } else if (process.env.ADAPTER === "esamwad") {
      return this.eSamwadProvider.searchStudent(request, studentSearchDto);
    } else if (process.env.ADAPTER === Adapter.HASURA) {
      return this.hpSamarthProvider.searchStudent(request, studentSearchDto);
    }
  }
}
