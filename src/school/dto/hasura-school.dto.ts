import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class HpSamarthSchoolDto {
  @Expose()
  schoolId: string;

  @ApiProperty({
    type: String,
    description: "The schoolName of the school",
  })
  @Expose()
  schoolName: string;

  @ApiProperty({
    type: String,
    description: "The email of the school",
  })
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    description: "The udise of the school",
  })
  @Expose()
  udise: string;

  @ApiProperty({
    type: [String],
    description: "The  medium of instruction of the school",
  })
  @Expose()
  mediumOfInstruction: [string];

  @ApiProperty({
    type: Number,
    description: "The phone number of the school",
  })
  @IsNumber()
  @Expose()
  phoneNumber: number;

  @ApiProperty({
    type: String,
    description: "The address of the school",
  })
  @Expose()
  address: string;

  @ApiProperty({
    type: String,
    description: "The schoolType of the school",
  })
  @Expose()
  schoolType: string;

  @ApiProperty({
    type: String,
    description: "The website of the school",
  })
  @Expose()
  website: string;

  @ApiProperty({
    type: String,
    description: "The village of the school",
  })
  @Expose()
  village: string;

  @ApiProperty({
    type: String,
    description: "The block of the school",
  })
  @Expose()
  block: string;

  @ApiProperty({
    type: String,
    description: "The district of the school",
  })
  @Expose()
  district: string;

  @ApiProperty({
    type: String,
    description: "The stateId of the school",
  })
  @Expose()
  stateId: string;

  @ApiProperty({
    type: Number,
    description: "The pincode of the school",
  })
  @Expose()
  pincode: number;

  @ApiProperty({
    type: String,
    description: "The locationId of the school",
  })
  @Expose()
  locationId: string;

  @ApiProperty({
    type: String,
    description: "The enrollCount of the school",
  })
  @Expose()
  enrollCount: string;

  @ApiProperty({
    type: String,
    description: "The status of the school",
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: Number,
    description: "The latitude of the school",
  })
  @Expose()
  latitude: number;

  @ApiProperty({
    type: Number,
    description: "The longitude of the school",
  })
  @Expose()
  longitude: number;

  @ApiPropertyOptional()
  @Expose()
  metaData: [string];

  @ApiPropertyOptional({})
  @Expose()
  deactivationReason: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.schoolId = obj?.id ? `${obj.id}` : "";
    this.schoolName = obj?.name ? `${obj.name}` : "";
    this.email = obj?.email ? `${obj.email}` : "";
    this.udise = obj?.udise ? `${obj.udise}` : "";
    this.mediumOfInstruction = obj?.mediumOfInstruction
      ? obj.mediumOfInstruction
      : "";
    this.phoneNumber = obj?.phoneNumber ? obj.phoneNumber : "";
    this.address = obj?.address ? obj.address : "";
    this.schoolType = obj?.type ? `${obj.type}` : "";
    this.website = obj?.website ? `${obj.website}` : "";
    this.village = obj?.village ? `${obj.village}` : "";
    this.block = obj?.location?.block ? `${obj.location.block}` : "";
    this.district = obj?.location?.district ? `${obj.location.district}` : "";
    this.stateId = obj?.stateId ? `${obj.stateId}` : "";
    this.pincode = obj?.pincode ? obj.pincode : "";
    this.locationId = obj?.location_id ? `${obj.location_id}` : "";
    this.enrollCount = obj?.enroll_count ? `${obj.enroll_count}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.latitude = obj?.latitude ? obj.latitude : "";
    this.longitude = obj?.longitude ? obj.longitude : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.deactivationReason = obj?.deactivationReason
      ? `${obj.deactivationReason}`
      : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
