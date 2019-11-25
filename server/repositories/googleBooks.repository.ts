import { books, auth } from 'googleapis/build/src/apis/books';
import { FindBookDto } from '../dto/find-book.dto';
import { Book } from '../interfaces/book.interface';
import { Result } from '../dto/result.dto';

const booksClient = books({
  version: 'v1',
  auth: auth.fromAPIKey(process.env.BOOK_API_KEY),
});

export const findBook = async (query: FindBookDto): Promise<Result> => {
  const result: Result = { data: null, errors: null };
  try {
    const requestResult = await booksClient.volumes.list(query);
    result.data = requestResult.data;
  } catch (error) {
    result.errors = error.message.split('\n');
  }
  return result;
};

export const findBookById = (id: string): Book => {
  // search mongo db for book
  // if not found call google api with book id
  return null;
};
