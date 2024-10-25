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
    const existingUsers = await this.usersRepository.count();

    if (existingUsers === 0) {
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
      console.log(`Users were added from users' custom repo`);
      return {
        message: `Users were added from users' custom repo`,
      };
    } else if (existingUsers > 0) {
      console.warn('Users already exist within database');
      return `Users already exist within database`;
    }
  }
}
