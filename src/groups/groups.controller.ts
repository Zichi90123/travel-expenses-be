import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GroupsService } from './groups.service';
import { CurrentUser } from '@app/lib/decorators/user.decorator';
import { User } from 'src/auth/entity/user.type';
import { CreateGroupDto } from '@app/lib/dto/create-group.dto';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('')
  createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @CurrentUser() user: User,
  ) {
    return this.groupsService.createGroup(user.id, createGroupDto);
  }
}
