import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) return null;

    const match = await bcrypt.compare(pass, user.password);

    if (!match) return null;

    return user;
  }

  async login(user: UserEntity) {
    const payload = {
      sub: user.uuid,
      isAdmin: user.isAdmin,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
