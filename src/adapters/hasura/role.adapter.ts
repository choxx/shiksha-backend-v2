import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { RoleDto } from "src/role/dto/role.dto";
import { AppService } from "../../app.service";
@Injectable()
export class HpSamarthRoleService {
  constructor(private appService: AppService) {}

  public async searchRole(
    limit: string,
    roleId: string,
    title: string,
    parentId: string,
    status: string,
    request: any
  ) {
    const searchData = {
      roleId,
      title,
      parentId,
      status,
    };

    let newDataObject = "";
    Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });
    const data = {
      query: `query searchRole($limit:Int) {
        role(limit: $limit, where: {${newDataObject}}) {
          title
          roleId,
          status,
          parentId
          created_at
          updated_at
        }
      }`,
      variables: {
        limit: parseInt(limit),
      },
    };

    const response = await this.appService.hasuraGraphQLCall(data);

    const result = response?.data?.data?.role.map(
      (item: any) => new RoleDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
