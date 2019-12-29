import { RequestHandler } from 'express';
import * as bookshelfRepo from '../repositories/bookshelf.repository';
import { findBook } from 'repositories/googleBooks.repository';

export const getAll: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub;
  const findbookshelves = await bookshelfRepo.getUserBookshelfs(userId);
  if (findbookshelves.errors) {
    return res.status(400).json({ errors: findbookshelves.errors });
  }
  return res.json(findbookshelves.data);
};

export const getBookshelf: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub;
  const bookshelfId = req.params.bookshelfId;
  const findbookshelf = await bookshelfRepo.getBookshelfById({ userId, bookshelfId });
  if (findbookshelf.errors) {
    return res.status(400).json({ errors: findbookshelf.errors });
  }
  return res.json(findbookshelf.data);
};

export const updateBookshelf: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub;
  const bookshelfId = req.params.bookshelfId;
  const name = req.body.name;


  const updatedBookshelf = await bookshelfRepo.updateBookshelfName({ name, bookshelfId, userId });
  console.log(updatedBookshelf);
  if (updatedBookshelf.errors) {
    return res.status(400).json({ errors: updatedBookshelf.errors });

  }
  console.log('Message');
  return res.json(updatedBookshelf.data);
};

export const postBookshelf: RequestHandler = async (req, res) => {
  const bookId =  req.params.bookId;
  const userId = (req as any).user.sub;
  const bookshelfId = req.params.bookshelfId;
  const numberOfReadPages = req.body.numberOfReadPages;
   
  try {
    const updatedBook = await bookshelfRepo.updateBookReading({userId,bookId,bookshelfId,numberOfReadPages});
    if (updatedBook.errors) {
      return res.status(400).json({ errors: updatedBook.errors });
    }

    return res.json(updatedBook.data);
  } catch (err) {
    return res.status(400).send();
  }
};

export const putBookshelf: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub;
  const name = req.body.name;
  try {
    const createdBookesehlves = await bookshelfRepo.createBookshelf({ userId, name });
    if (createdBookesehlves.errors) {
      return res.status(400).json({ errors: createdBookesehlves.errors });
    }

    return res.json(createdBookesehlves.data);
  } catch (err) {
    return res.status(400).send();
  }
};

export const deleteBookshelf: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub;
  const bookshelfId = req.params.bookshelfId;
  const findbookshelf = await bookshelfRepo.deleteBookshelf({ userId, bookshelfId });
  if (findbookshelf.errors) {
    return res.status(400).json({ errors: findbookshelf.errors });
  }
  return res.json(findbookshelf.data);
};

export const addBook: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub;
  const bookId =  req.body.bookId;
  const bookshelfId = req.params.bookshelfId;
  const addedBook = await bookshelfRepo.addBookToBookshelf({userId, bookId, bookshelfId });
  if (addedBook.errors) {
    return res.status(400).json({ errors: addedBook.errors });
  }
  return res.json(addedBook.data);
};

export const removeBook: RequestHandler = async (req, res) => {
  const userId = (req as any).user.sub;
  const bookshelfId = req.params.bookshelfId;
  const bookId = req.params.bookId;
  const removedBook = await bookshelfRepo.removeBookFromBookshelf({userId, bookId, bookshelfId });
  if (removedBook.errors) {
    return res.status(400).json({ errors: removedBook.errors });
  }
  return res.json(removedBook.data);
};