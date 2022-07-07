import { Router } from 'express';

import { fight } from '../controllers/fightersController.js';
import { validateFighters } from '../middlewares/fightersMiddleware.js';

const fightersRouter = Router();

fightersRouter.post('/battle', validateFighters, fight);
fightersRouter.get('/ranking');

export default fightersRouter;
