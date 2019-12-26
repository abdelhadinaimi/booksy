import { RequestHandler } from 'express';
import  * as bookshelfRepo from '../repositories/bookshelf.repository';
import { findBook } from 'repositories/googleBooks.repository';

export const getAll: RequestHandler = async (req, res) => {
  const userId = '5df3d7070d77d5621f584081';
  const findbookshelves = await bookshelfRepo.getUserBookshelfs(userId);
  if(findbookshelves.errors){
    return res.status(400).json({ errors: findbookshelves.errors });
  }
  return res.json(findbookshelves.data);  
};

export const getBookshelf: RequestHandler = async (req, res) => {
  const userId = '5df3d7070d77d5621f584081';
  const bookshelfId = req.params.bookshelfId;
  const findbookshelf = await bookshelfRepo.getBookshelfById({userId, bookshelfId});
  if(findbookshelf.errors){
    return res.status(400).json({ errors: findbookshelf.errors });
  }
  return res.json(findbookshelf.data);  
};

export const postBookshelf: RequestHandler = async (req, res) => {
  const userId = '5df3d7070d77d5621f584081';
  const name = req.params.name;
  const createdBookesehlves = await bookshelfRepo.createBookshelf({userId,name});
  if (createdBookesehlves.errors) {
    return res.status(400).json({ errors: createdBookesehlves.errors });
  }

  return res.json(createdBookesehlves.data);
};

export const putBookshelf: RequestHandler = (req, res) => {
  res.send('Put bookshelf');
};

export const deleteBookshelf: RequestHandler = async (req, res) => {
  const userId = '5df3d7070d77d5621f584081';
  const bookshelfId = req.params.bookshelfId;
  const findbookshelf = await bookshelfRepo.deleteBookshelf({userId,bookshelfId});
  if(findbookshelf.errors){
    return res.status(400).json({ errors: findbookshelf.errors });
  }
  return res.json(findbookshelf.data);  
};
