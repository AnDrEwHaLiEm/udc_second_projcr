import order from '../utilities/Model Method/order';
import { OrderModel, productInfo } from '../utilities/model/orderModel';

function compare(a: productInfo, b: productInfo) {
  if (a.product_id < b.product_id) {
    return -1;
  }
  if (a.product_id > b.product_id) {
    return 1;
  }
  return 0;
}

function mainCompare(a: OrderModel, b: OrderModel) {
  if ((a.order_id as number) < (b.order_id as number)) {
    return -1;
  }
  if ((a.order_id as number) > (b.order_id as number)) {
    return 1;
  }
  return 0;
}

describe('order Tests Model', () => {
  it('add new Order', async () => {
    const req: OrderModel = {
      user_id: 2,
      product_info: [
        { product_id: 1, quantity: 2 },
        { product_id: 2, quantity: 3 },
        { product_id: 3, quantity: 4 },
      ],
    };
    const result = await order.addNewProduct(req);
    result.product_info?.sort(compare);
    expect(result.order_id).toEqual(2);
    expect(result.user_id).toBeCloseTo(2);
    expect(result.total_price).toBeCloseTo(68.0);
    expect(result.product_info).toEqual([
      { order_id: 2, product_id: 1, quantity: 2, price: '20.00' },
      { order_id: 2, product_id: 2, quantity: 3, price: '36.00' },
      { order_id: 2, product_id: 3, quantity: 4, price: '12.00' },
    ]);
  });

  it('Client Get one order', async () => {
    const req: OrderModel = {
      order_id: 2,
    };
    const result = await order.getOne(req);
    result.product_info?.sort(compare);
    expect(result.order_id).toEqual(2);
    expect(result.user_id).toEqual(2);
    expect(result.total_price).toBeCloseTo(68);
    expect(result.product_info).toEqual([
      { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
      { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
      { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
    ]);
  });

  it('Client Get Not Exist order', async () => {
    const req: OrderModel = {
      order_id: -1,
    };
    await expectAsync(order.getOne(req)).toBeRejectedWith('Not Found');
  });

  it('get All order for one user', async () => {
    const req: OrderModel = {
      user_id: 2,
    };
    const result = await order.getAll(req);
    result.sort(mainCompare);
    result[0].product_info?.sort(compare);
    result[1].product_info?.sort(compare);
    expect(result[0].order_id).toEqual(1);
    expect(result[0].user_id).toEqual(2);
    expect(result[0].total_price).toBeCloseTo(68);
    expect(result[1].order_id).toEqual(2);
    expect(result[1].user_id).toEqual(2);
    expect(result[1].total_price).toBeCloseTo(68);
    expect(result[0].product_info).toEqual([
      { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
      { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
      { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
    ]);
    expect(result[1].product_info).toEqual([
      { price: 20, quantity: 2, product_id: 1, product_name: 'Apple' },
      { price: 36, quantity: 3, product_id: 2, product_name: 'Banana' },
      { price: 12, quantity: 4, product_id: 3, product_name: 'Tomato' },
    ]);
  });
});
