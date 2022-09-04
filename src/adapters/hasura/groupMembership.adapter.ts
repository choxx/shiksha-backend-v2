import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { v4 as uuid } from "uuid";
import { AppService } from "../../app.service";
import { GroupMembershipDto } from "../../groupMembership/dto/groupMembership.dto";
import { ROLE, STATUS } from "../../groupMembership/constants.enum";
import { GroupMembershipSearchDto } from "../../groupMembership/dto/groupMembership-search.dto";

@Injectable()
export class GroupMembershipService {
  constructor(private appService: AppService) {}

  public async getGroupMembership(groupMembershipId: any, request: any) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");

    const data = {
      query: `query GetGroupMembership($groupmembershipId:uuid!) {
        groupmembership_by_pk(groupmembershipId: $groupmembershipId) {
            created_at
            created_by
            groupId
            groupMembershipId
            schoolId
            role
            updated_at
            updated_by
            userId
      }
    }`,
      variables: {
        groupMembershipId: groupMembershipId,
      },
    };

    const config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = new GroupMembershipDto(
      response?.data?.data?.groupmembership_by_pk
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async createGroupMembership(
    request: any,
    groupMembership: GroupMembershipDto
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");

    let query = "";
    Object.keys(groupMembership).forEach((e) => {
      if (groupMembership[e] && groupMembership[e] != "") {
        if (Array.isArray(groupMembership[e])) {
          query += `${e}: ${JSON.stringify(groupMembership[e])}, `;
        } else {
          query += `${e}: "${groupMembership[e]}", `;
        }
      }
    });

    const data = {
      query: `mutation CreateGroupMembership {
        insert_groupmembership_one(object: {${query}}) {
         groupMembershipId
        }
      }
      `,
      variables: {},
    };

    const config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = response.data.data.insert_groupmembership_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateGroup(
    groupMembershipId: string,
    request: any,
    groupMembershipDto: GroupMembershipDto
  ) {
    console.log(groupMembershipDto);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");

    let query = "";
    Object.keys(groupMembershipDto).forEach((e) => {
      if (groupMembershipDto[e] && groupMembershipDto[e] != "") {
        if (Array.isArray(groupMembershipDto[e])) {
          query += `${e}: ${JSON.stringify(groupMembershipDto[e])}, `;
        } else {
          query += `${e}: ${groupMembershipDto[e]}, `;
        }
      }
    });

    const data = {
      query: `mutation UpdateGroupMembership($groupMembershipId:uuid) {
          update_groupmembership(where: { groupMembershipId: {_eq: $ groupMembershipId}}, _set: {${query}}) {
          affected_rows
        }
}`,
      variables: {
        groupMembershipId: groupMembershipId,
      },
    };

    const config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = response.data.data;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async searchGroup(
    request: any,
    groupMembershipSearchDto: GroupMembershipSearchDto,
    populateMapping = true
  ) {
    let offset = 0;
    if (groupMembershipSearchDto.page > 1) {
      offset =
        parseInt(groupMembershipSearchDto.limit) *
        (groupMembershipSearchDto.page - 1);
    }

    const filters = groupMembershipSearchDto.filters;

    Object.keys(groupMembershipSearchDto.filters).forEach((item) => {
      Object.keys(groupMembershipSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    const data = {
      query: `query SearchGroupMembership($filters:groupmembership_bool_exp,$limit:Int, $offset:Int) {
           groupmembership(where:$filters, limit: $limit, offset: $offset,) {
            created_at
            created_by
            groupId
            groupMembershipId
            schoolId
            role
            updated_at
            updated_by
            userId
            status
            }
          }`,
      variables: {
        limit: parseInt(groupMembershipSearchDto.limit),
        offset: offset,
        filters: groupMembershipSearchDto.filters,
      },
    };

    let result: Array<GroupMembershipDto>;
    const response = await this.appService.hasuraGraphQLCall(data);
    if (response?.data?.data?.groupmembership?.length) {
      result = response.data.data.groupmembership.map(
        (item: any) => new GroupMembershipDto(item)
      );
    } else if (populateMapping && filters?.groupId) {
      await this.__populate_group_memberships(filters.groupId["_eq"]);
      return this.searchGroup(request, groupMembershipSearchDto, false);
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  /**
   * This function populates group membership for students uploaded by PT team
   * for spot assessment & bind them with groupId
   * @param groupId
   * @private
   */
  private async __populate_group_memberships(groupId) {
    let result: Array<object>;
    const data = {
      query: `
        query {
          monitortracking(limit: 1, where: {groupId: {_eq: "${groupId}"}}) {
            scheduleVisitDate
            schoolId
            group {
              gradeLevel
            }
          }
        }`,
      variables: {},
    };

    // We will find all the teams & school evaluations this monitor belongs to
    const monitorTrackingResult = await this.appService.hasuraGraphQLCall(data);
    if (monitorTrackingResult?.data?.data?.monitortracking?.length) {
      result = monitorTrackingResult?.data?.data?.monitortracking;
      console.log(result);
      const schoolId = result[0]["schoolId"];
      const evaluationDate = result[0]["scheduleVisitDate"];
      const groupMembershipRecords: Array<GroupMembershipDto> = [];
      const grade = result[0]["group"]["gradeLevel"];
      const querySaClassStudents = {
        query: `
          query ($schoolId: Int!, $class: Int!) {
            sa_class_students(where: {school_id: {_eq: $schoolId}, class: {_eq: $class}, evaluation_date: {_eq: "${evaluationDate}"}}) {
              student_id
            }
          }`,
        variables: {
          schoolId: schoolId,
          class: grade,
        },
      };
      const studentsMapping = await this.appService.hasuraGraphQLCall(
        querySaClassStudents
      );
      studentsMapping?.data?.data?.sa_class_students.forEach(
        (studentMapping) => {
          groupMembershipRecords.push({
            status: STATUS.NONE,
            groupId: groupId,
            role: ROLE.STUDENT,
            schoolId: schoolId,
            userId: studentMapping["student_id"],
            groupMembershipId: uuid(),
          });
        }
      );

      // prepare mutation strings for `groupmembership`
      let groupMembershipMutation = "[";
      groupMembershipRecords.forEach((item: GroupMembershipDto) => {
        groupMembershipMutation += "{";
        Object.keys(item).forEach((e) => {
          if (item[e] && item[e] != "") {
            groupMembershipMutation += `${e}: "${item[e]}", `;
          }
        });
        groupMembershipMutation += "},";
      });
      groupMembershipMutation += "]";
      const data = {
        query: `
        mutation {
          insert_groupmembership(objects: ${groupMembershipMutation}) {
            returning {
              groupId
            }
          }
        }`,
        variables: {},
      };
      await this.appService.hasuraGraphQLCall(data);
    }
  }
}
