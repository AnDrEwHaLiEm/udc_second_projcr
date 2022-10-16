import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import product from '../Model Method/product';
import { ProductModel } from '../model/productModel';
const productRouter = express.Router();

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
        if (admin_authority == 'admin') {
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

productRouter.post(
  '/create',
  checkAuthorty,
  async (req: Request, res: Response) => {
    const productData: ProductModel = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_quantity: req.body.product_quantity,
    };
    try {
      const result = await product.createNewProduct(productData);
      return res.json(result);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

productRouter.put(
  '/edit',
  checkAuthorty,
  async (req: Request, res: Response) => {
    const productData: ProductModel = {
      product_id: req.body.product_id,
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_quantity: req.body.product_quantity,
    };
    try {
      const result = await product.edit(productData);
      return res.json(result);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

productRouter.delete(
  '/delete/:_id',
  checkAuthorty,
  async (req: Request, res: Response) => {
    const productData: ProductModel = {
      product_id: req.params._id as unknown as number,
    };
    try {
      const result = await product.delete(productData);
      return res.json(result);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

productRouter.get('/getAll', async (req: Request, res: Response) => {
  try {
    const result = await product.getAll();
    return res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

productRouter.get('/getOne/:_id', async (req: Request, res: Response) => {
  const productData: ProductModel = {
    product_id: req.params._id as unknown as number,
  };
  try {
    const result = await product.getOne(productData);
    return res.json(result);
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

export default productRouter;
