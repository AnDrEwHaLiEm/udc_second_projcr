import { client } from '../../dataBase';
import { OrderModel, productInfo } from '../model/orderModel';

class Order {
  async addProductToOrder(OrderData: OrderModel): Promise<OrderModel> {
    const { product_info, order_id } = OrderData;
    let total_price = 0;
    let multiQuery =
      'INSERT INTO order_product(order_id, product_id, quantity, price) VALUES ';
    await Promise.all(
      (product_info as [productInfo]).map(async (element: productInfo) => {
        const { product_id, quantity } = element;
        const query = `SELECT product_price,product_quantity FROM products WHERE product_id='${product_id}';`;
        const conn = await client.connect();
        const result = await conn.query(query);
        conn.release();
        if (result.rows[0].product_quantity >= quantity && quantity >= 1) {
          const remender = result.rows[0].product_quantity - quantity;
          const query = `UPDATE products SET product_quantity='${remender}' WHERE product_id='${product_id}';`;
          const conn = await client.connect();
          await conn.query(query);
          conn.release();
          const { product_price } = result.rows[0];
          const price = quantity * product_price;
          total_price += price;
          multiQuery +=
            "('" +
            order_id +
            "','" +
            product_id +
            "','" +
            quantity +
            "','" +
            price +
            "'),";
        }
      })
    );
    multiQuery = multiQuery.slice(0, -1) + ' RETURNING *;';
    const conn = await client.connect();
    const result = await conn.query(multiQuery);
    conn.release();
    const orderProductData: OrderModel = {
      user_id: OrderData.user_id,
      order_id: OrderData.order_id,
      total_price: total_price,
      product_info: result.rows as Array<productInfo>,
    };
    return orderProductData;
  }

  async addNewProduct(orderData: OrderModel): Promise<OrderModel> {
    try {
      const { user_id } = orderData;
      const query = `INSERT INTO orders(user_id) Values($1) RETURNING order_id;`;
      const conn = await client.connect();
      const result = await conn.query(query, [user_id]);
      conn.release();
      orderData.order_id = result.rows[0].order_id;
      const orderProduct: OrderModel = await this.addProductToOrder(orderData);
      const secondQuery = `UPDATE orders SET total_price='${orderProduct.total_price}' WHERE order_id='${orderProduct.order_id}' RETURNING *;`;
      const conn2 = await client.connect();
      const result2 = await conn2.query(secondQuery);
      conn2.release();
      const orderProductResult: OrderModel = {
        user_id: result2.rows[0].user_id,
        order_id: result2.rows[0].order_id,
        total_price: result2.rows[0].total_price,
        product_info: orderProduct.product_info,
      };
      return orderProductResult;
    } catch (error) {
      throw `${error}`;
    }
  }

  async getAll(orderData: OrderModel): Promise<Array<OrderModel>> {
    try {
      const { user_id } = orderData;
      const query = `SELECT orders.order_id,orders.user_id,orders.total_price,jsonb_agg(
    JSON_BUILD_OBJECT(
		'product_id',order_product.product_id,
		'product_name',products.product_name,
		'quantity',order_product.quantity,
		'price',order_product.price
    )) as product_info FROM orders
    INNER JOIN order_product ON order_product.order_id = orders.order_id
    INNER JOIN products ON products.product_id =order_product.product_id WHERE orders.user_id = $1
    GROUP  BY orders.order_id,orders.total_price;`;
      const conn = await client.connect();
      const result = await conn.query(query, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw `Error ${error}`;
    }
  }

  async getOne(orderData: OrderModel): Promise<OrderModel> {
    const { order_id } = orderData;
    const query = `SELECT orders.order_id,orders.user_id,orders.total_price,jsonb_agg(
    JSON_BUILD_OBJECT(
		'product_id',order_product.product_id,
		'product_name',products.product_name,
		'quantity',order_product.quantity,
		'price',order_product.price
    )) as product_info FROM orders
    INNER JOIN order_product ON order_product.order_id = orders.order_id
    INNER JOIN products ON products.product_id =order_product.product_id WHERE orders.order_id = $1
    GROUP  BY orders.order_id,orders.total_price;`;
    const conn = await client.connect();
    const result = await conn.query(query, [order_id]);
    conn.release();
    if (result.rows.length) {
      return result.rows[0];
    }
    throw 'Not Found';
  }
}

const order = new Order();
export default order;
