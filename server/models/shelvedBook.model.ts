import { Schema, Model, model } from 'mongoose';
import { IShelvedBook } from '../interfaces/bookshelf/bookshelve.interface';


const ShelvedBookSchema: Schema = new Schema(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
        },
        numberOfReadPages: Number
    }
);

export const ShelvedBookModel: Model<IShelvedBook> = model<IShelvedBook>('ShelvedBook', ShelvedBookSchema);