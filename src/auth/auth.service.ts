import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
) {}

async signUp(
    authCredentialsDto: AuthCredentialsDto
): Promise<User> {
    const user = await this.usersService.createUser(authCredentialsDto);
    return user;
}

async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
    const { email, password } = authCredentialsDto;
    
    // Find the user by email
    const user = await this.usersService.findByEmail(email);
    
    // Check if the user exists and the password is valid
    if (!user || !(await user.validatePassword(password))) {
        throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token for the user
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    
    // Return the access token
    return { access_token: accessToken };
}
}