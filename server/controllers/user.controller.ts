import { createUserIfNotExists, updateUserGenres } from '../repositories/users.repository';
import { UserRequestDto } from '../interfaces/user/dto/user-request.dto';
import { Request, Response } from 'express';
import { UpdateGenresDto } from '../interfaces/user/dto/update-genres.dto';

export const postLoginUser = async (req, res: Response) => {
  const loginUserDto: UserRequestDto = {
    sub: req.user.sub,
    email: req.body.email,
    picture: req.body.picture,
    name: req.body.name,
    nickname: req.body.nickname,
  };
  const result = await createUserIfNotExists(loginUserDto);

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }
  return res.json(result.data);
};

export const patchUpdateUserGenres = async (req: Request, res: Response) => {
  const updateGenresDto: UpdateGenresDto = {
    genres: req.body.genres,
    userId: req.params.userId,
  };
  const result = await updateUserGenres(updateGenresDto);

  if (result.errors) {
    return res.status(400).json({ errors: result.errors });
  }

  return res.json(result.data);
};
