import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from '../users/dto/login-user.input';
import { LoginResponse } from './auth.schema';  // Import the LoginResponse type

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)  // Update return type to LoginResponse
  async login(@Args('loginInput') loginInput: LoginInput): Promise<LoginResponse> {
    const { accessToken } = await this.authService.login(loginInput);
    return { accessToken };  // Return an object with accessToken field
  }
}
