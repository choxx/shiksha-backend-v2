import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Request,
  CacheInterceptor,
  Inject,
} from "@nestjs/common";
import {
  SchoolService,
  SunbirdSchoolToken,
} from "../adapters/sunbirdrc/school.adapter";
import { SchoolDto } from "./dto/school.dto";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
import { SchoolSearchDto } from "./dto/school-search.dto";
import {
  EsamwadSchoolService,
  EsamwadSchoolToken,
} from "src/adapters/esamwad/school.adapter";
import { IServicelocator } from "src/adapters/schoolservicelocator";
import {
  HpSamarthSchoolService,
  HpSamarthSchoolToken,
} from "../adapters/hasura/school.adapter";
import { Adapter } from "../global.status.enum";
@ApiTags("School")
@Controller("school")
export class SchoolController {
  constructor(
    private service: SchoolService,
    private esamwadService: EsamwadSchoolService,
    private hpSamarthService: HpSamarthSchoolService,
    @Inject(EsamwadSchoolToken) private eSamwadProvider: IServicelocator,
    @Inject(SunbirdSchoolToken) private sunbirdProvider: IServicelocator,
    @Inject(HpSamarthSchoolToken) private hpSamarthProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "School detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getSchool(@Param("id") id: string, @Req() request: Request) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      return this.hpSamarthService.getSchool(id);
    }
    return this.service.getSchool(id, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "School has been created successfully." })
  @ApiBody({ type: SchoolDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createSchool(
    @Req() request: Request,
    @Body() schoolDto: SchoolDto
  ) {
    return this.service.createSchool(request, schoolDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "School has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateSchool(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() schoolDto: SchoolDto
  ) {
    return await this.service.updateSchool(id, request, schoolDto);
  }
  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "School list." })
  @ApiBody({ type: SchoolSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchSchool(
    @Req() request: Request,
    @Body() schoolSearchDto: SchoolSearchDto
  ) {
    if (process.env.ADAPTER === "sunbird") {
      return this.sunbirdProvider.searchSchool(request, schoolSearchDto);
    } else if (process.env.ADAPTER === "esamwad") {
      return this.eSamwadProvider.searchSchool(request, schoolSearchDto);
    } else if (process.env.ADAPTER === Adapter.HASURA) {
      return this.hpSamarthProvider.searchSchool(request, schoolSearchDto);
    }
  }
}
