import { Controller, Post, Body, ValidationPipe,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { User } from '../users/user.entity';
import { Public } from './public.decorator';
import { AuthGuard } from './guards/auth.guard';
@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}
@Public()
@Post('sign-up')
async signUp(
@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
): Promise<User> {
return this.authService.signUp(authCredentialsDto);
}
@Public()
@UseGuards(AuthGuard)
@Post('sign-in')
async signIn(
@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
): Promise<{ access_token: string }> {
return this.authService.signIn(authCredentialsDto);
}
}