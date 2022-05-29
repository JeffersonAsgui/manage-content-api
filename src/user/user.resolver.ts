import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from './enum/user.enum';

@UseGuards(GqlAuthGuard, RolesGuard)
@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }

  @Roles(UserType.ADMIN)
  @Mutation(() => UserDTO)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<UserDTO> {
    const user = await this.userService.create(createUserInput);
    return user;
  }

  @Roles(UserType.ADMIN)
  @Query(() => [UserDTO], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Roles(UserType.ADMIN)
  @Query(() => UserDTO, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Roles(UserType.ADMIN)
  async findById(id: number): Promise<UserDTO> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Roles(UserType.ADMIN)
  @Mutation(() => UserDTO)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Roles(UserType.ADMIN)
  @Mutation(() => Boolean)
  async removeUser(
    @Args('id') id: number
  ): Promise<boolean> {
    const deleted = await this.userService.remove(id);
    return deleted;
  }
}
