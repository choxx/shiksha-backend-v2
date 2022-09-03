import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../studentservicelocator";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
import { AppService } from "../../app.service";
import { HpSamarthStudentDto } from "../../student/dto/hasura-student.dto";
export const HpSamarthStudentToken = "EsamwadStudent";
@Injectable()
export class HpSamarthStudentService implements IServicelocator {
  constructor(private appService: AppService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async searchStudent(request: any, studentSearchDto: StudentSearchDto) {
    throw new MethodNotAllowedException();
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
      (item: any) => new HpSamarthStudentDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "student found Successfully",
      data: responsedata[0],
    });
  }
}
