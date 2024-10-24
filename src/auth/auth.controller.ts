import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Roles } from './decorators/role.decorator';
import { GoogleGuard } from './guards/google.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { RefreshJwtAuthGuard } from './guards/refresh.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Post('register')
  registerUser(@Body() user: CreateUserDto) {
    return this.authService.registerUser(user);
  }
  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req) {
    return this.authService.loginUser(
      req.user.id,
      req.user.email,
      req.user.role,
    );
  }
  @UseGuards(GoogleGuard)
  @Get('google/login')
  googleLogin(@Req() req) {}

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req, @Res() res: Response) {
    const response = await this.authService.loginUser(
      req.user.id,
      req.user.email,
      req.user.role,
    );
    const clientURL = this.configService.get<string>('client.clientURL');
    res.redirect(
      `${clientURL}/api/auth/google/callback?id=${response.id}&email=${response.email}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&role=${response.role}`,
    );
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async getAdmin(@Req() req) {
    console.log(
      '🚀 ~ AuthController ~ getAdmin ~ req.user.role:',
      req.user.role,
    );
    return 'only for admin';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Req() req) {
    return await this.authService.getProfile(req.user.id);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id, req.user.email);
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logOut(@Req() req) {
    return this.authService.logoutUser(req.user.id);
  }
}
