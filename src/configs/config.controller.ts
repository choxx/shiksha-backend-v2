import { ConfigService } from "../adapters/sunbirdrc/config.adapter";
import { ConfigService as HasuraConfigService } from "../adapters/hasura/config.adapter";
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
  Query,
  CacheInterceptor, MethodNotAllowedException
} from "@nestjs/common";
import { ConfigSearchDto } from "./dto/config-search.dto";
import { Request } from "@nestjs/common";
import { ConfigDto } from "./dto/config.dto";
import { Adapter } from "../global.status.enum";

@ApiTags("Config")
@Controller("config")
export class ConfigController {
  constructor(
    private service: ConfigService,
    private readonly hasuraService: HasuraConfigService
  ) {}

  @Get(":module/all")
  @ApiBasicAuth("access-token")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: "Config detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getConfig(@Req() request: Request) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      return this.hasuraService.getConfig(request);
    }
    return this.service.getConfig(request);
  }

  @Post("")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config has been created successfully." })
  @ApiBody({ type: ConfigDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createConfig(
    @Req() request: Request,
    @Body() configDto: ConfigDto
  ) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return this.service.createConfig(request, configDto);
  }

  @Post(":multipleConfigs")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config has been created successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createModuleConfigs(
    @Req() request: Request,
    @Body() configDto: [Object]
  ) {
    if (process.env.ADAPTER === Adapter.HASURA) {
      throw new MethodNotAllowedException(); // not supported on Hasura Adapter
    }
    return this.service.createModuleConfigs(request, configDto);
  }
}
