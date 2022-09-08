import {
  Controller,
  Get,
  Query,
  MethodNotAllowedException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { Adapter } from "../global.status.enum";
import { OrfAssessmentConfigService as HasuraService} from "../adapters/hasura/orfAssessmentConfig.adapter";

@ApiTags("ORF Assessment Config")
@Controller("orfAssessmentConfig")
export class OrfAssessmentConfigController {
  constructor(
    private readonly hasuraService: HasuraService
  ) {}

  @Get("/")
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "List of Book IDs for matching filters" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "grade", required: true })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "competency_id", required: false })
  @ApiQuery({ name: "partner_code", required: false, enum: ["hpnipun22"] })
  list(
    @Query("grade") grade: string | number,
    @Query("subject") subject: string,
    @Query("competency_id") competency_id: string | number,
    @Query("partner_code") partner_code: string = 'hpnipun22'
  ) {
    if (process.env.ADAPTERSOURCE === Adapter.HASURA) {
      return this.hasuraService.list(grade, subject, competency_id, partner_code);
    }
    throw new MethodNotAllowedException(); // not supported on Hasura Adapter
  }
}
