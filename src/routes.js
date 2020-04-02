import express from 'express';
import * as UserController from './controllers/UserController';
import passport from 'passport';

const router = express.Router();
const privateRouter = passport.authenticate('jwt', { session: false });

router.get('/', (req, res) => res.send("Hello World"));

router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.get('/me', privateRouter, UserController.Me)

export default router;
