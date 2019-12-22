import { RegisterUserDto } from '../interfaces/user/dto/register-user.dto';
import { Result } from '../interfaces/result.interface';
import { UpdateGenresDto } from '../interfaces/user/dto/update-genres.dto';
import { IUser } from '../interfaces/user/user.interface';
import { User } from '../models/user.model';
import { errors } from '../common/errors.common';

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

export const findUserById = async (id: string): Promise<Result<IUser>> => {
  const result: Result<IUser> = { data: null, errors: null };

  const foundUser = await User.findById(id);
  if (foundUser) {
    result.data = foundUser;
  } else {
    result.errors = [errors.user.notFound];
  }

  return result;
};
