import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import response from 'src/utilities/response';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const res = await this.userService.create(createUserDto);
      return res;
    } catch (error) {
      return response.BAD({ error });
    }
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    try {
      return response.OK({
        message: 'berhasil mengambil data',
        data: await this.userService.findAll(query),
      });
    } catch (error) {
      return response.BAD({ error });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(id);
      return response.OK({ message: 'berhasil menemukan user', data });
    } catch (error) {
      return response.BAD({ error });
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}