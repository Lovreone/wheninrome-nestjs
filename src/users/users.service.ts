import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/helpers/enums';
import { User, UserDocument } from './user.model';
import { UserUpdateDTO } from './user-update.dto';
import { UserCreateDTO } from './user-create.dto';

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
  
  // TODO: Remove later, get from db
  async findOne(username: string): Promise<User | undefined> {
      return this.users.find(user => user.username === username);
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getAllActive(): Promise<User[]> {
      return await this.userModel.find({ isActive: true }).exec();
  }

  async getSingleById(userId: string): Promise<User> {
    return await this.userModel
        .findById(userId)
        .orFail(() => { throw new NotFoundException('User not found.') })
        .exec();
  }

  async getSingleBySlug(username: string): Promise<User> {
    return await this.userModel
        .findOne({ userName: username, isActive: true })
        .orFail(() => { throw new NotFoundException('User not found.') })
        .exec();
  }

  async insert(data: UserCreateDTO): Promise<User> {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async update(userId: string, data: UserUpdateDTO): Promise<User> {
    return await this.userModel
        .findOneAndUpdate({ _id: userId }, data, { new: true })
        .orFail(() => { throw new NotFoundException('User not found.') })
        .exec(); 
  }

  async delete(userId: string): Promise<void> {
    await this.userModel
        .deleteOne({ _id: userId })
        .orFail(() => { throw new NotFoundException('User not found.') })
        .exec();
  }
}
