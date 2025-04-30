import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { EnvVariables } from './env.types';

@Injectable()
export class SupabaseConfigService {
  constructor(private configService: ConfigService<EnvVariables>) {}

  createSupabaseClient(): SupabaseClient {
    const url = this.configService.get<string>('SUPABASE_URL') ?? '';
    const key = this.configService.get<string>('SUPABASE_KEY') ?? '';
    return createClient(url, key);
  }
}

export default SupabaseConfigService;
