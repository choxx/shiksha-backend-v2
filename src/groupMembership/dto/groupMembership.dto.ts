import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";
import { STATUS } from "../constants.enum";

export class GroupMembershipDto {
  @Expose()
  groupMembershipId: string;

  @ApiProperty()
  @Expose()
  groupId: string;

  @ApiProperty()
  @Expose()
  schoolId: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  role: string;

  @IsString()
  @IsIn([
    STATUS.NONE,
    STATUS.COMPLETED,
    STATUS.ABSENT,
    STATUS.NIPUN,
    STATUS.NIPUN_READY,
  ])
  @ApiProperty({
    description:
      "Assessment Status - whether student was absent or he has completed the assessment.",
    enum: [STATUS.COMPLETED, STATUS.ABSENT, STATUS.NIPUN, STATUS.NIPUN_READY],
  })
  @Expose()
  status: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;

  constructor(obj: any) {
    this.groupMembershipId = obj?.groupMembershipId
      ? `${obj.groupMembershipId}`
      : "";
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.role = obj?.role ? `${obj.role}` : "";
    this.status = `${obj.status}`;
    this.created_at = obj?.created_at ? `${obj.created_at}` : "";
    this.updated_at = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
