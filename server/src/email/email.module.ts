import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"Tweeter" <noreply@example.com>',
      },
      template: {
        options: {
          strict: true,
        },
      },
    }),
  ],

  providers: [EmailService, EmailResolver],
  exports: [EmailService],
})
export class EmailModule {}
