import { SuccessResponse } from "src/success-response";
import { Injectable } from "@nestjs/common";
@Injectable()
export class ConfigService {
  public async getConfig(request: any) {
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: {},
    });
  }
}
