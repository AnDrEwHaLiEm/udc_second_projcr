import { Request } from 'express';
import { client } from '../../dataBase';
import DefaultRespons from '../DefaultRespons';
import DefaultResponseInterface from '../DefaultResponseInterface';
import productModel from '../model/productModel';

class Product {
  async createNewProduct(req: Request): Promise<DefaultResponseInterface> {
    const res = new DefaultRespons();
    try {
      const { product_name, product_price, product_quantity } = req.body;
      const query = `INSERT INTO products(product_name,product_price,product_quantity) VALUES ('${product_name}','${product_price}','${product_quantity}');`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      res.state = 200;
      res.text = 'Success';
      return res;
    } catch (error) {
      res.state = 400;
      res.text = `Error ${error}`;
      return res;
    }
  }

  async edit(req: Request): Promise<DefaultRespons> {
    const res = new DefaultRespons();
    try {
      const { product_id, product_name, product_price, product_quantity } =
        req.body;
      const query = `UPDATE products SET product_name = '${product_name}',product_price='${product_price}',product_quantity='${product_quantity}' WHERE product_id='${product_id}';`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      res.text = 'Success';
      return res;
    } catch (error) {
      res.state = 400;
      res.text = `Error ${error}`;
      return res;
    }
  }

  async delete(req: Request): Promise<DefaultRespons> {
    try {
      const { _id } = req.params;
      const query = `DELETE FROM products WHERE product_id='${_id}';`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      return { state: 200, text: 'DELETED' };
    } catch (error) {
      return { state: 400, text: `Error ${error}` };
    }
  }

  async getOne(req: Request): Promise<productModel> {
    const { _id } = req.params;
    const query = `SELECT * FROM products WHERE product_id='${_id}';`;
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    if (result.rows.length) {
      const returnResult = result.rows[0];
      return returnResult;
    }

    return {
      product_id: '-1',
      product_name: '-1',
      product_quantity: -1,
      product_price: -1,
    };
  }

  async getAll(): Promise<Array<productModel>> {
    const query = 'SELECT * from products';
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    const returnResult = result.rows.map((element: productModel) => {
      const { product_id, product_name, product_price, product_quantity } =
        element;
      return { product_id, product_name, product_price, product_quantity };
    });
    return returnResult;
  }
}

const product = new Product();
export default product;
