import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '@app/lib/config/env.types';
import { Request } from 'express';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly configService: ConfigService<EnvVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET') ?? '',
    });
  }

  validate(payload: {
    sub: string;
    email: string;
  }): Promise<{ userId: string; email: string }> {
    return Promise.resolve({ userId: payload.sub, email: payload.email });
  }

  authenticate(req: Request) {
    super.authenticate(req);
  }
}
