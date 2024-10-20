import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import refreshConfig from './config/refresh.config';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    @Inject(refreshConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<typeof refreshConfig>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const bodyWithRole = createUserDto.role;
    if (bodyWithRole) {
      throw new BadRequestException('Role is not allowed');
    }
    const { email, phoneNumber } = createUserDto;
    const user = await this.userService.findByEmail(email);

    const phoneNumberUser =
      await this.userService.findByPhoneNumber(phoneNumber);

    if (user) throw new ConflictException('User already exist');

    if (phoneNumberUser)
      throw new BadRequestException('Phone number is already in use');

    const createUser = await this.userService.create(createUserDto);
    console.log('🚀 ~ AuthService ~ registerUser ~ createUser:', createUser);
    if (!createUser)
      throw new InternalServerErrorException('Failed to create user');
    return createUser;
  }
  async getProfile(id: string) {
    const { password, refreshToken, ...user } =
      await this.userService.findById(id);
    return user;
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid Credentials');

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async validateGoogleUser(googleUser) {
    const { email } = googleUser;
    const user = await this.userService.findByEmail(email);
    if (user) return user;
    const adminRole = email === 'tee.jhay1@gmail.com' ? 'admin' : 'user';
    return await this.userService.createGoogleUser({
      email: email,
      fullName: googleUser.fullName,
      isGoogleAuth: true,
      role: adminRole,
      profilePicture: googleUser.profilePicture,
      password: '',
    });
  }

  async loginUser(id: string, email: string, role: Role) {
    const { accessToken, refreshToken } = await this.generateToken(id);
    const hashedRT = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(id, hashedRT);
    return {
      id,
      email,
      role,
      accessToken,
      refreshToken,
    };
  }

  async generateToken(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshJwtConfiguration),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const currentUser = { id: user.id, role: user.role };
    return currentUser;
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const refreshTokenMatched = await verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid Refresh Token');

    const currentUser = { id: user.id };
    return currentUser;
  }

  async refreshToken(id: string, email: string) {
    const { accessToken, refreshToken } = await this.generateToken(id);
    const hashedRT = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(id, hashedRT);
    return {
      id,
      email,
      accessToken,
      refreshToken,
    };
  }
  async logoutUser(id: string) {
    await this.userService.updateHashedRefreshToken(id, null);
  }
}
