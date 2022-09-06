import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../studentservicelocator";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
import { AppService } from "../../app.service";
import { HasuraStudentDto } from "../../student/dto/hasura-student.dto";
export const HasuraStudentToken = "HasuraStudent";
@Injectable()
export class StudentService implements IServicelocator {
  constructor(private appService: AppService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async searchStudent(request: any, studentSearchDto: StudentSearchDto) {
    let offset = 0;
    const limit = request?.body?.limit ? request.body.limit : 10;
    const page = request?.body?.page ? request.body.page : 10;

    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }

    const searchData = ["id", "grade_number", "school_id"];
    let searchString = "";
    searchData.forEach((e) => {
      if (request?.body?.filters[e] && request.body.filters[e] != "") {
        searchString += `${e}:{_eq:"${request.body.filters[e]}"}`;
      }
    });
    console.log(searchString);
    const data = {
      query: `query ($offset:Int, $limit:Int) {
        student(where: {${searchString}}, offset: $offset,limit: $limit) {
          id
          name
          father_name,
          mother_name
          phone
          roll
          school_id
          section
          medium
          is_bpl
          is_cwsn
          is_migrant
          admission_number
          image
          updated
          stream_tag
          religion
          grade_number
          gender
          enrollment_type
          created
          dob
        }
        student_aggregate(where: {${searchString}}) {
          aggregate {
            count
          }
        }
      }`,
      variables: { limit: parseInt(limit), offset: offset },
    };
    const response = await this.appService.hasuraGraphQLCall(data);
    const result = response?.data?.data?.student.map(
      (item: any) => new HasuraStudentDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: result,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getStudent(studentId: any, request: any) {
    const data = {
      query: `query getStudent($student_id:Int!) {
      student(where: {id: {_eq: $student_id}}) {
        id
        name
        father_name,
        mother_name
        phone
        roll
        school_id
        section
        medium
        is_bpl
        is_cwsn
        is_migrant
        admission_number
        image
        updated
        stream_tag
        religion
        grade_number
        gender
        enrollment_type
        created
        dob
      }
    }`,
      variables: { student_id: parseInt(studentId) },
    };
    const response = await this.appService.hasuraGraphQLCall(data);

    const responsedata = response.data.data.student.map(
      (item: any) => new HasuraStudentDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "student found Successfully",
      data: responsedata[0],
    });
  }
}
