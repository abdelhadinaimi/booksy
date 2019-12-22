import express, { Router } from 'express';
import Logger from './config/logger.config';
import swagger from './config/swagger.config';
import methodOverride from 'method-override';
import { buildConnection } from './config/database.config';
import { loadEnvVariables } from './config/dotenv.config';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load environement variables
loadEnvVariables();

// Create a new express application instance
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.use(cookieParser());

import routes from './routes/app.routes';
import { checkJwt } from './config/auth.config';
app.use('/api/v1/', routes);
app.use('/api-docs', swagger);

app.get('/api/v1/auth', checkJwt, (req, res) => {
  // TODO register the user if not exists
  res.json({hello: 'hrllo'});
});
// Serve built angular app
app.get('*.*', express.static('assets/**', { maxAge: '1y' }));
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
