import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import order from '../Model Method/order';
import { OrderModel } from '../model/orderModel';
const orderRouter = express.Router();

const checkAuthorty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const privateKey = process.env.PRIVATE_KEY as string;
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split('=')[1];
    if (!token) {
      return;
    }
    return jwt.verify(token, privateKey, async (err, decodedToken) => {
      if (err) {
        res.status(401);
        res.json('Unauthorized');
        return;
      } else {
        req.body.decodedToken = decodedToken;
        const { admin_authority } = req.body.decodedToken;
        if (admin_authority == 'client') {
          next();
          return;
        }
        res.status(401);
        res.json('Unauthorized');
        return;
      }
    });
  } catch (err) {
    res.status(400);
    res.json(`error ${err}`);
  }
};

orderRouter.post('/add', checkAuthorty, async (req: Request, res: Response) => {
  const orderData: OrderModel = {
    user_id: req.body.decodedToken._id,
    product_info: req.body.products,
  };
  try {
    const result = await order.addNewProduct(orderData);
    return res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});
orderRouter.get(
  '/getOne/:order_id',
  checkAuthorty,
  async (req: Request, res: Response) => {
    const orderData: OrderModel = {
      order_id: req.params.order_id as unknown as number,
    };
    try {
      const result = await order.getOne(orderData);
      return res.json({ result });
    } catch (err) {
      res.status(404);
      res.json(err);
    }
  }
);

orderRouter.get(
  '/getAll',
  checkAuthorty,
  async (req: Request, res: Response) => {
    const orderData: OrderModel = {
      user_id: req.body.decodedToken._id,
    };
    try {
      const result = await order.getAll(orderData);
      return res.json({ result });
    } catch (err) {
      res.status(404);
      res.json(err);
    }
  }
);

export default orderRouter;
