import express, { Request, Response } from 'express';
import product from '../process/product';
const productClientRouter = express.Router();
const productAdminRouter = express.Router();

productAdminRouter.post(
  '/create',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const defaultRespons = await product.createNewProduct(req);
      return res.status(defaultRespons.state).send(defaultRespons.text);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

productAdminRouter.put(
  '/edit',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await product.edit(req);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

productAdminRouter.delete(
  '/delete/:_id',
  async (req: Request, res: Response): Promise<Response> => {
    const result = await product.delete(req);
    return res.status(result.state).send(result.text);
  }
);

productClientRouter.get(
  '/getAll',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await product.getAll();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

productClientRouter.get(
  '/getOne/:_id',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await product.getOne(req);
      if (result.product_id === '-1') return res.status(404).send('Not Found');
      return res.send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

export { productClientRouter, productAdminRouter };
