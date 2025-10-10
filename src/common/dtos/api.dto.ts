import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

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

export function ApiDataResponseDto<T>(model: Type<T>) {
  class ApiDataResponse {
    @ApiProperty({ isArray: true, type: model })
    data: T[];
  }

  return ApiDataResponse;
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
