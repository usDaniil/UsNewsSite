import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get('JWT_EXPIRED')),
        },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
