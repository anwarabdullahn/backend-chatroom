import express from 'express';
import mongodb from '../utils/db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import passport from 'passport';
import configPassport from '../utils/passport';
import socketIO from 'socket.io';
import http from 'http';
import * as MessageService from './services/MessageService';

dotenv.config();
configPassport(passport);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(passport.initialize());

mongodb.connect(process.env.MONGO_DB);

io.on('connection', (socket) => {
  console.log("New client connected " + socket.id);

  socket.on('new_message', async ({ text, user, roomId }) => {
    const result = await MessageService.store({ text }, user, roomId);
    io.sockets.emit("new_message", { data: result });
  })


  socket.on('disconnect', () => console.log('socket disconnect'))
})

server.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
})