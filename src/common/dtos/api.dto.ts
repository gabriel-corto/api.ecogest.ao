import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export class MetadataDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;
}

export function ApiPageDataResponseDto<T>(model: Type<T>) {
  class ApiPageDataResponse {
    @ApiProperty({ isArray: true, type: model })
    data: T[];

    @ApiProperty({ type: MetadataDto })
    metadata: MetadataDto;
  }

  return ApiPageDataResponse;
}

export function ApiSuccessResponseDto<T>(model: Type<T>) {
  class ApiSuccessResponse {
    @ApiProperty({ type: model })
    data: T;

    @ApiProperty()
    message?: string;
  }

  return ApiSuccessResponse;
}
