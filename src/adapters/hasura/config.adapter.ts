import { SuccessResponse } from "src/success-response";
import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { IServicelocator } from "../configservicelocator";
import { ConfigDto } from "../../configs/dto/config.dto";

export const HasuraConfigToken = "HasuraConfig";

@Injectable()
export class ConfigService implements IServicelocator {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(request: any) {
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: {},
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createConfig(request: any, configDto: ConfigDto) {
    throw new MethodNotAllowedException();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-unused-vars
  createModuleConfigs(request: any, configAllData: [Object]) {
    throw new MethodNotAllowedException();
  }
}
