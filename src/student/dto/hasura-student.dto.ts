import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class HpSamarthStudentDto {
  @Expose()
  studentId: string;

  @ApiProperty()
  @Expose()
  refId1: string;

  @ApiProperty()
  @Expose()
  refId2: string;

  @ApiPropertyOptional()
  @Expose()
  aadhaar: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  middleName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  schoolId: string;

  @ApiProperty()
  @Expose()
  studentPhoneNumber: number;

  @ApiPropertyOptional()
  @Expose()
  studentEmail: string;

  @ApiProperty()
  @Expose()
  gender: string;

  @ApiProperty()
  @Expose()
  groupId: string;

  @ApiPropertyOptional()
  @Expose()
  socialCategory: string;

  @ApiPropertyOptional()
  @Expose()
  iscwsn: string;

  @ApiPropertyOptional()
  @Expose()
  religion: string;

  @ApiPropertyOptional()
  @Expose()
  singleGirl: boolean;

  @ApiPropertyOptional()
  @Expose()
  weight: string;

  @ApiPropertyOptional()
  @Expose()
  height: string;

  @ApiPropertyOptional()
  @Expose()
  bloodGroup: string;

  @ApiProperty()
  @Expose()
  birthDate: string;

  @ApiPropertyOptional()
  @Expose()
  homeless: boolean;

  @ApiProperty()
  @Expose()
  bpl: boolean;

  @ApiProperty()
  @Expose()
  migrant: boolean;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiPropertyOptional()
  @Expose()
  fatherFirstName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherMiddleName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherLastName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherPhoneNumber: number;

  @ApiPropertyOptional()
  @Expose()
  fatherEmail: string;

  @ApiPropertyOptional()
  @Expose()
  motherFirstName: string;

  @ApiPropertyOptional()
  @Expose()
  motherMiddleName: string;

  @ApiPropertyOptional()
  @Expose()
  motherLastName: string;

  @ApiPropertyOptional()
  @Expose()
  motherPhoneNumber: number;

  @ApiPropertyOptional()
  @Expose()
  motherEmail: string;

  @ApiPropertyOptional()
  @Expose()
  guardianFirstName: string;

  @ApiPropertyOptional()
  @Expose()
  guardianMiddleName: string;

  @ApiPropertyOptional()
  @Expose()
  guardianLastName: string;

  @ApiPropertyOptional()
  @Expose()
  guardianPhoneNumber: number;

  @ApiPropertyOptional()
  @Expose()
  guardianEmail: string;

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
  })
  @Expose()
  image: string;

  @ApiPropertyOptional()
  @Expose()
  studentAddress: string;

  @ApiProperty()
  @Expose()
  village: string;

  @ApiProperty()
  @Expose()
  block: string;

  @ApiProperty()
  @Expose()
  district: string;

  @ApiProperty()
  @Expose()
  stateId: string;

  @ApiProperty()
  @Expose()
  pincode: number;

  @ApiProperty()
  @Expose()
  locationId: string;

  @ApiPropertyOptional()
  @Expose()
  deactivationReason: string;

  @ApiPropertyOptional()
  @Expose()
  metaData: [string];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.studentId = obj?.id ? `${obj.id}` : "";
    this.refId1 = obj?.admission_number ? `${obj.admission_number}` : "";
    this.refId2 = obj?.refId2 ? `${obj.refId2}` : "";
    this.aadhaar = obj?.aadhar ? `${obj.aadhar}` : "";
    this.firstName = obj?.name ? `${obj.name}` : "";
    this.middleName = obj?.middleName ? `${obj.middleName}` : "";
    this.lastName = obj?.lastName ? `${obj.lastName}` : "";
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
    this.schoolId = obj?.school_id ? `${obj.school_id}` : "";
    this.studentEmail = obj?.email ? `${obj.email}` : "";
    this.studentPhoneNumber = obj?.phone ? obj.phone : "";
    this.iscwsn = obj?.is_cwsn ? `${obj.is_cwsn}` : "";
    this.gender = obj?.gender ? `${obj.gender}` : "";
    this.socialCategory = obj?.socialCategory ? `${obj.socialCategory}` : "";
    this.religion = obj?.religion ? `${obj.religion}` : "";
    this.singleGirl = obj?.singleGirl ? obj.singleGirl : "";
    this.weight = obj?.weight ? `${obj.weight}` : "";
    this.height = obj?.height ? `${obj.height}` : "";
    this.bloodGroup = obj?.bloodGroup ? `${obj.bloodGroup}` : "";
    this.birthDate = obj?.birthDate ? `${obj.birthDate}` : "";
    this.homeless = obj?.homeless ? obj.homeless : "";
    this.bpl = obj?.bpl ? obj.bpl : "";
    this.migrant = obj?.migrant ? obj.migrant : "";
    this.status = obj?.student_status ? `${obj.student_status}` : "";

    this.fatherFirstName = obj?.father_name ? `${obj.father_name}` : "";

    this.fatherMiddleName = obj?.fatherMiddleName
      ? `${obj.fatherMiddleName}`
      : "";

    this.fatherLastName = obj?.fatherLastName ? `${obj.fatherLastName}` : "";
    this.fatherPhoneNumber = obj?.fatherPhoneNumber
      ? obj.fatherPhoneNumber
      : "";
    this.fatherEmail = obj?.fatherEmail ? `${obj.fatherEmail}` : "";

    this.motherFirstName = obj?.mother_name ? `${obj.mother_name}` : "";
    this.motherMiddleName = obj?.motherMiddleName
      ? `${obj.motherMiddleName}`
      : "";
    this.motherLastName = obj?.motherLastName ? `${obj.motherLastName}` : "";
    this.motherPhoneNumber = obj?.motherPhoneNumber
      ? obj.motherPhoneNumber
      : "";
    this.motherEmail = obj?.motherEmail ? `${obj.motherEmail}` : "";

    this.guardianFirstName = obj?.guardianFirstName
      ? `${obj.guardianFirstName}`
      : "";
    this.guardianMiddleName = obj?.guardianMiddleName
      ? `${obj.guardianMiddleName}`
      : "";
    this.guardianLastName = obj?.guardianLastName
      ? `${obj.guardianLastName}`
      : "";
    this.guardianPhoneNumber = obj?.guardianPhoneNumber
      ? obj.guardianPhoneNumber
      : "";
    this.guardianEmail = obj?.guardianEmail ? `${obj.guardianEmail}` : "";
    this.image = obj?.image ? `${obj.image}` : "";
    this.deactivationReason = obj?.deactivationReason
      ? `${obj.deactivationReason}`
      : "";
    this.studentAddress = obj?.studentAddress ? `${obj.studentAddress}` : "";
    this.village = obj?.village ? `${obj.village}` : "";
    this.block = obj?.block ? `${obj.block}` : "";
    this.district = obj?.district ? `${obj.district}` : "";
    this.stateId = obj?.stateId ? `${obj.stateId}` : "";
    this.pincode = obj?.pincode ? obj.pincode : "";
    this.locationId = obj?.locationId ? `${obj.locationId}` : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
