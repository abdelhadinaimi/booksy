export interface Review {
  readonly _id: string;
  readonly rating: string;
  readonly reviewText: string;
  readonly writer: object;
  readonly created_at: string;
  readonly updated_at: string;
}
