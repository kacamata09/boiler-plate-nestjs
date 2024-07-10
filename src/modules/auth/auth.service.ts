import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import response from 'src/utilities/response';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    try {
      const user = await this.userRepository.findOneBy({
        username: loginDTO.username,
      });
      if (user === null) {
        throw response.NOT_FOUND({ error: 'User not found' });
      }

      const isPasswordMatch = await bcrypt.compare(
        loginDTO.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw response.BAD({ error: 'Password not match' });
      }
      const accessToken = this.jwtService.sign(JSON.stringify(user));
      const { id, username, email, fullname } = user;
      const userInfo = {
        id,
        fullname,
        username,
        email,
      };
      const data = {
        accessToken,
        userInfo,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }
}
