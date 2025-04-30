import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import SupabaseConfig from '../libs/lib/src/config/supabase.config';
import { envValidationSchema } from '../libs/lib/src/config/env.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseConfig],
})
export class AppModule {}
