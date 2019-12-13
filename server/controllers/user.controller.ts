import { registerUser, updateUserGenres } from '../repositories/users.repository';
import { RegisterUserDto } from '../interfaces/user/dto/register-user.dto';
import { Request, Response } from 'express';
import { UpdateGenresDto } from '../interfaces/user/dto/update-genres.dto';

export const postRegisterUser = async (req: Request, res: Response) => {
  const registerUserDto: RegisterUserDto = req.body; // TODO get this stuff form the JWT
  const result = await registerUser(registerUserDto);

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
