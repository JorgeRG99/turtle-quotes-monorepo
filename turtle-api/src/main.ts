import express, { json } from 'express';
import { turtleRouter } from './router/turtle';
import cors from 'cors';
import { ERR_HANDLER_OBJECT } from './config';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

function errorHandler(error, req, res, next) {
  const response = ERR_HANDLER_OBJECT[error.code];
  if(response) {
    res.status(response.status).json({ error: response.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const app = express();

app.use(json());

app.use(
  cors({
    origin: 'http://127.0.0.1:60932',
  })
);

app.disable('x-powered-by');

app.use('/api', turtleRouter);
app.use('/api', turtleRouter);

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
