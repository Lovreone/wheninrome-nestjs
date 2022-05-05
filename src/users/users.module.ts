import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema, User } from './user.model';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync(
      [ // Docs: "Hooks" https://docs.nestjs.com/techniques/mongodb
        { 
          name: User.name,
          useFactory: () => {
            const schema = UserSchema;
            schema.pre('save', function () {
                // TODO: this['password'] = this['password'] + ':saltsaltsalt';
                console.log('Hello from pre save', this);
            });
            return schema;
          }
        } 
      ]
    )
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
