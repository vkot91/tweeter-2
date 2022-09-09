import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  public async sendVerificationEmailLink(email: string, token: string) {
    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
    const text = `Welcome to the Tweeter. To confirm the email address, click here: ${url}`;

    return await this.buildMail(email, text, 'Email confirm');
  }

  public async sendRestorePasswordLink(email: string, token: string) {
    const url = `${process.env.RESTORE_PASSWORD_URL}?email=${email}&token=${token}`;
    const text = `Hello ${email}. To restore your password, click here: ${url}`;

    return await this.buildMail(email, text, 'Password restore');
  }

  private async buildMail(email: string, text: string, subject: string) {
    return await this.mailerService.sendMail({
      to: email,
      subject,
      text,
    });
  }
}
