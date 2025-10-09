export class Metadata {
  page: number;
  total: number;
}

export class ApiDataResponse {
  data: T[];
  message?: string;
  metadata?: Metadata;
}

export class ApiSuccessResponse {
  data: T;
  message?: string;
}

export type ErrorType =
  | 'Conflit'
  | 'Not Found'
  | 'Bad Request'
  | 'Unauthorized'
  | 'Server Error';

export class ApiErrorResponse {
  message: string;
  error: ErrorType;
  statusCode: number;
}
