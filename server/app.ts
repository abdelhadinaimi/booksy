import express from 'express';
import Logger from './config/logger.config';

// Create a new express application instance
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  Logger.info('Example app listening on port 3000!');
});
