import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import response from 'src/utilities/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const userData = { ...createUserDto };
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);
      return response.SUBMITTED({
        message: 'new user has been created',
        data: newUser,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: PaginateQuery) {
    try {
      return await paginate(query, this.userRepository, {
        select: ['id', 'fullname', 'username', 'email', 'created_at'],
        searchableColumns: ['fullname', 'username', 'email'],
        defaultSortBy: [['fullname', 'ASC']],
        sortableColumns: ['id', 'fullname', 'username', 'email'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}