import express from 'express';
import authRouter from './utilities/Handler Method/authinticationRoutes';
import cors from 'cors';
import orderRouter from './utilities/Handler Method/productOrderRouter';
import userRouter from './utilities/Handler Method/userHandlerMethod';
import productRouter from './utilities/Handler Method/productRouter';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use('/login', authRouter);

app.use('/user', userRouter);

app.use('/product', productRouter);

app.use('/order', orderRouter);

app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`);
});

export default app;
