import { Volume, BookCore } from './book.interface';

export interface Recommendations {
  recommId: string;
  recomms: Array<{ id: string, values: BookCore }>;
}

export interface RecommendedBooks {
  rid: string;
  volumes: Volume[];
}
