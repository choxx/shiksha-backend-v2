import { Expose } from "class-transformer";

export class SuccessResponse {
  @Expose()
  statusCode: number;

  @Expose()
  message: string;

  @Expose()
  data: object;

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  pages: number;

  constructor(partial: Partial<SuccessResponse>) {
    Object.assign(this, partial);
  }
}
