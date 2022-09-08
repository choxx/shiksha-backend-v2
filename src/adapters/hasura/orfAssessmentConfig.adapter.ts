import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { AppService } from "../../app.service";
import { HasuraDto } from "../../orfAssessmentConfig/dto/hasura.dto";
@Injectable()
export class OrfAssessmentConfigService {
  constructor(private appService: AppService) {}

  public async list(
    grade: string | number,
    subject: string,
    competency_id: string | number,
    partner_code: string,
  ) {
    const searchData = {
      grade,
      subject,
      competency_id,
      partner_code,
    };

    let searchQuery = "";
    Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        searchQuery += `${e}:{_eq:"${searchData[e]}"},`;
      }
    });
    const data = {
      query: `query {
        sa_orf_assessment_config(where: {${searchQuery}}) {
          id
          grade
          partner_code
          subject
          competency_id
          book_ids
          created_at
          updated_at
        }
      }`,
      variables: {},
    };

    const bookIdsGradeCount = {
      "1": 2,
      "2": 2,
      "3": 1
    }

    const response = await this.appService.hasuraGraphQLCall(data);
    let bookIds = [];
    response?.data?.data?.sa_orf_assessment_config?.map(
      (item: HasuraDto) => {
        const dto = new HasuraDto(item);
        bookIds = bookIds.concat(dto.book_ids);
        return dto;
      }
    );
    if (bookIds.length)  {
      bookIds = bookIds.sort(
        () => Math.random() - 0.5,
      );
      bookIds = bookIds.slice(0, bookIdsGradeCount[grade]);
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: {
        'partner_code': partner_code,
        'book_ids': bookIds
      },
    });
  }
}
