import express, { Request, Response } from 'express';
import productOrder from '../process/order';
const orderRouter = express.Router();

orderRouter.post('/add', async (req: Request, res: Response): Promise<void> => {
  return void (await productOrder.addNewProduct(req, res));
});
orderRouter.get(
  '/getOne/:order_id',
  async (req: Request, res: Response): Promise<void> => {
    return void (await productOrder.getOne(req, res));
  }
);

orderRouter.get(
  '/getAll',
  async (req: Request, res: Response): Promise<void> => {
    return void (await productOrder.getAll(req, res));
  }
);

export default orderRouter;
