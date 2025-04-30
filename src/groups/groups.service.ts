import SupabaseConfigService from '@app/lib/config/supabase.config';
import { CreateGroupDto } from '@app/lib/dto/create-group.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupsService {
  constructor(private readonly supabaseConfigService: SupabaseConfigService) {}

  async createGroup(userId: string, createGroupDto: CreateGroupDto) {
    const { data, error } = await this.supabaseConfigService
      .createSupabaseClient()
      .from('groups')
      .insert({ ...createGroupDto, owner: userId });

    if (error) {
      throw new Error(`Error creating group: ${error.message}`);
    }

    return data;
  }
}
