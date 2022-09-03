import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../schoolservicelocator";
import { AxiosResponse } from "axios";
import { AppService } from "../../app.service";
import { HpSamarthSchoolDto } from "../../school/dto/hasura-school.dto";

export const HpSamarthSchoolToken = "HpSamarthSchool";

@Injectable()
export class HpSamarthSchoolService implements IServicelocator {
  constructor(private appService: AppService) {}

  public async getSchool(schoolId: string) {
    const data = {
      query: `query ($schoolId: Int) {
        school(where: {id: {_eq:$schoolId }}) {
          id
          udise
          name
          type
          session
          location_id
          enroll_count
          is_active
          latitude
          longitude
          location {
            id
            district
            block
            cluster
          }
        }
      }`,
      variables: { schoolId: schoolId },
    };

    const response: AxiosResponse = await this.appService.hasuraGraphQLCall(
      data
    );
    console.log(response.data);
    const result = response?.data?.data?.school.map(
      (item: any) => new HpSamarthSchoolDto(item)
    );

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
