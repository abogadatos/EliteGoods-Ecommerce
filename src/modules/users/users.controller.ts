import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsrWtoutPasswdInterceptor } from 'src/intercertors/userPasswordRemoval.interceptor';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CleanDataPipe } from 'src/pipes/cleanName.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('USERS')
@Controller('users')
@UseInterceptors(UsrWtoutPasswdInterceptor)
export class UsersController {
  constructor(private readonly usersRepositoryService: UsersService) {}

  @HttpCode(200)
  @Get()
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async userGetter(@Query('page') page: string, @Query('limit') limit: string) {
    try {
      const pageQuery = Number(page);
      const limitQuery = Number(limit);
      if (pageQuery && limitQuery) {
        return this.usersRepositoryService.getUsers(pageQuery, limitQuery);
      } else return this.usersRepositoryService.getUsers(1, 5);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error:
            'It wasnt possible to fetch users. Check if they do exist within database',
        },
        404,
      );
    }
  }

  @Put('updateRole/:userID')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateUserRoles(
    @Param('userID', new ParseUUIDPipe()) userID: string,
    @Body('role') role: string,
  ) {
    const roleEnum = Role[role as keyof typeof Role];
    if (!roleEnum) {
      throw new BadRequestException('Invalid role provided');
    }

    return await this.usersRepositoryService.updateUserRoles(userID, roleEnum);
  }

  @Get(':email')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUserByEmail(@Param('email') email: string) {
    return this.usersRepositoryService.getUserByEmail(email);
  }

  @Get('info/:id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async userById(@Param('id', ParseUUIDPipe) userID: string) {
    return this.usersRepositoryService.getUser(userID);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateUser(
    @Body(CleanDataPipe) userData: UpdateUserDto,
    @Param('id', ParseUUIDPipe) userID: string,
  ) {
    return this.usersRepositoryService.updateUser(userData, userID);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersRepositoryService.deleteUser(id);
  }
}
