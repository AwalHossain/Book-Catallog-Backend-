import express from 'express';

import cors from 'cors';
import router from './routes';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1', router)


app.get('/', (req, res) => {

    res.send('Hello World!');

});

export default app;