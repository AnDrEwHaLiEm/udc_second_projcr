import { Request, Response } from 'express';
import { client } from '../../dataBase';
import productModel from '../model/productModel';

class Product {
  async createNewProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { product_name, product_price, product_quantity } = req.body;
      const query = `INSERT INTO products(product_name,product_price,product_quantity) VALUES ('${product_name}','${product_price}','${product_quantity}');`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      return res.send('Success');
    } catch (error) {
      return res.status(400).send(`Error ${error}`);
    }
  }

  async edit(req: Request, res: Response): Promise<Response> {
    try {
      const { product_id, product_name, product_price, product_quantity } =
        req.body;
      const query = `UPDATE products SET product_name = '${product_name}',product_price='${product_price}',product_quantity='${product_quantity}' WHERE product_id='${product_id}';`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      return res.send('Success');
    } catch (error) {
      return res.status(400).send(`Error ${error}`);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.params;
      const query = `DELETE FROM products WHERE product_id='${_id}';`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      return res.send('DELETED');
    } catch (error) {
      return res.status(400).send(`Error ${error}`);
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    const query = `SELECT * FROM products WHERE product_id='${_id}';`;
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    if (result.rows.length) {
      return res.send({ result: result.rows[0] });
    }

    return res.status(404).send('Not Found');
  }

  async getAll(res: Response): Promise<Response> {
    const query = 'SELECT * from products';
    const conn = await client.connect();
    const products = await conn.query(query);
    conn.release();
    const result = products.rows.map((element: productModel) => {
      const { product_id, product_name, product_price, product_quantity } =
        element;
      return { product_id, product_name, product_price, product_quantity };
    });
    return res.send({ result });
  }
}

const product = new Product();
export default product;
