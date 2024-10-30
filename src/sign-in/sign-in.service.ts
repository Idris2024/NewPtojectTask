// import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt'; // Import JwtService
// import { User } from 'src/Entity/userEntity';

// @Injectable()
// export class SignInService {
//   private users: User[] = []; 
//   private idCounter = 1;

//   constructor(private readonly jwtService: JwtService) {}

//   async signUp(  username: string,firstname: string,lastname: string,email: string,password: string, ): Promise<string> {
//     const existingUser = this.users.find((user) => user.email === email);
//     if (existingUser) {
//       throw new BadRequestException('Chief, email already registered.');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser: User = {
//       id: this.idCounter++,
//       username,
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword,
//     };
//     this.users.push(newUser);

//     return 'Chief registered successfully!';
//   }

//   // JWT generation
//   async signIn(email: string, password: string): Promise<{ access_token: string }> {
//     const user = this.users.find((user) => user.email === email);
//     if (!user) {
//       throw new UnauthorizedException('Chief, invalid email or password.');
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Chief, invalid email or password.');
//     }

//     // Generate JWT Token
//     const payload = { username: user.username, sub: user.id };
//     const accessToken = this.jwtService.sign(payload);

//     return { access_token: accessToken };
//   }
// }

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Entity/userEntity';

@Injectable()
export class SignInService {
  private users: User[] = []; // In-memory user storage
  private idCounter = 1; // User ID counter

  constructor(private readonly jwtService: JwtService) {}

  // Sign up method with token generation
  async signUp(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new BadRequestException('Chief, email already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: this.idCounter++,
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };

    // Generate a token for the new user
    const payload = { username: newUser.username, sub: newUser.id };
    const token = this.jwtService.sign(payload);

    newUser['token'] = token; // Store token with user
    this.users.push(newUser);

    return { message: 'Chief registered successfully!', token };
  }

  // Sign in method with token validation
  async signIn(email: string, password: string, token: string): Promise<string> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new UnauthorizedException('Chief, invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Chief, invalid email or password.');
    }

    // Validate the provided token
    if (user['token'] !== token) {
      throw new UnauthorizedException('Chief, invalid token.');
    }

    return `Welcome My Chief, ${user.username}!`;
  }
}

