import * as recombee from 'recombee-api-client';
import { Volume } from '../interfaces/book/book.interface';
import { Result } from '../interfaces/result.interface';
import { Recommendations, RecommendedBooks } from '../interfaces/book/recommendation.interface';
import { parseRecombeeRecommendation, noImagelink } from '../common/helper.common';

const RECOMBEE_DB_NAME = 'booksy-api-dev';

export interface UserInteractionDto {
  userId: string;
  bookId: string;
  recommId?: string;
  rating?: number;
}

const rqs = recombee.requests;
const client = new recombee.ApiClient(RECOMBEE_DB_NAME, process.env.RECOMBEE_API_KEY);

const scenarios = {
  recomendedBooks: 'user-books',
  bookToBook: 'book-to-books',
};

const addproperties = (): Promise<any> => {
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
  ]));
};

const createItemValues = (book: Volume) => {
  const { volumeInfo } = book;
  if (!volumeInfo) {
    return null;
  }
  const thumbnail = volumeInfo.thumbnail !== noImagelink ? volumeInfo.thumbnail : null;
  return new rqs.SetItemValues(book.id, {
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle,
    publisher: volumeInfo.publisher,
    description: volumeInfo.description,
    pageCount: volumeInfo.pageCount,
    authors: volumeInfo.authors,
    categories: volumeInfo.categories,
    publishedDate: volumeInfo.publishedDate,
    thumbnail,
  }, {
    cascadeCreate: true,
  });
};

export const sendBook = (book: Volume): Promise<any> => {
  return addproperties()
    .then(() => {
      const bookItem = createItemValues(book);
      return client.send(bookItem);
    });
};

export const sendInBulk = (books: Volume[]): Promise<any> => {
  return addproperties()
    .then(() => {
      const requests = books.map(createItemValues);
      return client.send(new rqs.Batch(requests));
    });
};
export const sendRatingInteraction = (userInteraction: UserInteractionDto): Promise<any> => {
  const rating = userInteraction.rating / 2.5 - 1; // returns a rating between -1 and 1
  return client.send(new rqs.AddRating(userInteraction.userId, userInteraction.bookId, rating,
    { cascadeCreate: true, recommId: userInteraction.recommId },
  ));
};

export const deleteRatingInteraction = (userInteraction: UserInteractionDto): Promise<any> => {
  return client.send(new rqs.DeleteRating(userInteraction.userId, userInteraction.bookId));
};

export const sendBookmarkInteraction = (userInteraction: UserInteractionDto): Promise<any> => {
  return client.send(new rqs.AddBookmark(userInteraction.userId, userInteraction.bookId,
    { cascadeCreate: true, recommId: userInteraction.recommId },
  ));
};

export const deleteBookmarkInteraction = (userInteraction: UserInteractionDto) => {
  return client.send(new rqs.DeleteBookmark(userInteraction.userId, userInteraction.bookId));
};

export const sendViewInteraction = (userInteraction: UserInteractionDto): Promise<any> => {
  return client.send(new rqs.AddDetailView(userInteraction.userId, userInteraction.bookId,
    { cascadeCreate: true, recommId: userInteraction.recommId },
  ));
};

// TODO add favorite genre to filter
export const getRecommendBooksToUser = async (userId: string, category: string, count: number): Promise<Result<RecommendedBooks>> => {
  const result: Result<RecommendedBooks> = { data: { rid: null, volumes: [] }, errors: null };
  try {
    const requestResult: Recommendations = await client.send(new rqs.RecommendItemsToUser(userId, count, {
      returnProperties: true,
      cascadeCreate: true,
      filter: category ? `'categories' <= select(lambda 'x': lower('x') ~ ".*${category}.*", 'categories')` : null,
    }));
    result.data.rid = requestResult.recommId;
    result.data.volumes = requestResult.recomms.map(parseRecombeeRecommendation);

  } catch (error) {
    result.errors = error;
  }
  return result;
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
    result.data.volumes = requestResult.recomms.map(parseRecombeeRecommendation);

  } catch (error) {
    result.errors = error;
  }
  return result;
};

export const mergeUsers = (targetUserId: string, sourceUserId: string): Promise<any> => {
  return client.send(new rqs.MergeUsers(targetUserId, sourceUserId, {
    cascadeCreate: true,
  }));
};
