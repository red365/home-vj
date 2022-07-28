// Configure environment here and export the necessary config so it can be accessed predictably elsewhere
import dotenv from 'dotenv';
import {devMode} from './utils/utils';
import {getDevEnvConfigPathObj} from './dev.config';
import {getProdEnvConfigPathObj} from './prod.config';

if (devMode()) {
  dotenv.config(getDevEnvConfigPathObj());
} else {
  dotenv.config(getProdEnvConfigPathObj());
}

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export const serverConfig = {
  serverAddress: process.env.SERVER_ADDRESS,
  severPort: process.env.PORT
}