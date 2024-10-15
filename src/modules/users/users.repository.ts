import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from '../../utils/mock-users.json';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class usersCustomRepo {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async initializeUser() {
    data.map(async (element) => {
      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: element.name,
          email: element.email,
          password: await bcrypt.hash(element.password, 10),
          phone: element.phone,
          country: element.country,
          address: element.address,
          city: element.city,
        })
        .orIgnore()
        .execute();
    });
  }
}
