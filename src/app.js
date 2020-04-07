import express from 'express';
import mongodb from '../utils/db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import passport from 'passport';
import configPassport from '../utils/passport';
import socketio from 'socket.io';
import http from 'http';

dotenv.config();
configPassport(passport);

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(passport.initialize());

mongodb.connect(process.env.MONGO_DB);

io.on('connection', (socket) => {
  console.log('We Have new Connection');
  socket.on('disconnect', () => console.log('socket disconnect'))
})

server.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
})