import { Module } from '@nestjs/common';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports : [ PassportModule, JwtModule.register({
    secret: 'wallet-token-address',
    signOptions: { expiresIn: '5m' },
  }),

  ],
  controllers: [SignInController],
  providers: [SignInService,]
})
export class SignInModule {}
