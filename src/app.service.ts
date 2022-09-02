import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.BASEAPIURL;
  }

  async hasuraGraphQLCall(
    data: object,
    url: string = process.env.REGISTRYHASURA,
    headers: object = {
      "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
      "Content-Type": "application/json",
    }
  ): Promise<AxiosResponse> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");
    return await axios({
      method: "post",
      url: url,
      headers: headers,
      data: data,
    });
  }
}
