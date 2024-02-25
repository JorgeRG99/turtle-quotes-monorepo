import express, { json } from 'express';
import { turtleRouter } from './router/turtle';
import cors from 'cors';
import { errorHandler } from './middlewares/handler';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(json());

app.use(
  cors({
    origin: 'http://127.0.0.1:64785',
  })
);

app.disable('x-powered-by');

app.use('/api', turtleRouter);
app.use('/api', turtleRouter);

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
