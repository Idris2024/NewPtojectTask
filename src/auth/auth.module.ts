import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SignInService } from 'src/sign-in/sign-in.service'; 
import { SignInController } from 'src/sign-in/sign-in.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'wallet-token-address', // Replace with an environment variable in production
      signOptions: { expiresIn: '5m' }, // Token expires in 1 hour
    }),
  ],
  controllers: [SignInController],
  providers: [SignInService],
})
export class AuthModule {}
