import { User } from '@prisma/client';

export interface Metadata {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiPageDataResponse {
  data: T[];
  message?: string;
  metadata?: Metadata;
}
export interface ApiDataResponse {
  data: T[];
  message?: string;
}

export type ResponseMessageType = 'AUTHENTICATED' | 'CREATED' | 'DELETED' | 'UPDATED';

export interface ApiSuccessResponse {
  data: T;
  message?: string;
}

export interface ApiNoDataResponse {
  message?: ResponseMessageType;
}

export interface ApiAuthResponse {
  user: User;
  token: string;
}

export type ErrorType = 'Conflict' | 'Not Found' | 'Bad Request' | 'Unauthorized' | 'Server Error';

export interface ApiErrorResponse {
  message: string;
  error: ErrorType;
  statusCode: number;
}
