import supertest from 'supertest';
import app from '..';
import { ProductModel } from '../utilities/model/productModel';
import { AdminToken, clientToken } from './LoginHandlerMethodSpec';
const request = supertest(app);

describe('product Tests End Point', () => {
  it('Admin Create  product', async () => {
    const productData: ProductModel = {
      product_name: 'Chipsi',
      product_price: 5,
      product_quantity: 100,
    };
    const response = await request
      .post('/product/create')
      .send(productData)
      .set('authorization', AdminToken);
    expect(response.status).toEqual(200);
    expect(response.body.product_name).toEqual('Chipsi');
    expect(response.body.product_price).toEqual('5.00');
    expect(response.body.product_quantity).toEqual(100);
  });

  it('Client Create  product', async () => {
    const productData = {
      product_name: 'Chipsi',
      product_price: 100,
      product_quantity: 100,
    };
    const response = await request
      .post('/product/create')
      .send(productData)
      .set('authorization', clientToken);
    expect(response.status).toEqual(401);
    expect(response.body).toEqual('Unauthorized');
  });

  it('Admin Edit Product', async () => {
    const productData: ProductModel = {
      product_id: 4,
      product_name: 'Tiger',
      product_price: 6,
      product_quantity: 70,
    };
    const response = await request
      .put('/product/edit')
      .send(productData)
      .set('authorization', AdminToken);
    expect(response.status).toEqual(200);
    expect(response.body.product_name).toEqual('Tiger');
    expect(response.body.product_price).toEqual('6.00');
    expect(response.body.product_quantity).toEqual(70);
  });

  it('get All Products', async () => {
    const response = await request.get('/product/getAll');
    const product = response.body[0];
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(4);
    expect(product.product_id).toEqual(1);
    expect(product.product_name).toEqual('Apple');
    expect(product.product_price).toEqual('10.00');
    expect(product.product_quantity).toBeLessThanOrEqual(60);
  });

  it('get One Product', async () => {
    const response = await request.get(`/product/getOne/1`);
    const product = response.body;
    expect(response.status).toEqual(200);
    expect(product.product_id).toEqual(1);
    expect(product.product_name).toEqual('Apple');
    expect(product.product_price).toEqual('10.00');
    expect(product.product_quantity).toBeLessThanOrEqual(60);
  });

  it('get Not Exist Product', async () => {
    const response = await request.get('/product/getOne/-1');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual('Not Found');
  });

  it('admin delete Product', async () => {
    const response = await request
      .delete(`/product/delete/4`)
      .set('authorization', AdminToken);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('Deleted');
  });

  it('client delete Product', async () => {
    const response = await request
      .delete(`/product/delete/4`)
      .set('authorization', clientToken);
    expect(response.status).toEqual(401);
    expect(response.body).toEqual('Unauthorized');
  });
});
