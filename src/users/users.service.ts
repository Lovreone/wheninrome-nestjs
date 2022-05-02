import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/helpers/enums';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  // FIXME: Temp, get from db
  private readonly users: User[] = [
    {
      username: 'johnwayne',
      email: 'john@doe.com',
      firstName: 'John',
      lastName: 'Wayne',
      isActive: true,
      password: 'changeme',
      roles: [Role.Admin]
    },
    {
      username: 'mariarita',
      email: 'maria@rita.com',
      password: 'guess',
      firstName: 'Maria',
      lastName: 'Rita',
      isActive: true,
      roles: [Role.User]
    },
  ];
  
  async findOne(username: string): Promise<User | undefined> {
      return this.users.find(user => user.username === username);
  }
}
