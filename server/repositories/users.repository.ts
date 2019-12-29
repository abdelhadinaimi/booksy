import { UserRequestDto } from '../interfaces/user/dto/user-request.dto';
import { Result } from '../interfaces/result.interface';
import { UpdateGenresDto } from '../interfaces/user/dto/update-genres.dto';
import { IUser } from '../interfaces/user/user.interface';
import { User } from '../models/user.model';
import { errors } from '../common/errors.common';
import { defaultBookShelves } from '../common/helper.common';
import { Types } from 'mongoose';
import { createBookshelf } from './bookshelf.repository';

export const createUserIfNotExists = async (userRequestDto: UserRequestDto): Promise<Result<IUser>> => {
  const result: Result<IUser> = { data: null, errors: null };
  const foundUser = await findUserById(userRequestDto.sub);
  if (foundUser.data) {
    result.data = foundUser.data;
    return result;
  }
  try {
    const userInfo = {
      userId: userRequestDto.sub,
      picture: userRequestDto.picture,
      email: userRequestDto.email,
      name: userRequestDto.name,
    };
    const createdUser = await new User(userInfo).save();
    Promise.all(defaultBookShelves.map(b => createBookshelf({ userId: createdUser._id, name: b })))
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.error(error);
      });
    result.data = createdUser;
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
  const objId = Types.ObjectId.isValid(id) ? id : new Types.ObjectId('123456789012'); // to avoid CastError
  const foundUser = await User.findOne({ $or: [{ userId: id }, { _id: objId }] }).populate('bookshelves');
  if (foundUser) {
    result.data = foundUser;
  } else {
    result.errors = [errors.user.notFound];
  }

  return result;
};
