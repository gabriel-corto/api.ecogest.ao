import { type OtpMailTemplate } from '@/types/schemas';

export function generateOtpMailTemplate({ otp, user }: OtpMailTemplate) {
  return `
  <!DOCTYPE html>
  <html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Verificação EcoGest</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
      body {
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', sans-serif;
        background-color: #f8fafc;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e2e8f0;
      }
      .header img {
        widht: 50px;
        height: 50px;
      }
      .content {
        padding: 30px 0;
        text-align: center;
      }
      .content h1 {
        font-size: 24px;
        font-weight: 700;
        color: #9d6b1d;
        margin: 0 0 10px 0;
      }
      .content p {
        font-size: 14x;
        color: #475569;
        line-height: 1.5;
        margin: 0 0 20px 0;
      }
      .otp-code {
        display: inline-block;
        font-size: 36px;
        font-weight: 600;
        border: 0.5px dashed #9d6b1d;
        color: #9d6b1d;
        background-color: #fffbf3;
        padding: 15px 30px;
        border-radius: 12px;
        letter-spacing: 4px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        padding-top: 14px;
        border-top: 1px solid #e2e8f0;
        font-size: 12px;
        color: #64748b;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
          <img
            src="https://lh3.googleusercontent.com/sitesv/AICyYdYGmfU3-_RNHAjpri4m5JmprlJqOgwKR7Lrja5ZnVLAH9DNrjlKOW9gwojmdLQ2BAChC2kg-j6GXk7sWvH2igSY52fqUzqlEPMKHDwG_4BrWgDYy2Zx8f_gc4oTfW1TF-Ed8xfNbLMhCCwa1kFv2pUZMfgX7AayNCkdW_1CAypJLllJpfgU3UWJyzA298zsHqoZTcn2wyYPV1w90PYIg0ZMTS0RLeixRDS0d9c=w1280"
          />
      </div>
     <div class="content">
          <h1>Código de Acesso Único</h1>
          <p>Olá. ${user},</p>
          <p>Para prosseguir com a verificação da sua conta na plataforma ecogest, utilize o código de acesso único fornecido abaixo. Por razões de segurança, este código expirará em 2 minutos.</p>
          <div class="otp-code">${otp}</div>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} EcoGest. Todos os direitos reservados.</p>
        <p>Ministério do Ambiente, Luanda, Angola</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
