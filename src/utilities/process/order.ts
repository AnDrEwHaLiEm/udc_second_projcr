import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import client from '../../dataBase';
import DefaultRespons from '../DefaultRespons';
import DefaultResponseInterface from '../DefaultResponseInterface';
import OrderModel from '../model/orderModel';

class Order {
  async getQuantityBack(req: Request): Promise<boolean> {
    try {
      const { _id } = req.body.decodedToken;
      const { product_id } = req.params;
      const query = `SELECT product_quantity FROM orders WHERE userid='${_id}' AND productid ='${product_id}';`;
      const conn = await client.connect();
      const result = await conn.query(query);
      conn.release();
      const userOrderproduct = result.rows[0].product_quantity;
      const secondQuery = `UPDATE products SET product_quantity=product_quantity + ${userOrderproduct} WHERE product_id ='${product_id}';`;
      const secondconn = await client.connect();
      await secondconn.query(secondQuery);
      secondconn.release();
      return true;
    } catch (error) {
      return false;
    }
  }
  async delete(req: Request): Promise<DefaultResponseInterface> {
    const response = new DefaultRespons();
    const { _id } = req.body.decodedToken;
    const { product_id } = req.params;
    const itemIsReturn = await this.getQuantityBack(req);
    if (itemIsReturn) {
      const query = `DELETE FROM orders WHERE productid='${product_id}' AND userid ='${_id}';`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
    } else {
      response.state = 400;
      response.text = "Can't delete this Order";
    }
    return response;
  }
  async getAll(req: Request): Promise<Array<OrderModel>> {
    const { _id } = req.body.decodedToken;
    const query = `SELECT orders.product_quantity,orders.total_price, products.product_name FROM products INNER JOIN orders ON productid = products.product_id WHERE orders.userid ='${_id}';`;
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    const returnResult = result.rows;
    return returnResult;
  }

  async getOne(req: Request): Promise<OrderModel> {
    const { _id } = req.body.decodedToken;
    const { product_id } = req.params;
    const query = `SELECT products.product_id,orders.product_quantity,orders.total_price, products.product_name FROM products INNER JOIN orders  ON productid = products.product_id WHERE orders.userid ='${_id}' AND orders.productid='${product_id}';`;
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    if (result.rows.length) {
      return result.rows[0];
    }
    return {
      product_id: '-1',
      product_name: '-1',
      total_price: -1,
      product_quantity: -1,
    };
  }

  async checkProductExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { product_id, product_quantity } = req.body;
    const query = `SELECT product_price,product_quantity FROM products WHERE product_id='${product_id}';`;
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    if (
      result.rows[0].product_quantity >= product_quantity &&
      product_quantity >= 1
    ) {
      const remender = result.rows[0].product_quantity - product_quantity;
      const query = `UPDATE products SET product_quantity='${remender}' WHERE product_id='${product_id}';`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      const { product_price } = result.rows[0];
      const total_price = product_quantity * product_price;
      req.body.total_price = total_price;
      next();
    } else {
      res.sendStatus(404);
      return;
    }
  }
  async addNewProduct(req: Request): Promise<DefaultResponseInterface> {
    const res = new DefaultRespons();
    try {
      const { _id } = req.body.decodedToken;
      const { product_id, product_quantity, total_price } = req.body;
      const query = `INSERT INTO orders(userid,productid,product_quantity,total_price) Values('${_id}','${product_id}','${product_quantity}','${total_price}');`;
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
}

const productOrder = new Order();
export default productOrder;
