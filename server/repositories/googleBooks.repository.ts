import { books, auth } from 'googleapis/build/src/apis/books';
import { books_v1 } from 'googleapis/build/src/apis/books/v1';

const booksClient = books({
  version: 'v1',
  auth: auth.fromAPIKey(process.env.BOOK_API_KEY),
});

export const findBook = async (query: books_v1.Params$Resource$Volumes$List) => {
  const foundBooks = await booksClient.volumes.list(query);
  return foundBooks.data;
};
