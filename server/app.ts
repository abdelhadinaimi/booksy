import express, { Router } from 'express';
import Logger from './config/logger.config';
import swagger from './config/swagger.config';
import { buildConnection } from './config/database.config';
import { loadEnvVariables } from './config/dotenv.config';

// Load environement variables
loadEnvVariables();

// Create a new express application instance
const app = express();

import routes from './routes/app.routes';
app.use('/api/v1/', routes);
app.use('/api-docs', swagger);

// Serve built angular app
app.get('*.*', express.static('public/', { maxAge: '1y' }));
app.all('*', (req, res) => {
  res.status(200).sendFile('/', { root: 'public/' });
});

const PORT = process.env.PORT || 3000;

buildConnection()
  .then(() => {
    Logger.info('Connection to DB Established');
    app.listen(PORT, () => {
      Logger.info('Boosky app listening on http://localhost:3000');
    });
  })
  .catch(err => {
    Logger.error('Error on start: ' + err.stack);
    process.exit(1);
  });
