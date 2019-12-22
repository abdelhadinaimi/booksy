import mongoose from 'mongoose';
import bookModel from '../models/book.model';

export const buildConnection = () => {
  const mongooseOptions: mongoose.ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    numberOfRetries: 3,
    dbName: process.env.DB_NAME || 'booksy',
  };

  return mongoose.connect(process.env.MONGO_URI || 'mongodb://root:example@localhost:27017', mongooseOptions);
};

// register schemas
mongoose.model(bookModel.name, bookModel.schema);
