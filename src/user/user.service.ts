import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserInput: CreateUserInput):
    Promise<UserDTO> {
    const user = this.userRepository.create(createUserInput);

    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Error in create User!');
    }

    return userSaved;
  }

  findAll(): Promise<UserDTO[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }


  async update(id: number, updateUserInput: UpdateUserInput): Promise<UserDTO> {
    const user = await this.findById(id);
    await this.userRepository.update(user, { ...updateUserInput });

    const userUpdated = this.userRepository.create({ ...user, ...updateUserInput });
    return userUpdated;
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findById(id);
    const userDeleted = await this.userRepository.delete(user);
    return userDeleted ? true : false;
  }
}
