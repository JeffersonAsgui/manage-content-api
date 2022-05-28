import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }

  @Mutation(() => UserDTO)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<UserDTO> {
    const user = await this.userService.create(createUserInput);
    return user;
  }
  @Query(() => [UserDTO], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserDTO, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  async findById(id: number): Promise<UserDTO> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Mutation(() => UserDTO)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id') id: number
  ): Promise<boolean> {
    const deleted = await this.userService.remove(id);
    return deleted;
  }
}
