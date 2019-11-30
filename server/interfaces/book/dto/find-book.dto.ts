export class FindBookDto {
  q!: string;
  startIndex?: number;
  orderBy?: 'newest' | 'relevance';
  maxResults?: number;
}
