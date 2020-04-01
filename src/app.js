import express from 'express';
import mongodb from '../utils/db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

mongodb.connect(process.env.MONGO_DB);

app.listen(PORT,() => {
    console.log(`app is listening to port ${PORT}`);
})