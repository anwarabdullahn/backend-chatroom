import express from 'express';
import passport from 'passport';
import * as UserController from './controllers/UserController';
import * as RoomController from './controllers/RoomController';
import * as MessageController from './controllers/MessageController';

const router = express.Router();
const privateRouter = passport.authenticate('jwt', { session: false });

router.get('/', (req, res) => res.send("Hello World"));

router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.get('/me', privateRouter, UserController.Me);
router.post('/room', privateRouter, RoomController.Store);
router.get('/room/:page', privateRouter, RoomController.MyRoom);
router.post('/msg/:roomId', privateRouter, MessageController.StoreConversation);
router.get('/msg/:roomId/:page', privateRouter, MessageController.GetConversation);
router.post('/room/join', privateRouter, RoomController.JoinRoom);

export default router;
