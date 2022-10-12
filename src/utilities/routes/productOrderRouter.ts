import express, { Request, Response } from 'express';
import productOrder from '../process/order';
const orderRouter = express.Router();

orderRouter.post(
  '/add',
  productOrder.checkProductExist,
  async (req: Request, res: Response): Promise<Response> => {
    const result = await productOrder.addNewProduct(req);
    return res.status(result.state).send(result.text);
  }
);

orderRouter.get(
  '/getOne/:product_id',
  async (req: Request, res: Response): Promise<Response> => {
    const result = await productOrder.getOne(req);
    if (result.product_id === '-1') return res.status(404).send('Not Found');
    return res.send(result);
  }
);

orderRouter.get(
  '/getAll',
  async (req: Request, res: Response): Promise<Response> => {
    const result = await productOrder.getAll(req);
    return res.send(result);
  }
);

orderRouter.delete(
  '/delete/:product_id',
  async (req: Request, res: Response): Promise<Response> => {
    const response = await productOrder.delete(req);
    return res.status(response.state).send(response.text);
  }
);

export default orderRouter;
