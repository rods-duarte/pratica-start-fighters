import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import './setup.js';

import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandlerMiddleware.js';

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server listening on port', port);
});
