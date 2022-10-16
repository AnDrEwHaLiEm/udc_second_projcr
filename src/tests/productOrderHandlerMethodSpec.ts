import supertest from 'supertest';
import app from '..';
import { productInfo } from '../utilities/model/orderModel';
import { clientToken } from './LoginHandlerMethodSpec';
const request = supertest(app);

function compare(a: productInfo, b: productInfo) {
  if (a.product_id < b.product_id) {
    return -1;
  }
  if (a.product_id > b.product_id) {
    return 1;
  }
  return 0;
}

describe('order Tests EndPoint', () => {
  it('add new Order', async () => {
    const req = {
      products: [
        { product_id: 1, quantity: 2 },
        { product_id: 2, quantity: 3 },
        { product_id: 3, quantity: 4 },
      ],
    };
    const result = await request
      .post('/order/add')
      .send(req)
      .set('authorization', clientToken);
    const productRes = {
      order_id: 1,
      user_id: 2,
      total_price: '68.00',
      product_info: [
        { order_id: 1, product_id: 1, quantity: 2, price: '20.00' },
        { order_id: 1, product_id: 2, quantity: 3, price: '36.00' },
        { order_id: 1, product_id: 3, quantity: 4, price: '12.00' },
      ],
    };
    expect(result.status).toEqual(200);
    expect(result.body.user_id).toEqual(2);
    expect(result.body.order_id).toEqual(1);
    expect(result.body.total_price).toBeCloseTo(68);
    result.body.product_info?.sort(compare);
    expect(result.body.product_info).toEqual(productRes.product_info);
  });

  it('Client Get one order', async () => {
    const result = await request
      .get(`/order/getOne/1`)
      .set('authorization', clientToken);
    const order = result.body.result;
    const productRes = {
      order_id: 1,
      user_id: 2,
      total_price: '68.00',
      product_info: [
        { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
        { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
        { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
      ],
    };
    result.body.product_info?.sort(compare);
    expect(result.status).toEqual(200);
    expect(order).toEqual(productRes);
  });

  it('Client Get Not Exist order', async () => {
    const result = await request
      .get(`/order/getOne/-1`)
      .set('authorization', clientToken);
    expect(result.status).toEqual(404);
    expect(result.body).toEqual('Not Found');
  });

  it('get  All order for one user', async () => {
    const result = await request
      .get(`/order/getAll`)
      .set('authorization', clientToken);
    const order = result.body.result;
    const productRes = {
      order_id: 1,
      user_id: 2,
      total_price: '68.00',
      product_info: [
        { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
        { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
        { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
      ],
    };
    result.body.product_info?.sort(compare);
    expect(result.status).toEqual(200);
    expect(order).toEqual([productRes]);
  });
});
