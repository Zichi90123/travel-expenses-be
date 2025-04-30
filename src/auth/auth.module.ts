import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVariables } from '@app/lib/config/env.types';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SupabaseStrategy } from './strategies/supabase.strategy';
import SupabaseConfigService from '@app/lib/config/supabase.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<EnvVariables>) => ({
        secret: configService.get('SUPABASE_JWT_SECRET'),
        global: true,
        signOptions: {
          expiresIn: 40000,
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    SupabaseStrategy,
    SupabaseConfigService,
  ],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}
