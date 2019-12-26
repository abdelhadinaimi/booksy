import { RequestHandler } from 'express';
import  * as bookshelfRepo from '../repositories/bookshelf.repository';
import { findBook } from 'repositories/googleBooks.repository';

export const getAll: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub ;
  const findbookshelves = await bookshelfRepo.getUserBookshelfs(userId);
  if(findbookshelves.errors){
    return res.status(400).json({ errors: findbookshelves.errors });
  }
  return res.json(findbookshelves.data);  
};

export const getBookshelf: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub ;
  const bookshelfId = req.params.bookshelfId;
  const findbookshelf = await bookshelfRepo.getBookshelfById({userId, bookshelfId});
  if(findbookshelf.errors){
    return res.status(400).json({ errors: findbookshelf.errors });
  }
  return res.json(findbookshelf.data);  
};

export const postBookshelf: RequestHandler =  (req, res) => {
};

export const putBookshelf: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub ;
  const name = req.params.name;
  try{
   const createdBookesehlves = await bookshelfRepo.createBookshelf({userId,name});
  if (createdBookesehlves.errors) {
     return res.status(400).json({ errors: createdBookesehlves.errors });
   }

   return res.json(createdBookesehlves.data);
  }catch(err){
    console.log(err);
    return res.status(400).send();
  }
};
export const deleteBookshelf: RequestHandler = async (req, res) => {
  const userId = (req as any).user ? (req as any).user.sub.split('|')[1] : null;
  const bookshelfId = req.params.bookshelfId;
  const findbookshelf = await bookshelfRepo.deleteBookshelf({userId,bookshelfId});
  if(findbookshelf.errors){
    return res.status(400).json({ errors: findbookshelf.errors });
  }
  return res.json(findbookshelf.data);  
};
