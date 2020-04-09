import express from 'express';
// import {hello} from './routes';

const app = express();

app.get('/', (req, res) => {
  return res.json({msg : 12})
});

app.listen(3333);
