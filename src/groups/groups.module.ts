import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import SupabaseConfigService from '@app/lib/config/supabase.config';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, SupabaseConfigService],
})
export class GroupsModule {}
