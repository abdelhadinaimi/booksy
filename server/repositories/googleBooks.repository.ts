import { books, auth } from 'googleapis/build/src/apis/books';
import { FindBookDto } from '../interfaces/book/dto/find-book.dto';
import { Book, Volume } from '../interfaces/book/book.interface';
import { Result } from '../interfaces/result.interface';
import { books_v1 } from 'googleapis/build/src/apis/books/v1';

const booksClient = books({
  version: 'v1',
  auth: auth.fromAPIKey(process.env.BOOK_API_KEY),
});

export const findBook = async (query: FindBookDto): Promise<Result<books_v1.Schema$Volumes>> => {
  const result: Result<books_v1.Schema$Volumes> = { data: null, errors: null };
  try {
    const requestResult = await booksClient.volumes.list(query);
    result.data = requestResult.data;
  } catch (error) {
    result.errors = error.message.split('\n');
  }
  return result;
};

export const findBookById = async (id: string): Promise<Result<Volume>> => {
  const result: Result<Volume> = { data: null, errors: null };
  try {
    const requestResult = await booksClient.volumes.get({ volumeId: id });
    result.data = requestResult.data;
  } catch (error) {
    result.errors = error.message.split('\n');
  }
  return result;
};
