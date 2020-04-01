import express from 'express';
import * as UserController from './controllers/UserController';

const router = express.Router();

router.get('/', (req, res) => res.send("Hello World"));

router.post('/login', UserController.Login)

export default router;
