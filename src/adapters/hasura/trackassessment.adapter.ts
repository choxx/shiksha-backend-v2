import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { TrackAssessmentDto } from "src/trackAssessment/dto/trackassessment.dto";
import { Status } from "../../trackAssessment/enums/statuses.enum";
import { GROUP_STATUS } from "../../group/constants.enum";
import { AppService } from "../../app.service";
import {
  ROLE,
  STATUS as GROUP_MEMBERSHIP_STATUS,
} from "../../groupMembership/constants.enum";

@Injectable()
export class TrackAssessmentService {
  url = process.env.DIKSHADEVBASEAPIURL;
  constructor(private appService: AppService) {}
  public async getAssessment(assessmentId: any, request: any) {
    var axios = require("axios");
    try {
      var data = {
        query: `query GetTrackAssessment($trackAssessmentId:uuid) {
      trackassessment(where: {trackAssessmentId: {_eq: $trackAssessmentId}}) {
        answersheet
        filter
        created_at
        updated_at
      trackAssessmentId
        questions
        score
        totalScore
        source
        studentId
        teacherId
        groupId
        subject
        date
        type
        status
      }
    }`,
        variables: {
          trackAssessmentId: assessmentId,
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

      let result = response.data.data.trackassessment.map(
        (item: any) => new TrackAssessmentDto(item)
      );

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result,
      });
    } catch (e) {
      return `${e}`;
    }
  }
  public async createAssessment(
    request: any,
    assessmentDto: TrackAssessmentDto
  ) {
    let variables: object;
    try {
      const axios = require("axios");
      if (!assessmentDto.status) {
        // let's set it as "COMPLETED" by default
        assessmentDto.status = Status.COMPLETED;
      }
      if (assessmentDto.status !== Status.ABSENT) {
        const answer = JSON.stringify(assessmentDto.answersheet);
        const jsonObj = JSON.parse(answer);
        const params = JSON.parse(jsonObj);

        let sum = 0;
        params.children.map((e: any) => {
          sum += e.score;
          return sum;
        });
        assessmentDto.score = sum.toString();

        const questionIds = assessmentDto.questions;
        const totalScoreArray = [];
        for (const value of questionIds) {
          const config = {
            method: "get",
            url: `${this.url}/question/v1/read/${value}?fields=maxScore`,
          };
          const response = await axios(config);
          const data = response?.data;
          const final = data.result.question;

          const scoreResponse = {
            maxScore: final.maxScore,
          };
          totalScoreArray.push(scoreResponse);
        }
        let totalScore = 0;
        totalScoreArray.map((e: any) => {
          totalScore += e.maxScore;
          return totalScore;
        });
        assessmentDto.totalScore = totalScore.toString();

        variables = {
          filter: assessmentDto.filter,
          source: assessmentDto.source,
          questions: assessmentDto.questions.toString(),
          studentId: assessmentDto.studentId,
          teacherId: assessmentDto.teacherId,
          type: assessmentDto.type,
          answersheet: assessmentDto.answersheet,
          score: assessmentDto.score,
          totalScore: assessmentDto.totalScore,
          groupId: assessmentDto.groupId,
          subject: assessmentDto.subject,
          status: assessmentDto.status,
        };
      } else {
        variables = {
          filter: null,
          source: null,
          questions: null,
          studentId: assessmentDto.studentId,
          teacherId: assessmentDto.teacherId,
          type: assessmentDto.type,
          answersheet: null,
          score: null,
          totalScore: null,
          groupId: assessmentDto.groupId,
          subject: null,
          status: assessmentDto.status,
        };
      }

      const data = {
        query: `mutation CreateTrackAssessment($filter: String, $score: String, $totalScore:String, $source: String, $questions: String, $studentId: String, $teacherId: String, $type: String, $answersheet: String,$groupId:uuid, $subject:String, $status: String) {
          insert_trackassessment_one(object:{filter: $filter, score: $score, totalScore:$totalScore, source: $source, questions: $questions, studentId: $studentId, teacherId: $teacherId, type: $type, answersheet: $answersheet,groupId:$groupId,subject:$subject, status: $status}) {
            trackAssessmentId
          }
        }`,
        variables: variables,
      };

      const response = await this.appService.hasuraGraphQLCall(data); // creating assessment record in table

      // we'll update the group status to VISITED/COMPLETED because one of the mentor has visited & conducted assessment
      let groupStatus = GROUP_STATUS.VISITED;
      const groupMembershipPendingQuery = {
        query: `query {
          groupmembership_aggregate(where: {groupId: {_eq: "${assessmentDto.groupId}"}, role: {_eq: "${ROLE.STUDENT}"}, status: {_eq: "${GROUP_MEMBERSHIP_STATUS.NONE}"}}) {
            aggregate {
              count
            }
          }
        }`,
        variables: {},
      };
      const groupMembershipPending = await this.appService.hasuraGraphQLCall(
        groupMembershipPendingQuery
      );
      if (
        groupMembershipPending?.data?.groupmembership_aggregate?.aggregate
          ?.count === 0
      ) {
        // if the count is 0, that means all student's assessment has been done
        groupStatus = GROUP_STATUS.COMPLETED;
      }

      const groupUpdateMutationQuery = {
        query: `mutation {
          update_group_by_pk(pk_columns: {groupId: "${assessmentDto.groupId}"}, _set: {status: "${groupStatus}"}) {
            groupId
            status
          }
        }`,
        variables: {},
      };
      await this.appService.hasuraGraphQLCall(groupUpdateMutationQuery);

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: response.data,
      });
    } catch (e) {
      return `${e}`;
    }
  }

  public async searchAssessment(
    fromDate: string,
    toDate: string,
    limit: string,
    source: string,
    studentId: string,
    teacherId: string,
    groupId: string,
    subject: string,
    page: number,
    request: any
  ) {
    var axios = require("axios");

    let offset = 0;

    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }
    let searchData = {
      fromDate,
      toDate,
      source,
      studentId,
      teacherId,
      groupId,
      subject,
    };

    let newDataObject = "";
    if (searchData.fromDate && searchData.toDate) {
      newDataObject += `date:{_gte: "${searchData.fromDate}"}, _and: {date: {_lte: "${searchData.toDate}"}} `;
    }
    const objectKeys = Object.keys(searchData);
    objectKeys.forEach((e, index) => {
      if (
        searchData[e] &&
        searchData[e] != "" &&
        !["fromDate", "toDate"].includes(e)
      ) {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
        if (index !== objectKeys.length - 1) {
          newDataObject += " ";
        }
      }
    });

    var data = {
      query: `query searchTrackAssessment($offset:Int,$limit:Int) {
  trackassessment(limit: $limit, offset: $offset, where: {${newDataObject}}) {
    answersheet
    filter
    created_at
    updated_at
  trackAssessmentId
    questions
    score
    totalScore
    source
    studentId
    teacherId
    groupId
    subject
    date
    type
    status
  }
}`,
      variables: {
        limit: parseInt(limit),
        offset: offset,
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

    const result = response?.data?.data?.trackassessment.map(
      (item: any) => new TrackAssessmentDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
