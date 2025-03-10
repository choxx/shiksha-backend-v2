import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { WorksheetDto } from "src/worksheet/dto/worksheet.dto";
import { WorksheetSearchDto } from "src/worksheet/dto/worksheet-search.dto";

@Injectable()
export class WorksheetService {
  constructor(private httpService: HttpService) {}
  questionurl = process.env.DIKSHADEVBASEAPIURL;
  templateurl = process.env.TEMPLATERURL;

  public async createWorksheet(request: any, worksheetDto: WorksheetDto) {
    var axios = require("axios");
    const worksheetSchema = new WorksheetDto({});
    let newDataObject = "";
    const newData = Object.keys(worksheetDto).forEach((e) => {
      if (
        worksheetDto[e] &&
        worksheetDto[e] != "" &&
        Object.keys(worksheetSchema).includes(e)
      ) {
        if (Array.isArray(worksheetDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(worksheetDto[e])}, `;
        } else {
          newDataObject += `${e}: "${worksheetDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateWorksheet {
        insert_worksheet_one(object: {${newDataObject}}) {
          worksheetId
        }
      }
      `,
      variables: {},
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

    const result = response.data.data.insert_worksheet_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateWorksheet(
    id: string,
    request: any,
    worksheetDto: WorksheetDto
  ) {
    var axios = require("axios");
    const worksheetSchema = new WorksheetDto({});
    let newDataObject = "";
    const newData = Object.keys(worksheetDto).forEach((e) => {
      if (
        worksheetDto[e] &&
        worksheetDto[e] != "" &&
        Object.keys(worksheetSchema).includes(e)
      ) {
        if (Array.isArray(worksheetDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(worksheetDto[e])}, `;
        } else {
          newDataObject += `${e}: ${worksheetDto[e]}, `;
        }
      }
    });

    var data = {
      query: `mutation UpdateWorksheet($worksheetId:uuid) {
          update_worksheet(where: {worksheetId: {_eq: $worksheetId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
      variables: {
        worksheetId: id,
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

  public async getWorksheet(worksheetId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetWorksheet($worksheetId:uuid) {
        worksheet(where: {worksheetId: {_eq: $worksheetId}}) {
          created_at
          feedback
          criteria
          grade
          hints
          instructions
          level
          name
          navigationMode
          outcomeDeclaration
          outcomeProcessing
          purpose
          questionSetType
          questionSets
          questions
          qumlVersion
          showHints
          source
          state
          subject
          timeLimits
          topic
          updated_at
          usedFor
          visibility
          worksheetId
        }
      }
      `,
      variables: { worksheetId: worksheetId },
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

    let result = response.data.data.worksheet.map(
      (item: any) => new WorksheetDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async searchWorksheet(
    worksheetSearchDto: WorksheetSearchDto,
    request: any
  ) {
    var axios = require("axios");

    let offset = 0;
    if (worksheetSearchDto.page > 1) {
      offset =
        parseInt(worksheetSearchDto.limit) * (worksheetSearchDto.page - 1);
    }

    let filters = worksheetSearchDto.filters;

    Object.keys(worksheetSearchDto.filters).forEach((item) => {
      Object.keys(worksheetSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });

    var data = {
      query: `query SearchWorksheet($filters:worksheet_bool_exp,$limit:Int, $offset:Int) {
            worksheet(where:$filters, limit: $limit, offset: $offset,) {
              created_at
              feedback
              criteria
              grade
              hints
              instructions
              level
              name
              navigationMode
              outcomeDeclaration
              outcomeProcessing
              purpose
              questionSetType
              questionSets
              questions
              qumlVersion
              showHints
              source
              state
              subject
              timeLimits
              topic
              updated_at
              usedFor
              visibility
              worksheetId
            }
          }`,
      variables: {
        limit: parseInt(worksheetSearchDto.limit),
        offset: offset,
        filters: worksheetSearchDto.filters,
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

    let result = response.data.data.worksheet.map(
      (item: any) => new WorksheetDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
  public async downloadWorksheet(
    worksheetId: any,
    templateId: any,
    request: any
  ) {
    var axios = require("axios");
    var template_id = parseInt(templateId);

    const templateDetail = await axios.get(
      `${this.templateurl}${template_id}`,
      {
        headers: {
          Authorization: request.headers.authorization,
        },
      }
    );

    const templateData = templateDetail.data;
    var templateTags = templateData.tag;

    var worksheetData = {
      query: `query GetWorksheet($worksheetId:uuid) {
        worksheet(where: {worksheetId: {_eq: $worksheetId}}) {
          created_at
          feedback
          criteria
          grade
          hints
          instructions
          level
          name
          navigationMode
          outcomeDeclaration
          outcomeProcessing
          purpose
          questionSetType
          questionSets
          questions
          qumlVersion
          showHints
          source
          state
          subject
          timeLimits
          topic
          updated_at
          usedFor
          visibility
          worksheetId
        }
      }
      `,
      variables: { worksheetId: worksheetId },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: worksheetData,
    };

    const response = await axios(config);

    let resData = response.data.data.worksheet[0];

    let questionIds = resData.questions;

    let questionsArray = [];

    for (let value of questionIds) {
      let qData = {
        method: "get",
        url: `${this.questionurl}/question/v1/read/${value}?fields=body`,
      };
      const response = await axios(qData);
      const data = response?.data;
      const final = data.result.question;

      const scoreResponse = {
        question: final.body,
      };
      if (templateTags.includes("with_answers")) {
        questionsArray.push(
          "<li>" + final.body + "<br>Ans - <hr><hr><hr></li>"
        );
      } else {
        questionsArray.push("<li>" + final.body + "</li>");
      }
    }

    var data = {
      config_id: 1,
      data: {
        title: resData.name,
        grade: resData.grade,
        subject: resData.subject,
        questions: questionsArray,
      },
      template_id: template_id,
    };

    const pdf = await axios.post(
      `http://68.183.94.187:8000/generate/?plugin=pdf`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pdfUrl = pdf.data;
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: pdfUrl,
    });
  }
}
