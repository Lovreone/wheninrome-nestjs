import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendForbidden } from 'src/helpers/helpers';
import { Role } from 'src/helpers/enums';
import { User, UserDocument } from './user.model';
import { UserUpdateDTO } from './user-update.dto';
import { UserCreateDTO } from './user-create.dto';
import { isValidEmailFormat } from 'src/helpers/email-validator';
import { hashPassword } from 'src/auth/utils/bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  /** Aimed to be used for Public user profiles in the future (TBD) */
  async getSingleByUsername(username: string): Promise<User | undefined> {
    return await this.userModel
      .findOne({ username: username })
      .exec();;
  }

  /** Currently in use by Authorization system */
  async getSingleByEmail(email: string): Promise<User | undefined> {
    return await this.userModel
      .findOne({ email: email })
      .exec();;
  }

  /** Aimed exclusively towards CMS Admin users */
  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  /** Aimed exclusively towards CMS Admin users (currently unused) */
  async getAllActive(): Promise<User[]> {
    return await this.userModel.find({ isActive: true }).exec();
  }

  /** Aimed exclusively towards CMS Admin users */
  async getSingleById(userId: string): Promise<User> {
    return await this.userModel
        .findById(userId)
        .orFail(() => { throw new NotFoundException('User not found.') })
        .exec();
  }

  /** User Registration - Aimed towards Portal visitors */
  async insert(data: UserCreateDTO): Promise<User> {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  /** User Registration - Aimed towards Portal visitors */
  async update(userId: string, data: UserUpdateDTO): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, data, { new: true })
      .orFail(() => { throw new NotFoundException('User not found.') })
      .exec(); 
  }

  // TODO: TEMPORARY - Rethink all relations and deletion repercussions
  /** Delete aimed exclusively towards CMS Admin users */
  async delete(userId: string): Promise<void> {
    await this.userModel
        .deleteOne({ _id: userId })
        .orFail(() => { throw new NotFoundException('User not found.') })
        .exec();
  }

  /** Custom data-transformation/validation middleware for User Registration */
  async validateCreateBodyData(data: UserCreateDTO): Promise<UserCreateDTO> {
    const validatedData = data;
    validatedData.email = await this.validateEmail(validatedData);
    validatedData.username = await this.validateUsername(validatedData);
    // TODO: Add password validation before hashing (SpecialChars,...)
    validatedData.password = await hashPassword(data.password);
    validatedData.createdAt = new Date();
    validatedData.modifiedAt = new Date();
    validatedData.isActive = true;
    validatedData.roles = [Role.User];
    return validatedData;
  } 

  /** Custom data-transformation/validation middleware for User modify
   * - Admin modifies user data in CMS 
   * - User modifies it's own profile */ 
  async validateUpdateBodyData(data: UserUpdateDTO): Promise<UserUpdateDTO> {
    const validatedData = data;
    validatedData.email = await this.validateEmail(validatedData);
    validatedData.username = await this.validateUsername(validatedData);
    validatedData.modifiedAt = new Date();
    return validatedData;
  } 

  /** Checks email format, and if  email is already in use */
  private async validateEmail(data: UserCreateDTO | UserUpdateDTO): Promise<string> {
    /* Check format: Executes after @Email() decorator to cover any edge cases */
    if (!isValidEmailFormat(data.email)) {
      const resMessage = `Invalid email format for: '${data.email}'.`
      sendForbidden(resMessage);
    }
    /* Unique check: Check if already in use on existing user */
    const userFound = await this.userModel.findOne({email: data.email}).exec();
    if (userFound) {
      /* Check that userFound is not the User we're currently editing */
      const isUpdateOperation = data.hasOwnProperty('id');
      if (isUpdateOperation && data['id'] === userFound['id']) {
        return data.email;
      }
      const resMessage = `Email '${data.email}' is already in use.`
      sendForbidden(resMessage);
    } else {
      return data.email;
    }
  }

  /** Transforms username to required form, checks if it is already in use */
  private async validateUsername(data: UserCreateDTO | UserUpdateDTO): Promise<string> {
    /* Format data: Format username string to the form we need */
    data.username = data.username
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, '')
      .replaceAll(' ', '-');
    /* Unique check: Check if already in use on existing user */
    const userFound = await this.userModel.findOne({username: data.username}).exec();
    if (userFound) {
      /* Check that userFound is not the User we're currently editing */
      const isUpdateOperation = data.hasOwnProperty('id');
      if (isUpdateOperation && data['id'] === userFound['id']) {
        return data.username;
      }
      const resMessage = `Username '${data.username}' is already in use.`
      sendForbidden(resMessage);
    } else {
      return data.username;
    }
  }
}
