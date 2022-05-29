import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthInput } from './dto/auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthDTO)
  public async getToken(
    @Args('data') data: AuthInput
  ): Promise<AuthDTO> {
    const response = await this.authService.validateUser(data);
    return response;
  }

}