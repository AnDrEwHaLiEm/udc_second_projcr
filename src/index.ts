import express from 'express';
import authRouter from './utilities/routes/authinticationRoutes';
import cors from 'cors';
import userCreateAccountRouter from './utilities/routes/userRouter';
import authintication from './utilities/process//authintication';
import checkAuthorty from './utilities/process/checkAuthory';
import {
  productClientRouter,
  productAdminRouter,
} from './utilities/routes/productRouter';
import orderRouter from './utilities/routes/productOrderRouter';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use('/login', authRouter);

app.use('/user', userCreateAccountRouter);

app.use('/product', productClientRouter);

app.use(authintication.authinticate);
app.use(checkAuthorty);

app.use('/product', productAdminRouter);

app.use('/order', orderRouter);

app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`);
});

export default app;
