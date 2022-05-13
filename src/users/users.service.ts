import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendForbidden } from 'src/helpers/helpers';
import { Role } from 'src/helpers/enums';
import { User, UserDocument } from './user.model';
import { UserUpdateDTO } from './user-update.dto';
import { UserCreateDTO } from './user-create.dto';
import { isValidEmailFormat } from 'src/helpers/email-validator';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getSingleByUsername(username: string): Promise<User | undefined> {
    return await this.userModel
      .findOne({ username: username })
      .exec();;
  }

  async getSingleByEmail(email: string): Promise<User | undefined> {
    return await this.userModel
      .findOne({ email: email })
      .exec();;
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

    validatedData.username = data.username
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, '')
      .replaceAll(' ', '-');
    
    await this.isExistingUserData(validatedData.email, validatedData.username);

    // TODO: Add password validation before hashing (8chars,SpecialChars,...)
    validatedData.password = await hashPassword(data.password);
    
    validatedData.createdAt = new Date();
    validatedData.modifiedAt = new Date();
    validatedData.isActive = true;
    validatedData.roles = [Role.User];

    return validatedData;
  } 

  /** We check if both 'Email' and 'Username' are already in use, 
   *  with a single database call, instead of two */
  private async isExistingUserData(email: string, username: string): Promise<void> {
    const userFound = await this.userModel
      .findOne()
      .or([ {email: email}, {username: username} ])
      .exec();
    if (userFound) {
      let resMessage = '';
      if (userFound.email === email) {
        resMessage = resMessage.concat(`Email: '${email}' `);
      }
      if (userFound.username === username) {
        resMessage = resMessage.concat(`Username: '${username}' `);
      }
      sendForbidden(resMessage + 'already in use.');
    }
  }
}
