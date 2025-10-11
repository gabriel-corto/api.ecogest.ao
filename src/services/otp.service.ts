import { Injectable } from '@nestjs/common';
import { generate } from 'otp-generator';

@Injectable()
export class OtpService {
  generateOtp(): string {
    const otp = generate(6, {
      digits: true,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    return otp;
  }
}
