import { CleanDataPipe } from 'src/pipes/cleanName.pipe';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { superAdminDTO } from '../users/dto/superAdmin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  private credentials: LoginUserDto = { email: '', password: '' };
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async signIn(@Body() userData: LoginUserDto) {
    const foundUser = await this.authService.signIn(userData);
    return foundUser;
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body(CleanDataPipe) userData: CreateUserDto) {
    const userWithoutPassword = await this.authService.signUp(userData);
    const { password, email } = userData;
    this.credentials.email = email;
    this.credentials.password = password;

    const logStatus = await this.authService.signIn(this.credentials);
    return { 'User Data': userWithoutPassword, 'Log Status': logStatus };
  }

  @Post('admin/login')
  @UsePipes(new ValidationPipe())
  async superSession(@Body() superData: superAdminDTO) {
    return await this.authService.superAdminSession(superData);
  }
}
