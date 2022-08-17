import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { catchError, map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { TrackAssessmentDto } from "src/trackAssessment/dto/trackassessment.dto";
import { ErrorResponse } from "src/error-response";
import { StudentAssessmentStatus } from "../../trackAssessment/enums/statuses.enum";

@Injectable()
export class TrackAssessmentService {
  constructor(private httpService: HttpService) {}
  assessmentURL = `${process.env.BASEAPIURL}/Trackassessment`;
  assessmentsetURL = `${process.env.BASEAPIURL}/Assessmentset`;
  url = process.env.DIKSHADEVBASEAPIURL;
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
        type
        studentAssessmentStatus
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
      if (
        assessmentDto.studentAssessmentStatus ==
        StudentAssessmentStatus.COMPLETED
      ) {
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
          studentAssessmentStatus: assessmentDto.studentAssessmentStatus,
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
          studentAssessmentStatus: assessmentDto.studentAssessmentStatus,
        };
      }

      const data = {
        query: `mutation CreateTrackAssessment($filter: String, $score: String, $totalScore:String, $source: String, $questions: String, $studentId: String, $teacherId: String, $type: String, $answersheet: String,$groupId:String, $subject:String, $studentAssessmentStatus: String) {
          insert_trackassessment_one(object:{filter: $filter, score: $score, totalScore:$totalScore, source: $source, questions: $questions, studentId: $studentId, teacherId: $teacherId, type: $type, answersheet: $answersheet,groupId:$groupId,subject:$subject, studentAssessmentStatus: $studentAssessmentStatus}) {
            trackAssessmentId
          }
        }`,
        variables: variables,
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
    limit: string,
    source: string,
    studentId: string,
    teacherId: string,
    groupId: string,
    subject: string,
    request: any
  ) {
    var axios = require("axios");
    const searchData = {
      source,
      studentId,
      teacherId,
      groupId,
      subject,
    };
    let newDataObject = "";
    const newData = Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query searchTrackAssessment($limit:Int) {
  trackassessment(limit: $limit, where: {${newDataObject}}) {
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
    type
    studentAssessmentStatus
  }
}`,
      variables: {
        limit: parseInt(limit),
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
  }
  public async trackAssessmentFilter(
    fromDate: string,
    toDate: string,
    groupId: string,
    subject: string,
    teacherId: string,
    studentId: string,
    request: any
  ) {
    var axios = require("axios");
    const filterParams = {
      groupId,
      subject,
      teacherId,
      studentId,
    };

    const filterVariables = {
      fromDate: fromDate, // as these are required fields, let's initialize them
      toDate: toDate, // as these are required fields, let's initialize them
    };
    let filterParamsString = "";
    Object.keys(filterParams).forEach((e) => {
      if (filterParams[e] && filterParams[e] != "") {
        filterParamsString += `,${e}:{_eq:$${e}}`;
        filterVariables[e] = filterParams[e];
      }
    });

    var data = {
      query: `query AssessmentFilter($fromDate:date,$toDate:date,$groupId:String,$subject:String, $teacherId:String, $studentId: String) {
        trackassessment(where: {date: {_gte: $fromDate}, _and: {date: {_lte: $toDate}} ${filterParamsString} }) {
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
          type
          date    
          studentAssessmentStatus
        }
      }`,
      variables: filterVariables,
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
  }
}
