import express, { Request, Response } from 'express';
import product from '../process/product';
const productClientRouter = express.Router();
const productAdminRouter = express.Router();

productAdminRouter.post(
  '/create',
  async (req: Request, res: Response): Promise<void> => {
    return void (await product.createNewProduct(req, res));
  }
);

productAdminRouter.put(
  '/edit',
  async (req: Request, res: Response): Promise<void> => {
    return void (await product.edit(req, res));
  }
);

productAdminRouter.delete(
  '/delete/:_id',
  async (req: Request, res: Response): Promise<void> => {
    return void (await product.delete(req, res));
  }
);

productClientRouter.get(
  '/getAll',
  async (req: Request, res: Response): Promise<void> => {
    return void (await product.getAll(res));
  }
);

productClientRouter.get(
  '/getOne/:_id',
  async (req: Request, res: Response): Promise<void> => {
    return void (await product.getOne(req, res));
  }
);

export { productClientRouter, productAdminRouter };
