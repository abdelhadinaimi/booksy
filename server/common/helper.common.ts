import { Volume } from '../interfaces/book/book.interface';
import { books_v1 } from 'googleapis/build/src/apis/books/v1';
import { Recommendation } from '../interfaces/book/recommendation.interface';

export const defaultBookShelves = ['read', 'reading', 'to read'];

export const noImagelink = 'assets/img/no_book_cover.jpg';

export const parseRecombeeRecommendation = (data: Recommendation): Volume => {
  return {
    id: data.id, volumeInfo: {
      ...data.values,
      thumbnail: data.values.thumbnail ? data.values.thumbnail : noImagelink,
    },
  };
};

export const parseGoogleApiVolume = (data: books_v1.Schema$Volume): Volume => {
  const images = data.volumeInfo.imageLinks;

  const imageLink = images ? images.extraLarge || images.large || images.medium || images.thumbnail : noImagelink;
  return {
    id: data.id,
    volumeInfo: {
      authors: data.volumeInfo.authors,
      categories: data.volumeInfo.categories,
      subtitle: data.volumeInfo.subtitle,
      thumbnail: imageLink,
      title: data.volumeInfo.title,
      description: data.volumeInfo.description,
      pageCount: data.volumeInfo.pageCount,
      publishedDate: data.volumeInfo.publishedDate,
      publisher: data.volumeInfo.publisher,
    },
  };
};

/**
 * Split the auth0 user to use in recombee
 */
export const prepareAuth0UserId = (userId: string) => userId ? userId.split('|')[1] : '';
