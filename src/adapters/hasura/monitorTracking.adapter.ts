import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { MonitorTrackingDto } from "src/monitorTracking/dto/monitorTracking.dto";
@Injectable()
export class MonitorTrackingService {
  constructor(private httpService: HttpService) {}

  public async getMonitorTracking(monitorId: string, request: any) {
    var axios = require("axios");

    var data = {
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
        }
      }`,
      variables: { monitorTrackingId: monitorId },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    let result = response.data.data.monitortracking.map(
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
    var axios = require("axios");
    var data = {
      query: `mutation CreateMonitorTracking($schoolId:String,$monitorId:String,$scheduleVisit:date,$visitDate:date, $feedback:String, $status:String) {
        insert_monitortracking_one(object: {schoolId: $schoolId, monitorId:$monitorId,scheduleVisitDate: $scheduleVisit, visitDate:$visitDate, feedback: $feedback, status: $status}) {
          monitorTrackingId
        }
      }`,
      variables: {
        schoolId: monitorTrackingDto.schoolId,
        monitorId: monitorTrackingDto.monitorId,
        scheduleVisit: monitorTrackingDto.scheduleVisitDate,
        visitDate: monitorTrackingDto.visitDate,
        feedback: monitorTrackingDto.feedback,
        status: monitorTrackingDto.status,
      },
    };

    var config = {
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
    var axios = require("axios");
    const updateData = {
      schoolId: monitorTrackingDto.schoolId,
      monitorId: monitorTrackingDto.monitorId,
      scheduleVisitDate: monitorTrackingDto.scheduleVisitDate,
      visitDate: monitorTrackingDto.visitDate,
      feedback: monitorTrackingDto.feedback,
      status: monitorTrackingDto.status,
    };

    let newDataObject = "";
    const newData = Object.keys(updateData).forEach((e) => {
      if (updateData[e] && updateData[e] != "") {
        newDataObject += `${e}:"${updateData[e]}"`;
      }
    });

    var data = {
      query: `mutation UpdatedMonitorTracking($monitorTrackingId:uuid) {
        update_monitortracking(where: {monitorTrackingId: {_eq: $monitorTrackingId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
      variables: {
        monitorTrackingId: monitorTrackingId,
      },
    };

    var config = {
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
    request: any
  ) {
    var axios = require("axios");

    const searchData = {
      monitorTrackingId,
      monitorId,
      schoolId,
      groupId,
      scheduleVisitDate,
      visitDate,
    };

    let newDataObject = "";
    const newData = Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchMonitorTracking($limit:Int) {
            monitortracking(where:{ ${newDataObject}}, limit: $limit) {
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
            }
          }`,
      variables: { limit: parseInt(limit) },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    let result = response.data.data.monitortracking.map(
      (item: any) => new MonitorTrackingDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
