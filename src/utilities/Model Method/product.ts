import { client } from '../../dataBase';
import { ProductModel } from '../model/productModel';

class Product {
  async createNewProduct(product: ProductModel): Promise<ProductModel> {
    try {
      const { product_name, product_price, product_quantity } = product;
      const query = `INSERT INTO products(product_name,product_price,product_quantity) VALUES ($1,$2,$3) RETURNING *;`;
      const conn = await client.connect();
      const result = await conn.query(query, [
        product_name,
        product_price,
        product_quantity,
      ]);
      conn.release();
      const newProduct = result.rows[0];
      return newProduct;
    } catch (err) {
      throw 'unable to Create Product';
    }
  }

  async edit(product: ProductModel): Promise<ProductModel> {
    try {
      const { product_id, product_name, product_price, product_quantity } =
        product;
      const query = `UPDATE products SET product_name = $1 ,product_price=$2,product_quantity=$3 WHERE product_id=$4 RETURNING *;`;
      const conn = await client.connect();
      const result = await conn.query(query, [
        product_name,
        product_price,
        product_quantity,
        product_id,
      ]);
      conn.release();
      const updatedProduct = result.rows[0];
      return updatedProduct;
    } catch (error) {
      throw 'unable to Edit Product';
    }
  }

  async delete(product: ProductModel): Promise<string> {
    try {
      const { product_id } = product;
      const query = `DELETE FROM products WHERE product_id=$1;`;
      const conn = await client.connect();
      const result = await conn.query(query, [product_id]);
      conn.release();
      if (result.rowCount) return 'Deleted';
      else throw 'Error when Delete Product';
    } catch (error) {
      throw 'Error when Delete Product';
    }
  }

  async getOne(product: ProductModel): Promise<ProductModel> {
    const { product_id } = product;
    const query = `SELECT * FROM products WHERE product_id=$1;`;
    const conn = await client.connect();
    const result = await conn.query(query, [product_id]);
    conn.release();
    if (result.rows.length) {
      return result.rows[0];
    }
    throw 'Not Found';
  }

  async getAll(): Promise<Array<ProductModel>> {
    const query = 'SELECT * from products';
    const conn = await client.connect();
    const products = await conn.query(query);
    conn.release();
    const result = products.rows.map((element: ProductModel) => {
      const { product_id, product_name, product_price, product_quantity } =
        element;
      return { product_id, product_name, product_price, product_quantity };
    });
    return result;
  }
}

const product = new Product();
export default product;
