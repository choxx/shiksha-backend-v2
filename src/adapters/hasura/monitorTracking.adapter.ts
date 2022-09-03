import { Injectable, Logger } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { MonitorTrackingDto } from "src/monitorTracking/dto/monitorTracking.dto";
import { ErrorResponse } from "../../error-response";
import { AxiosResponse } from "axios";
import { AppService } from "../../app.service";
import { VisitStatus } from "../../mentorTracking/dto/visitStatus.enum";
import { GroupDto } from "../../group/dto/group.dto";
import { GRADE_LEVEL, STATUS, TYPE } from "../../group/constants.enum";
import { v4 as uuid } from "uuid";

@Injectable()
export class MonitorTrackingService {
  private readonly logger = new Logger(MonitorTrackingService.name); // logger instance
  constructor(private appService: AppService) {}

  public async getMonitorTracking(monitorId: string, request: any) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");

    const data = {
      query: `query GetMonitorTracking($monitorTrackingId:uuid) {
        monitortracking(where: {monitorTrackingId: {_eq:$monitorTrackingId }}) {
          created_at
          feedback
          monitorTrackingId
          scheduleVisitDate
          schoolId
          monitorId
          status
          updated_at
          visitDate
          lastVisited
        }
      }`,
      variables: { monitorTrackingId: monitorId },
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

    const result = response.data.data.monitortracking.map(
      (item: any) => new MonitorTrackingDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
  public async createMonitorTracking(
    request: any,
    monitorTrackingDto: MonitorTrackingDto
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");

    let newDataObject = "";
    Object.keys(monitorTrackingDto).forEach((e) => {
      if (monitorTrackingDto[e] && monitorTrackingDto[e] != "") {
        newDataObject += `${e}: "${monitorTrackingDto[e]}", `;
      }
    });
    const data = {
      query: `mutation CreateMonitorTracking {
        insert_monitortracking_one(object: {${newDataObject}}) {
          monitorTrackingId
        }
      }`,
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
    const result = response.data.data.insert_monitortracking_one;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateMonitorTracking(
    monitorTrackingId: string,
    request: any,
    monitorTrackingDto: MonitorTrackingDto
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");

    let newDataObject = "";
    Object.keys(monitorTrackingDto).forEach((e) => {
      if (monitorTrackingDto[e] && monitorTrackingDto[e] != "") {
        newDataObject += `${e}:"${monitorTrackingDto[e]}"`;
      }
    });

    const data = {
      query: `mutation UpdatedMonitorTracking($monitorTrackingId:uuid) {
        update_monitortracking(where: {monitorTrackingId: {_eq: $monitorTrackingId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
      variables: {
        monitorTrackingId: monitorTrackingId,
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

  public async searchMonitorTracking(
    limit: string,
    monitorTrackingId: string,
    monitorId: string,
    schoolId: string,
    groupId: string,
    scheduleVisitDate: Date,
    visitDate: Date,
    page: number,
    request: any
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require("axios");
    let offset = 0;

    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }
    const searchData = {
      monitorTrackingId,
      monitorId,
      schoolId,
      groupId,
      scheduleVisitDate,
      visitDate,
    };

    if (monitorId) {
      // let's check & populate monitor tracking on load from the team mapping
      await this.__populate_monitor_tracking(monitorId);
    }

    let newDataObject = "";
    Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    const data = {
      query: `query SearchMonitorTracking($offset:Int,$limit:Int) {
            monitortracking(where:{ ${newDataObject}}, offset: $offset,limit: $limit) {
              created_at
              feedback
              monitorTrackingId
              scheduleVisitDate
              status
              schoolId
              groupId
              monitorId
              updated_at
              visitDate
              lastVisited
            }
          }`,
      variables: { limit: parseInt(limit), offset: offset },
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

    let result = [];
    try {
      const response: AxiosResponse = await axios(config);
      if (response.data?.data?.monitortracking?.length) {
        result = response.data.data.monitortracking.map(
          (item: any) => new MonitorTrackingDto(item)
        );
      }
    } catch (e) {
      this.logger.error(e);
      return new ErrorResponse({
        errorCode: e?.response?.status ? e.response.status : e.code,
        errorMessage: e?.response?.data?.params?.errmsg
          ? e.response.data.params.errmsg
          : e.message,
      });
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  private static __get_group_records(schoolId) {
    const groupRecords: Array<GroupDto> = [];
    // for Class I
    groupRecords.push({
      createdAt: null,
      deactivationReason: null,
      gradeLevel: GRADE_LEVEL.CLASS_1,
      image: null,
      mediumOfInstruction: null,
      metaData: null,
      name: "Grade I",
      option: null,
      schoolId: schoolId,
      section: null,
      status: STATUS.PENDING,
      teacherId: null,
      type: TYPE.CLASS,
      updatedAt: null,
      groupId: uuid(),
    });

    // for Class II
    groupRecords.push({
      createdAt: null,
      deactivationReason: null,
      gradeLevel: GRADE_LEVEL.CLASS_2,
      image: null,
      mediumOfInstruction: null,
      metaData: null,
      name: "Grade II",
      option: null,
      schoolId: schoolId,
      section: null,
      status: STATUS.PENDING,
      teacherId: null,
      type: TYPE.CLASS,
      updatedAt: null,
      groupId: uuid(),
    });

    // for Class III
    groupRecords.push({
      createdAt: null,
      deactivationReason: null,
      gradeLevel: GRADE_LEVEL.CLASS_3,
      image: null,
      mediumOfInstruction: null,
      metaData: null,
      name: "Grade III",
      option: null,
      schoolId: schoolId,
      section: null,
      status: STATUS.PENDING,
      teacherId: null,
      type: TYPE.CLASS,
      updatedAt: null,
      groupId: uuid(),
    });

    return groupRecords;
  }

  /**
   * This function checks if there are any new team/evaluator mapping added by PT team
   * and auto-populate the records in monitortracking & group tables upon load
   * @param monitorId
   * @private
   */
  private async __populate_monitor_tracking(monitorId: string) {
    // team -> monitor tracking not yet populated.
    let result: Array<object>;
    const data = {
      query: `
            query($monitorId: String) {
              sa_team_evaluators(where: {evaluator_id: {_eq: $monitorId}}) {
                team {
                  id
                  name
                  school_evaluations(where: {evaluation_date: {_gt: "now()"}, evaluation_status: {_eq: false}, is_monitor_tracking_populated: {_eq: false}}) {
                    id
                    school_id
                    evaluation_date
                  }
                  evaluators {
                    id
                    evaluator_id
                  }
                }
              }
            }`,
      variables: { monitorId: monitorId },
    };

    // We will find all the teams & school evaluations this monitor belongs to
    const teamEvaluators = await this.appService.hasuraGraphQLCall(data);
    if ((result = teamEvaluators?.data?.data)) {
      for (let team of result["sa_team_evaluators"]) {
        team = team["team"];
        const schoolEvaluations = team["school_evaluations"];
        if (schoolEvaluations.length) {
          const evaluators = team["evaluators"];
          const monitorTrackingRecords: Array<MonitorTrackingDto> = [];
          let groupRecords: Array<GroupDto> = [];
          // iterate over each school evaluation
          schoolEvaluations.forEach((schoolEvaluation) => {
            const schoolId = schoolEvaluation["school_id"];
            const schoolGroups =
              MonitorTrackingService.__get_group_records(schoolId);
            groupRecords = groupRecords.concat(schoolGroups);
            // iterate over each monitor we are going to populate mapping for all monitors of the team
            evaluators.forEach((evaluator: object) => {
              // iterate over each groups as we have to create mapping of each monitor for each of the class
              schoolGroups.forEach((group: GroupDto) => {
                monitorTrackingRecords.push({
                  createdAt: null,
                  createdBy: null,
                  feedback: null,
                  lastVisited: null,
                  monitorTrackingId: null,
                  updatedAt: null,
                  updatedBy: null,
                  visitDate: null,
                  groupId: group.groupId,
                  monitorId: evaluator["evaluator_id"],
                  scheduleVisitDate: schoolEvaluation["evaluation_date"],
                  schoolId: schoolId,
                  status: VisitStatus.pending,
                });
              });
            }); // forEach() ends
          }); // forEach() ends

          // prepare mutation strings for `group`
          let groupMutation = "[";
          groupRecords.forEach((groupDto: GroupDto) => {
            groupMutation += "{";
            Object.keys(groupDto).forEach((e) => {
              if (groupDto[e] && groupDto[e] != "") {
                groupMutation += `${e}: "${groupDto[e]}", `;
              }
            });
            groupMutation += "},";
          });
          groupMutation += "]";

          // prepare mutation strings for `monitortracking`
          let monitorTrackingMutation = "[";
          monitorTrackingRecords.forEach(
            (monitorTrackingDto: MonitorTrackingDto) => {
              monitorTrackingMutation += "{";
              Object.keys(monitorTrackingDto).forEach((e) => {
                if (monitorTrackingDto[e] && monitorTrackingDto[e] != "") {
                  monitorTrackingMutation += `${e}: "${monitorTrackingDto[e]}", `;
                }
              });
              monitorTrackingMutation += "},";
            }
          );
          monitorTrackingMutation += "]";
          const data = {
            query: `mutation {
                  insert_group(objects: ${groupMutation}) {
                    returning {
                      groupId
                    }
                  }
                  insert_monitortracking(objects: ${monitorTrackingMutation}) {
                    returning {
                      monitorTrackingId
                    }
                  }
                }`,
            variables: {},
          };
          await this.appService.hasuraGraphQLCall(data);
        }
      }
    }
  }
}
