import { generate } from 'otp-generator';

export function generateOtp(): string {
  return generate(6, {
    digits: true,
    specialChars: false,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
  });
}
