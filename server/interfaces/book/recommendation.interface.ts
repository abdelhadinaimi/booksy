import { Volume, VolumeCore } from './book.interface';

export interface Recommendations {
  recommId: string;
  recomms: Array<{ id: string, values: VolumeCore }>;
}

export interface RecommendedBooks {
  rid: string;
  volumes: Volume[];
}
