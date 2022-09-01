import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../userservicelocator";
import { FusionauthUserDto } from "../../user/dto/fusionauth.user.dto";

export const FusionAuthUserToken = "FusionAuthUser";

@Injectable()
export class FusionAuthUserService implements IServicelocator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getUserByAuth(request: any) {
    // TODO/HP: make this API verify token & respond with User Data
    const response = {
      // Response being taken from response.result.data.user.user (POST http://us-edb.samagra.io/user/login)
      active: true,
      connectorId: "",
      data: {
        FCMtoken: "",
        address: [],
        education: [],
        gender: "",
        phoneVerified: false,
        school: 15547,
        udise: "111",
      },
      firstName: "Test User",
      fullName: "",
      id: "0c3d8a71-0dbe-49f7-9a3c-957b606353c5",
      imageUrl: "",
      insertInstant: 1561972649339,
      lastLoginInstant: 1662012116673,
      lastName: "(HP)",
      lastUpdateInstant: 1662012116605,
      mobilePhone: "0000000000",
      passwordChangeRequired: false,
      passwordLastUpdateInstant: 1652097070734,
      registrations: [
        {
          applicationId: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
          id: "e9d40da7-9c18-4734-a8e0-7b8b781f71bb",
          insertInstant: 1561972724202,
          lastLoginInstant: 1662012116673,
          lastUpdateInstant: 1629955909244,
          roles: ["school"],
          usernameStatus: "ACTIVE",
          verified: true,
        },
        {
          applicationId: "f18c3f6f-45b8-4928-b978-a9906fd03f22",
          id: "33714685-c05f-4b84-8ac5-e4b17fdd8f87",
          insertInstant: 1644563307747,
          lastLoginInstant: 1658034335127,
          lastUpdateInstant: 1644563307747,
          roles: ["school"],
          username: "111",
          usernameStatus: "ACTIVE",
          verified: true,
        },
      ],
      tenantId: "064458d0-dd05-e293-3709-a06cc6ca5ed7",
      twoFactorDelivery: "None",
      twoFactorEnabled: false,
      username: "111",
      usernameStatus: "ACTIVE",
      verified: true,
    };

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: new FusionauthUserDto(response),
    });
  }
}
