import { Request } from 'express';
import { TokenPayload } from './token';

export interface AuthRequest extends Request {
  user: TokenPayload;
}
