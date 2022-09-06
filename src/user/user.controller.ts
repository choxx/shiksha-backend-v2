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
  CacheInterceptor,
  Inject,
  Query, MethodNotAllowedException
} from "@nestjs/common";
import {
  SunbirdUserToken,
  UserService,
} from "../adapters/sunbirdrc/user.adapter";
import { Request } from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";

import { UserDto } from "./dto/user.dto";
import { UserSearchDto } from "./dto/user-search.dto";
import { IServicelocator } from "src/adapters/userservicelocator";
import { EsamwadUserToken } from "src/adapters/esamwad/user.adapter";
import { Adapter } from "../global.status.enum";
import { FusionAuthUserToken } from "../adapters/hasura/user.adapter";
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(
    private readonly service: UserService,
    @Inject(EsamwadUserToken) private eSamwadProvider: IServicelocator,
    @Inject(SunbirdUserToken) private sunbirdProvider: IServicelocator,
    @Inject(FusionAuthUserToken) private fusionAuthProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "User detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getUser(@Param("id") id: string, @Req() request: Request) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return this.service.getUser(id, request);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "User detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getUserByAuth(@Req() request: Request) {
    if (process.env.ADAPTER === "sunbird") {
      return this.sunbirdProvider.getUserByAuth(request);
    } else if (process.env.ADAPTER === "esamwad") {
      return this.eSamwadProvider.getUserByAuth(request);
    } else if (process.env.ADAPTER === Adapter.HASURA) {
      return this.fusionAuthProvider.getUserByAuth(request);
    }
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User has been created successfully." })
  @ApiBody({ type: UserDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUser(@Req() request: Request, @Body() userDto: UserDto) {
    return this.service.createUser(request, userDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUser(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() userDto: UserDto
  ) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return await this.service.updateUser(id, request, userDto);
  }
  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User list." })
  @ApiBody({ type: UserSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchUser(
    @Req() request: Request,
    @Body() userSearchDto: UserSearchDto
  ) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return await this.service.searchUser(request, userSearchDto);
  }

  @Get("teachersegment/:schoolId")
  // @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "templateId", required: false })
  public async teacherSegment(
    @Param("schoolId") schoolId: string,
    @Query("templateId") templateId: string,
    @Req() request: Request
  ) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return await this.service.teacherSegment(schoolId, templateId, request);
  }
}
