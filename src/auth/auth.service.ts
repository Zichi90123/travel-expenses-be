import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import SupabaseConfigService from '@app/lib/config/supabase.config';
import { SignupDto } from '@app/lib/dto/signup.dto';
import { LoginDto } from '@app/lib/dto/login.dto';

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClient;

  constructor(private readonly supabaseConfig: SupabaseConfigService) {
    this.supabase = this.supabaseConfig.createSupabaseClient();
  }

  async signup(dto: SignupDto) {
    const { email, password } = dto;

    const { data: authData, error: signupError } =
      await this.supabase.auth.signUp({
        email,
        password,
      });

    if (signupError) throw signupError;

    const userId = authData.user?.id;
    if (!userId) throw new Error('User ID missing after signup');

    const { error: insertError } = await this.supabase.from('users').insert({
      id: userId,
      email,
    });

    if (insertError) throw insertError;

    return { user: authData.user };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }
}
