import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignInModule } from './sign-in/sign-in.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SignInModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
