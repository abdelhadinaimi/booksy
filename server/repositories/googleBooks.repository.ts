import { books, auth } from 'googleapis/build/src/apis/books';
import { FindBookDto } from '../interfaces/book/dto/find-book.dto';
import { Volume, Volumes } from '../interfaces/book/book.interface';
import { Result } from '../interfaces/result.interface';

const booksClient = books({
  version: 'v1',
  auth: auth.fromAPIKey(process.env.BOOK_API_KEY),
});

export const findBook = async (query: FindBookDto): Promise<Result<Volumes>> => {
  const result: Result<Volumes> = { data: { items: [], totalItems: 0 }, errors: null };
  try {
    const requestResult = await booksClient.volumes.list(query);
    result.data = requestResult.data;
  } catch (error) {
    result.errors = error.errors;
  }
  return result;
};

export const findBookById = async (id: string): Promise<Result<Volume>> => {
  const result: Result<Volume> = { data: null, errors: null };
  try {
    const requestResult = await booksClient.volumes.get({ volumeId: id });
    result.data = requestResult.data;
  } catch (error) {
    result.errors = error.errors;
  }
  return result;
};

export const saveBook = async (book: Volume): Promise<Result<boolean>> => {
  return { data: true, errors: [] };
};
