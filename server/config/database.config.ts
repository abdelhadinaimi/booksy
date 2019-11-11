import mongoose from 'mongoose';

export const buildConnection = () => {
  const mongooseOptions: mongoose.ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    numberOfRetries: 3,
    dbName: process.env.DB_NAME || 'booksy',
  };

  return mongoose.connect(process.env.MONGO_URI, mongooseOptions);
};

// register schemas
