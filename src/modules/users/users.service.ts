// import { UsersRepository } from './users.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { usersCustomRepo } from './users.repository';
import { UserWithoutPassword } from './types/userWithoutPassword.type';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersCustomRepo: usersCustomRepo,
  ) {}

  async getUsers(page: number, limit: number) {
    let users = await this.usersRepository.find();

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + +limit;

    users = users.slice(startIndex, endIndex);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // return users.map(({ password, ...user }) => user);
    return users;
  }

  async addUsers() {
    return this.usersCustomRepo.initializeUser();
  }

  async getUser(userID: string): Promise<UserWithoutPassword> {
    const foundUser: User | undefined = await this.usersRepository.findOne({
      where: { id: userID },
      relations: { orders: true },
    });
    if (!foundUser) throw new NotFoundException('user not found or not exist');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...filteredUser } = foundUser;
    return filteredUser;
  }

  async getUserByEmail(email: string): Promise<string | Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: {
        orders: true,
      },
    });

    if (!user) {
      return `User not found`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async updateUserRoles(userID: string, newRole: Role) {
    const user = await this.usersRepository.findOne({ where: { id: userID } });
    if (!user) throw new NotFoundException('User not found or does not exist');

    if (![Role.Admin, Role.User].includes(newRole)) {
      throw new BadRequestException('Invalid role specified');
    }

    user.roles = [newRole];
    await this.usersRepository.save(user);

    return { message: `User role updated to ${newRole} successfully` };
  }

  async updateUser(userData: UpdateUserDto, userID: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { id: userID },
    });
    if (!foundUser) throw new NotFoundException('user not found or not exist');

    const updatedUser = this.usersRepository.merge(foundUser, userData);
    await this.usersRepository.save(updatedUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...filteredUser } = updatedUser;
    return { message: 'User Update Successfully', filteredUser };
  }

  async deleteUser(id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }
}
