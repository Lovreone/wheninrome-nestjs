import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendForbidden } from 'src/helpers/helpers';
import { Role } from 'src/helpers/enums';
import { User, UserDocument } from './user.model';
import { UserUpdateDTO } from './user-update.dto';
import { UserCreateDTO } from './user-create.dto';
import { isValidEmailFormat } from 'src/helpers/email-validator';

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
        .findOne({ username: username, isActive: true })
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

  async validateCreateBodyData(data: UserCreateDTO): Promise<UserCreateDTO> {
    const validatedData = data;

    if (!isValidEmailFormat(validatedData.email)) {
      const resMessage = `Invalid email format for: '${validatedData.email}'.`
      console.info(resMessage)
      sendForbidden(resMessage);
    }

    // TODO: Try to find a more elegant way to handle
    let cleanUsername = data.username
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, '')
      .replaceAll(' ', '-');
    await this.isExistsEmailOrUsername(validatedData.email, cleanUsername);
    data.username = cleanUsername; 

    // TODO: validatePass(pass) > Pass+Salt > Hash > Save

    validatedData.createdAt = new Date();
    validatedData.modifiedAt = new Date();
    validatedData.isActive = true;
    validatedData.roles = [Role.User];

    return validatedData;
  } 

  private async isExistsEmailOrUsername(email: string, username: string): Promise<void> {
    // We check for both here, to only do one db call instead of two
    const userFound = await this.userModel.findOne().or([
        {email: email}, 
        {username: username}
      ]);
    if (userFound) {
      let resMessage = '';
      if (userFound.email === email) {
        resMessage = resMessage.concat(`Email: '${email}' `);
      }
      if (userFound.username === username) {
        resMessage = resMessage.concat(`Username: '${username}' `);
      }
      sendForbidden(resMessage + ' already in use.');
    }
  }
}
