import { Volume } from '../interfaces/book/book.interface';
import { books_v1 } from 'googleapis/build/src/apis/books/v1';

export const parseGoogleApiVolume = (data: books_v1.Schema$Volume): Volume => {
  const images = data.volumeInfo.imageLinks;
  return {
    id: data.id,
    volumeInfo: {
      authors: data.volumeInfo.authors,
      categories: data.volumeInfo.categories,
      subtitle: data.volumeInfo.subtitle,
      thumbnail: images.extraLarge || images.large || images.medium || images.thumbnail,
      title: data.volumeInfo.title,
      description: data.volumeInfo.description,
      pageCount: data.volumeInfo.pageCount,
      publishedDate: data.volumeInfo.publishedDate,
      publisher: data.volumeInfo.publisher,
    },
  };
};
