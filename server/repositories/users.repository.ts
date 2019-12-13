import { RegisterUserDto } from '../interfaces/user/dto/register-user.dto';
import { model } from 'mongoose';
import { Result } from '../interfaces/result.interface';
import { UpdateGenresDto } from '../interfaces/user/dto/update-genres.dto';
import { UpdateWriteOpResult } from 'mongodb';

const User = model('User');

export const registerUser = async (registerUserDto: RegisterUserDto): Promise<Result<boolean>> => {
  const result: Result<boolean> = { data: false, errors: null };
  try {
    const createdUser = await new User(registerUserDto).save();
    result.data = !!createdUser;
  } catch (error) {
    result.errors = error;
  }
  return result;
};

export const updateUserGenres = async (updateGenresDto: UpdateGenresDto): Promise<Result<boolean>> => {
  const result: Result<boolean> = { data: false, errors: null };
  try {
    const updateResult = await User.updateOne({ _id: updateGenresDto.userId }, { genres: updateGenresDto.genres });
    result.data = updateResult.nModified === 1;
  } catch (error) {
    result.errors = error;
  }
  return result;
};
