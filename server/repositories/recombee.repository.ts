import * as recombee from 'recombee-api-client';
import { Volume } from '../interfaces/book/book.interface';
import { Result } from '../interfaces/result.interface';
import { Recommendations, RecommendedBooks } from '../interfaces/book/recommendation.interface';

const rqs = recombee.requests;
const client = new recombee.ApiClient(process.env.RECOMBEE_DB_NAME, process.env.RECOMBEE_API_KEY);

const scenarios = {
  recomendedBooks: 'recomended-books',
  bookToBook: 'book-to-book',
};

export const sendBook = (book: Volume): Promise<any> => {
  return client.send(new rqs.Batch([
    new rqs.AddItemProperty('title', 'string'),
    new rqs.AddItemProperty('subtitle', 'string'),
    new rqs.AddItemProperty('publisher', 'string'),
    new rqs.AddItemProperty('description', 'string'),
    new rqs.AddItemProperty('pageCount', 'int'),
    new rqs.AddItemProperty('authors', 'set'),
    new rqs.AddItemProperty('categories', 'set'),
    new rqs.AddItemProperty('thumbnail', 'image'),
    new rqs.AddItemProperty('publishedDate', 'string'),
  ]))
    .then(() => {
      const volumeInfo = book.volumeInfo;
      const bookItem = new rqs.SetItemValues(book.id, {
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle,
        publisher: volumeInfo.publisher,
        description: volumeInfo.description,
        pageCount: volumeInfo.pageCount,
        authors: volumeInfo.authors,
        categories: volumeInfo.categories,
        thumbnail: volumeInfo.imageLinks.thumbnail,
      }, {
        cascadeCreate: true,
      });
      return client.send(bookItem);
    });
};

export const sendViewInteraction = (userId: string, bookId: string, recommId?: string): Promise<any> => {
  return client.send(new rqs.AddDetailView(userId, bookId, { cascadeCreate: true, recommId }));
};

// TODO add favorite genre to filter
export const getRecommendBooksToUser = (userId: string, count: number): Promise<Result<Recommendations>> => {
  return client.send(new rqs.RecommendItemsToUser(userId, count, {
    scenario: scenarios.recomendedBooks,
    returnProperties: true,
    cascadeCreate: true,
  }));
};

export const getRecommendBooksFromBook = async (bookId: string, userId: string, count: number): Promise<Result<RecommendedBooks>> => {
  const result: Result<RecommendedBooks> = { data: { rid: null, volumes: [] }, errors: null };
  try {
    const requestResult: Recommendations = await client.send(new rqs.RecommendItemsToItem(bookId, userId, count, {
      scenario: scenarios.bookToBook,
      returnProperties: true,
      cascadeCreate: true,
    }));
    result.data.rid = requestResult.recommId;
    result.data.volumes = requestResult.recomms.map(rec => ({ id: rec.id, volumeInfo: rec.values }));
  } catch (error) {
    result.errors = error;
  }
  return result;
};
