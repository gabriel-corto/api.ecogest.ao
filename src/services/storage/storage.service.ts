import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StorageService {
  abstract storage(file: string): Promise<void>;
}
