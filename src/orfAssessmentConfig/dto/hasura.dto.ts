import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Timestamp } from "rxjs";

export class HasuraDto {
  @Expose()
  id: string | number;

  @Expose()
  partner_code: string;

  @ApiProperty({})
  @Expose()
  grade: string | number;

  @ApiProperty({})
  @Expose()
  subject: string;

  @ApiProperty({})
  @Expose()
  competency_id: string | number;

  @Expose()
  book_ids: Array<string>;

  @Expose()
  created_at: string | Timestamp<string>;

  @Expose()
  updated_at: string | Timestamp<string>;

  constructor(obj: any) {
    this.id = obj?.id ? `${obj.id}` : "";
    this.partner_code = obj?.partner_code ? `${obj.partner_code}` : "";
    this.grade = obj?.grade ? `${obj.grade}` : "";
    this.subject = obj?.subject ? `${obj.subject}` : "";
    this.competency_id = obj?.competency_id ? `${obj.competency_id}` : "";
    this.book_ids = obj?.book_ids ? obj.book_ids : [];
    this.created_at = obj?.created_at ? `${obj.created_at}` : "";
    this.updated_at = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
