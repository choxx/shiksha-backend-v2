import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../schoolservicelocator";
import { AxiosResponse } from "axios";
import { AppService } from "../../app.service";
import { HasuraSchoolDto } from "../../school/dto/hasura-school.dto";

export const HasuraSchoolToken = "HasuraSchool";

@Injectable()
export class SchoolService implements IServicelocator {
  constructor(private appService: AppService) {}

  public async getSchool(schoolId: string) {
    const data = {
      query: `query {
        school_by_pk(id: "${schoolId}") {
          id
          name
          is_active
          latitude
          location_id
          longitude
          udise
          location {
            id
            district
            block
            cluster
          }
        }
      }
      `,
      variables: {},
    };

    const response: AxiosResponse = await this.appService.hasuraGraphQLCall(
      data
    );
    let result = response?.data?.data?.school_by_pk;
    if (result) {
      result = new HasuraSchoolDto(result);
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async searchSchool() {
    throw new MethodNotAllowedException(); // we don't have filters allowed
  }
}
