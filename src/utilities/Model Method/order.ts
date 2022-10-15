import { Request, Response } from 'express';
import { client } from '../../dataBase';

class Order {
  async addProductToOrder(req: Request): Promise<void> {
    const { products, order_id } = req.body;
    let total_price = 0;
    let multiQuery =
      'INSERT INTO order_product(order_id, product_id, quantity, price) VALUES ';
    await Promise.all(
      products.map(
        async (element: { product_id: string; product_quantity: number }) => {
          const { product_id, product_quantity } = element;
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
            const price = product_quantity * product_price;
            total_price += price;
            multiQuery +=
              "('" +
              order_id +
              "','" +
              product_id +
              "','" +
              product_quantity +
              "','" +
              price +
              "'),";
          }
        }
      )
    );
    multiQuery = multiQuery.slice(0, -1) + ';';
    const conn = await client.connect();
    await conn.query(multiQuery);
    conn.release();
    req.body.total_price = total_price;
  }

  async addNewProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { _id } = req.body.decodedToken;
      const query = `INSERT INTO orders(user_id) Values('${_id}') RETURNING order_id;`;
      const conn = await client.connect();
      const result = await conn.query(query);
      conn.release();
      req.body.order_id = result.rows[0].order_id;
      await this.addProductToOrder(req);
      const secondQuery = `UPDATE orders SET total_price =${req.body.total_price} WHERE order_id ='${req.body.order_id}';`;
      const conn2 = await client.connect();
      await conn2.query(secondQuery);
      conn2.release();
      return res.send('Success');
    } catch (error) {
      return res.status(400).send(`error ${error}`);
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const { _id } = req.body.decodedToken;
    const query = `SELECT orders.order_id,orders.total_price,jsonb_agg(
    JSON_BUILD_OBJECT(
		'product_id',order_product.product_id,
		'product_name',products.product_name,
		'quantity',order_product.quantity,
		'price',order_product.price
    )) as product_info FROM orders
    INNER JOIN order_product ON order_product.order_id = orders.order_id
    INNER JOIN products ON products.product_id =order_product.product_id WHERE orders.user_id = '${_id}'
    GROUP  BY orders.order_id,orders.total_price;`;
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    return res.send({ result: result.rows });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;
    const query = `SELECT orders.order_id,orders.total_price,jsonb_agg(
    JSON_BUILD_OBJECT(
		'product_id',order_product.product_id,
		'product_name',products.product_name,
		'quantity',order_product.quantity,
		'price',order_product.price
    )) as product_info FROM orders
    INNER JOIN order_product ON order_product.order_id = orders.order_id
    INNER JOIN products ON products.product_id =order_product.product_id WHERE orders.order_id = '${order_id}'
    GROUP  BY orders.order_id,orders.total_price;`;
    const conn = await client.connect();
    const result = await conn.query(query);
    conn.release();
    if (result.rows.length) {
      return res.send({ result: result.rows[0] });
    }
    return res.status(404).send('Not Found');
  }
}

const productOrder = new Order();
export default productOrder;