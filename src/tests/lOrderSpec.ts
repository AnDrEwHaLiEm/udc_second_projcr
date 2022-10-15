/*import supertest from 'supertest';
import app from '..';
import { clientToken } from './indexSpec';
const request = supertest(app);

describe('order Test', () => {
  it('add new Order', async () => {
    const req = {
      products: [
        { product_id: 1, product_quantity: 2 },
        { product_id: 2, product_quantity: 3 },
        { product_id: 3, product_quantity: 4 },
      ],
    };
    const result = await request
      .post('/order/add')
      .send(req)
      .set('authorization', clientToken);
    expect(result.status).toEqual(200);
  });
  it('get one order ', async () => {
    const result = await request
      .get(`/order/getOne/1`)
      .set('authorization', clientToken);
    const order = result.body.result;
    expect(result.status).toEqual(200);
    expect(order.total_price).toEqual('68.00');
    expect(order.product_info[0].product_id).toEqual(1);
    expect(order.product_info[0].product_name).toEqual('Apple');
    expect(order.product_info[0].quantity).toEqual(2);
    expect(order.product_info[0].price).toEqual(20);
  });

  it('get  All order for one user', async () => {
    const result = await request
      .get(`/order/getAll`)
      .set('authorization', clientToken);
    const order = result.body.result;
    expect(result.status).toEqual(200);
    expect(order[0].order_id).toEqual(1);
    expect(order[0].total_price).toEqual('68.00');
    expect(order[0].product_info[0].product_id).toEqual(1);
    expect(order[0].product_info[0].product_name).toEqual('Apple');
    expect(order[0].product_info[0].quantity).toEqual(2);
    expect(order[0].product_info[0].price).toEqual(20);
  });
});
*/
