export interface MailPayload {
  to: string;
  subject: string;
  content: string;
}

export interface OtpMailTemplate {
  user: string;
  otp: string | number;
}
