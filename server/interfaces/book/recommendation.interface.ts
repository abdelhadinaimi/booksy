import { Volume, VolumeCore } from './book.interface';

export interface Recommendation {
  id: string;
  values: VolumeCore;
}

export interface Recommendations {
  recommId: string;
  recomms: Recommendation[];
}

export interface RecommendedBooks {
  rid: string;
  volumes: Volume[];
}
